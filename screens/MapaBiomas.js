import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions, Alert, ScrollView } from 'react-native';
import NavBar from '../components/NavBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import GameScreen from './GameScreen';

const screenWidth = Dimensions.get('window').width;

const biomas = [
  { id: 1, name: '', position: { top: '32%', left: '22%' }},
  { id: 2, name: '', position: { top: '52%', left: '48%' } },
  { id: 3, name: 'Caatinga', position: { top: '38%', left: '63%' }, image: require('../assets/caatinga.jpg') },
  { id: 4, name: 'Mata Atlântica', position: { top: '63%', left: '75%' }, image: require('../assets/mata-atlantica.png') },
];

const personagem = require('../assets/personagem.png');

export default function MapaBiomas() {
  const navigation = useNavigation();
  const [faseAtual, setFaseAtual] = useState(1);
  const [jogoConcluido, setJogoConcluido] = useState(false);

  // Quando o jogo for concluído, avança fase ou reinicia
  useEffect(() => {
    if (jogoConcluido) {
      if (faseAtual < biomas.length) {
        Alert.alert('Parabéns!', `Você completou a fase ${faseAtual}! Avançando para a próxima.`);
        setFaseAtual(faseAtual + 1);
      } else {
        Alert.alert('Parabéns!', 'Você completou todas as fases!');
        setFaseAtual(1);
      }
      setJogoConcluido(false);
    }
  }, [jogoConcluido]);

  // Navega para o jogo passando fase e callback
  const iniciarJogo = () => {
    navigation.navigate('GameScreen', {
      fase: faseAtual,
      onGameComplete: () => setJogoConcluido(true),
    });
  };

  return (
    <View style={styles.container}>
      <NavBar />
      <Text style={styles.title}>Mapa dos Biomas - Fase {faseAtual}</Text>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mapWrapper}>
          <Image
            source={require('../assets/mapa-brasil-biomas.png')}
            style={styles.mapImage}
            resizeMode="contain"
          />

          {biomas.map((bioma) => (
            <View
              key={bioma.id}
              style={[
                styles.marker,
                {
                  top: bioma.position.top,
                  left: bioma.position.left,
                },
                faseAtual === bioma.id && styles.markerAtiva,
              ]}
            >
              <Image source={bioma.image} style={styles.biomaImage} />
              <Text style={styles.biomaLabel}>{bioma.name}</Text>
            </View>
          ))}

          <Image
            source={personagem}
            style={[
              styles.personagem,
              {
                top: biomas[faseAtual - 1].position.top,
                left: biomas[faseAtual - 1].position.left,
              },
            ]}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={iniciarJogo}>
          <Text style={styles.buttonText}>
            {faseAtual === 1 ? 'Iniciar Jogo' : `Jogar Fase ${faseAtual}`}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e8f5e9', alignItems: 'center', paddingTop: 10 },
  scrollContainer: { width: '100%' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2e7d32', marginBottom: 12, textAlign: 'center' },
  mapWrapper: { width: screenWidth * 0.9, aspectRatio: 1, position: 'relative', marginBottom: 20 },
  mapImage: { width: '100%', height: '100%' },
  marker: { position: 'absolute', alignItems: 'center', width: 90, padding: 4 },
  markerAtiva: { borderColor: '#2e7d32', borderWidth: 3, borderRadius: 10, backgroundColor: '#a5d6a7' },
  biomaImage: { width: 60, height: 60, borderRadius: 10 },
  biomaLabel: { color: '#1b5e20', fontWeight: 'bold', textAlign: 'center', marginTop: 4, fontSize: 14 },
  personagem: { position: 'absolute', width: 60, height: 45, marginLeft: -10, marginTop: -55 },
  button: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 20,
    minWidth: 220,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
});
