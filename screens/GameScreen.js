import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions, TouchableOpacity } from 'react-native';
import NavBar from '../components/NavBar';
import Card from '../components/Card';
import { useNavigation, useRoute } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const isLargeScreen = screenWidth > 600;
const numColumns = isLargeScreen ? 4 : 2;
const cardSpacing = 16;
const cardSize = (screenWidth * 0.9 - cardSpacing * (numColumns + 1)) / numColumns;

const biomas = [
  { id: 1, name: 'Amazônia', image: require('../assets/boto.png') },
  { id: 2, name: 'Cerrado', image: require('../assets/guarana.png') },
  { id: 3, name: 'Caatinga', image: require('../assets/caatinga.jpg') },
  { id: 4, name: 'Mata Atlântica', image: require('../assets/mata-atlantica.png') },
];

const cardBackImage = require('../assets/folha.jpeg');

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export default function GameScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { fase, onGameComplete } = route.params;

  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [faseFinalizada, setFaseFinalizada] = useState(false);

  useEffect(() => {
    const biomaAtual = biomas.find((b) => b.id === fase) || biomas[0];
    const duplicatedCards = [biomaAtual, biomaAtual];
    const shuffledCards = shuffle(
      duplicatedCards.map((card, index) => ({ ...card, key: index }))
    );
    setCards(shuffledCards);
    setStartTime(Date.now());
    setMatched([]);
    setSelected([]);
    setElapsedTime(0);
    setGameOver(false);
    setFaseFinalizada(false);
  }, [fase]);

  useEffect(() => {
    let timer;
    if (startTime && !gameOver) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime, gameOver]);

  useEffect(() => {
    const uniqueCardIds = [...new Set(cards.map(card => card.id))];
    if (uniqueCardIds.length > 0 && matched.length === uniqueCardIds.length && !faseFinalizada) {
      setFaseFinalizada(true);
      setGameOver(true);
      setTimeout(() => {
        Alert.alert(
          'Parabéns!',
          `Você completou a fase ${fase} em ${elapsedTime} segundos!`);
      }, 500);
    }
  }, [matched, cards, gameOver, elapsedTime, faseFinalizada]);

  const handleCardPress = (index) => {
    if (
      selected.length === 2 ||
      selected.includes(index) ||
      matched.includes(cards[index].id) ||
      gameOver
    ) return;

    const newSelected = [...selected, index];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (cards[first].id === cards[second].id) {
        setMatched((prevMatched) => {
          const newMatchedSet = new Set([...prevMatched, cards[first].id]);
          return [...newMatchedSet];
        });
        setTimeout(() => setSelected([]), 800);
      } else {
        setTimeout(() => setSelected([]), 800);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <View style={styles.container}>
        <Text style={styles.title}>Jogo da Memória - {biomas.find(b => b.id === fase)?.name}</Text>
        <Text style={styles.timer}>Tempo: {elapsedTime}s</Text>
        <View style={styles.board}>
          {cards.map((card, index) => (
            <Card
              key={card.key}
              card={card}
              isFlipped={selected.includes(index) || matched.includes(card.id)}
              onPress={() => handleCardPress(index)}
              backImage={cardBackImage}
              style={{ width: cardSize, height: cardSize, margin: cardSpacing / 2 }}
            />
          ))}
        </View>
        {faseFinalizada && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (onGameComplete) onGameComplete();
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonText}>Avançar para o Mapa</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, alignItems: 'center' },
  title: {
    fontSize: isLargeScreen ? 32 : 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#2e7d32',
  },
  timer: {
    fontSize: isLargeScreen ? 20 : 16,
    marginBottom: 10,
  },
  board: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#e8f5e9',
    padding: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#388e3c',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#2e7d32',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
