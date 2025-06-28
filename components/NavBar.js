import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NavBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Home")}>
        <Image source={require("../assets/Home.png")} style={styles.footerIcon} />
        <Text style={styles.footerText}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("MapaBiomas")}>
        <Image source={require("../assets/folha.jpeg")} style={styles.footerIcon} />
        <Text style={styles.footerText}>Jogue</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Notificacoes")}>
        <Image source={require("../assets/NavNotificação.png")} style={styles.footerIcon} />
        <Text style={styles.footerText}>Ranking</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate("Menu")}>
        <Image source={require("../assets/Menu.png")} style={styles.footerIcon} />
        <Text style={styles.footerText}>Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center", 
    backgroundColor: "#F45B74", 
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    position: "absolute", 
    bottom: 15,
    left: 10,
    right: 10,
    elevation: 10, 
    zIndex: 99,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  footerItem: {
    alignItems: "center", 
  },
  footerIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 4,
    marginRight: 4,
  },
  footerText: {
    fontSize: 10,
    color: "white",
  },
});

export default NavBar;
