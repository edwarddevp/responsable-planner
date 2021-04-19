import React from "react";
import {
  Layout,
  Text,
} from "@ui-kitten/components";
import { MainLayout } from "../../Layout/MainLayout";

export const Search = ({ navigation }) => {
  return (
    <MainLayout backButton navigation={navigation}>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text category="h1">Search</Text>
      </Layout>
    </MainLayout>
  );
};
