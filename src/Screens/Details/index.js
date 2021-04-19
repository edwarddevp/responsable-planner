import React from "react";
import {
  Icon,
  Layout,
  Text,
} from "@ui-kitten/components";
import { MainLayout } from "../../Layout/MainLayout";

export const Details = ({ navigation }) => {
  return (
    <MainLayout navigation={navigation} backButton>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text category="h1">DETAILS</Text>
      </Layout>
    </MainLayout>
  );
};
