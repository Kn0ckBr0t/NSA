import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import styles from '../assets/css/login';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../components/firebase';

export default function Cadastro({ navigation }) {
  const [cadrm, setCadrm] = useState("");
  const [cadpassword, setCadpassword] = useState("");

  const fazerCad = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const querySnapshot = await getDocs(query(usersCollection, where("RM", "==", cadrm)));

      if (!querySnapshot.empty) {
        Alert.alert("Esse RM já existe.");
        return;
      }

      await addDoc(usersCollection, {
        RM: cadrm,
        Senha: cadpassword,
      });

      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Não foi possível cadastrar. Tente novamente.");
      console.error("Error adding document: ", error);
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
