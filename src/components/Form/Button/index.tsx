import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Title } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

export const Button = ({ title, onPress, ...rest }: ButtonProps) => {
  return (
    <Container {...rest} onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
};
