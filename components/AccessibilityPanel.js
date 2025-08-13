// components/AccessibilityPanel.js
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function AccessibilityPanel() {
  const { theme, setTheme, fontSize, setFontSize } = useContext(ThemeContext);
  const [visible, setVisible] = useState(false);

  return (
    <View>
      {/* Botão flutuante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setVisible(true)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>♿</Text>
      </TouchableOpacity>

      {/* Modal de acessibilidade */}
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { fontSize, color: theme.text }]}>
              Acessibilidade
            </Text>

            {/* Troca de tema */}
            <TouchableOpacity style={styles.button} onPress={() => setTheme('default')}>
              <Text>Tema Padrão</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setTheme('daltonico')}>
              <Text>Tema Daltonismo</Text>
            </TouchableOpacity>

            {/* Ajuste de fonte */}
            <TouchableOpacity style={styles.button} onPress={() => setFontSize(fontSize + 2)}>
              <Text>Aumentar Fonte</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setFontSize(fontSize - 2)}>
              <Text>Diminuir Fonte</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeBtn} onPress={() => setVisible(false)}>
              <Text style={{ color: 'white' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#166b21',
    padding: 12,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 20,
    borderRadius: 12,
    width: 280,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 15,
  },
  button: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  closeBtn: {
    backgroundColor: '#166b21',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
});
