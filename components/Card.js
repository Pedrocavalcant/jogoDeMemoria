import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function Card({ card, isFlipped, onPress, backImage }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={isFlipped ? card.image : backImage} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '25%',
    height: '40%',
    aspectRatio: 1,
    margin: '5%',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#2e7d32',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
