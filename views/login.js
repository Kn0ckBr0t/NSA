import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import styles from '../assets/css/login';
import { db } from '../components/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore'; // Import necessary Firestore functions

export default function Login({ navigation }) {
  const [rm, setRm] = useState('');
  const [password, setPassword] = useState('');

  const fazerLogin = async () => {
    try {
      const q = query(
        collection(db, 'users'),
        where('RM', '==', rm),
        where('Senha', '==', password)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Alert.alert("Login realizado com sucesso!");
        navigation.navigate('Home');
      } else {
        Alert.alert("RM ou senha incorretos. Tente novamente.");
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
      Alert.alert("Erro ao realizar login. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NSA</Text>

      <TextInput
        style={styles.input}
        placeholder="RM"
        placeholderTextColor="#aaa"
        keyboardType="text"
        autoCapitalize="none"
        value={rm}
        onChangeText={setRm}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={fazerLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Não tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.registerLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}