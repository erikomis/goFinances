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
  Transactions,
  Title,
  TransactionList,
} from "./styles";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

const data:DataListProps[] = [
  {
    id: "1",
    type: "positive",
    title: "Desenvolvimento de sistemas",
    amount: "R$ 15.500,00",
    category: {
      name: "Vendas",
      icon: "dollar-sign",
    },
    date: "13/04/2021",
  },
  {
    id: "2",
    type: "negative",
    title: "Compra de comida",
    amount: "R$ 15.500,00",
    category: {
      name: "Alimentação",
      icon: "coffee",
    },
    date: "13/04/2021",
  },
  {
    id: "3",
    type: "negative",
    title: "Desenvolvimento de componentes",
    amount: "R$ 15.500,00",
    category: {
      name: "Compra",
      icon: "shopping-bag",
    },
    date: "13/04/2021",
  },
];
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
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Ultima entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.400,00"
          lastTransaction="Ultima entrada dia 13 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 17.400,00"
          lastTransaction="Ultima entrada dia 13 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        {data ? (
          <TransactionList
            data={data}
            renderItem={({ item }) => <TransactionCard data={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : null}
      </Transactions>
    </Container>
  );
};
