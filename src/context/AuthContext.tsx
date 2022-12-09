import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuhContextData {
  user: User;
  loading: boolean;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuhContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserStorageData() {
      const userStoraged = await AsyncStorage.getItem("@gofinances:user");

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;

        setUser(userLogged);
      }
      setLoading(false);
    }

    loadUserStorageData();
  }, []);

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem("@gofinances:user");
  }

  async function signInWithGoogle() {
    try {
      console.log(CLIENT_ID, REDIRECT_URI);
      const GOOGLE_END_POINT = "https://accounts.google.com/o/oauth2/v2/auth";
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `${GOOGLE_END_POINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { params, type } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();
        const userLogged = {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          photo: userInfo.picture,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(
          "@gofinances:user",
          JSON.stringify(userLogged)
        );
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
