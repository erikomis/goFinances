import React from "react";
import { Feather } from "@expo/vector-icons";
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  User,
  Photo,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
} from "./styles";
import { HighlightCard } from "../../components/HighlightCard";
export const Dashboard = () => {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/77300089?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Lucas</UserName>
            </User>
          </UserInfo>
        </UserWrapper>
        <Icon name="power" />
      </Header>
      <HighlightCards>        
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </HighlightCards >
    </Container>
  );
};
