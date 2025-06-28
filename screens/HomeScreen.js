import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Navbar from '../components/NavBar';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const biomas = [
    {
      key: 'Amazonia',
      title: '🌳 Amazônia',
      description: 'A maior floresta tropical do mundo, cheia de plantas e animais incríveis!',
      image: require('../assets/rio amazonas.png'),
      route: 'Amazonia',
      color: '#4caf50',
    },
    {
      key: 'Cerrado',
      title: '🌾 Cerrado',
      description: 'Com árvores retorcidas e um clima seco, é um dos biomas mais antigos do planeta.',
      image: require('../assets/cerrado.png'),
      route: 'Cerrado',
      color: '#fbc02d',
    },
    {
      key: 'Caatinga',
      title: '🌵 Caatinga',
      description: 'Bioma que só tem no Brasil, com plantas adaptadas à seca do nordeste.',
      image: require('../assets/caatinga.jpg'),
      route: 'Caatinga',
      color: '#ff7043',
    },
    {
      key: 'MataAtlantica',
      title: '🌴 Mata Atlântica',
      description: 'Bioma costeiro rico em espécies, mas que precisa de nossa proteção.',
      image: require('../assets/mata-atlantica.png'),
      route: 'MataAtlantica',
      color: '#388e3c',
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>🌱 Vamos aprender sobre os Biomas Brasileiros!</Text>

        {biomas.map((bioma) => (
          <TouchableOpacity
            key={bioma.key}
            style={[styles.biomaCard, { borderColor: bioma.color }]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(bioma.route)}
          >
            <Image source={bioma.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={[styles.title, { color: bioma.color }]}>{bioma.title}</Text>
              <Text style={styles.description}>{bioma.description}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Por que é importante cuidar dos biomas?</Text>
          <Text style={styles.sectionText}>
            Os biomas são casas para muitos animais e plantas. Se cuidarmos deles, teremos um planeta saudável para nós e para as próximas gerações!
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Projeto Memória Ambiental - Educando com diversão</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    backgroundColor: '#e8f5e9',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2e7d32',
  },
  biomaCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 14,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 20,
    marginTop: 30,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#2e7d32',
  },
  sectionText: {
    fontSize: 16,
    color: '#4a4a4a',
    lineHeight: 24,
  },
  footer: {
    marginTop: 40,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
