import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navegacion from "./Navegacion";
import StateGlobal from "./src/context/StateGlobal";
import StateLogin from "./src/context/StateLogin";

export default function App() {
  return (
    <StateLogin>
      <StateGlobal>
        <NavigationContainer>
          <Navegacion />
        </NavigationContainer>
      </StateGlobal>
    </StateLogin>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
