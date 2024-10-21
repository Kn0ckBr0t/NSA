import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import styles from '../assets/css/login';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../components/firebase';

export default function Cadastro({ navigation }) {
  const [cadrm, setCadrm] = useState("");
  const [cadpassword, setCadpassword] = useState("");

  const fazerCad = () => {
      try {
        const usersCollection = collection(db, 'users');

        addDoc(usersCollection, {
          RM: cadrm,
          Senha: cadpassword,
        });

        navigation.navigate("Login");
      } catch (error) {
        console.error("Error adding document: ", error)
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NSA</Text>

      <TextInput
        style={styles.input}
        placeholder="Cadastrar RM"
        placeholderTextColor="#aaa"
        keyboardType="text"
        autoCapitalize="none"
        value={cadrm}
        onChangeText={setCadrm}
      />

      <TextInput
        style={styles.input}
        placeholder="Cadastrar Senha"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
        autoCapitalize="none"
        value={cadpassword}
        onChangeText={setCadpassword}
      />

      <TouchableOpacity style={styles.button} onPress={fazerCad}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Já tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.registerLink}>Entre</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
