import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../components/firebase';
import styles from '../assets/css/home';

export default function Home({ navigation }) {
  const [frequencia, setFrequencia] = useState('');
  const [faltas, setFaltas] = useState('');
  const [docId, setDocId] = useState(null);

  const calcularNovaFrequencia = (frequencia, faltas) => {
    return frequencia - (faltas * 0.1);
  };

  const enviarDados = async () => {
    const novaFrequencia = calcularNovaFrequencia(frequencia, faltas);
    try {
      const docRef = await addDoc(collection(db, 'frequencias'), {
        frequencia,
        faltas,
        novaFrequencia,
      });
      setDocId(docRef.id);
      Alert.alert('Dados enviados com sucesso!', `Nova frequência: ${novaFrequencia}`);
    } catch (error) {
      console.error('Erro ao enviar dados: ', error);
      Alert.alert('Erro ao enviar dados. Tente novamente.');
    }
  };

  const alterarDados = async () => {
    if (!docId) {
      Alert.alert('Nenhum dado para alterar.');
      return;
    }
    const novaFrequencia = calcularNovaFrequencia(frequencia, faltas);
    try {
      const docRef = doc(db, 'frequencias', docId);
      await updateDoc(docRef, {
        frequencia,
        faltas,
        novaFrequencia,
      });
      Alert.alert('Dados alterados com sucesso!', `Nova frequência: ${novaFrequencia}`);
    } catch (error) {
      console.error('Erro ao alterar dados: ', error);
      Alert.alert('Erro ao alterar dados. Tente novamente.');
    }
  };

  const excluirDados = async () => {
    if (!docId) {
      Alert.alert('Nenhum dado para excluir.');
      return;
    }
    try {
      const docRef = doc(db, 'frequencias', docId);
      await deleteDoc(docRef);
      setDocId(null);
      setFrequencia('');
      setFaltas('');
      Alert.alert('Dados excluídos com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir dados: ', error);
      Alert.alert('Erro ao excluir dados. Tente novamente.');
    }
  };

  const visualizarFrequencia = async () => {
    if (!docId) {
      Alert.alert('Nenhum dado para visualizar.');
      return;
    }
    try {
      const docRef = doc(db, 'frequencias', docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        Alert.alert('Dados da Frequência', `Frequência: ${data.frequencia}\nFaltas: ${data.faltas}\nNova Frequência: ${data.novaFrequencia}`);
      } else {
        Alert.alert('Nenhum dado encontrado.');
      }
    } catch (error) {
      console.error('Erro ao visualizar dados: ', error);
      Alert.alert('Erro ao visualizar dados. Tente novamente.');
    }
  };

  const voltar = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calcule sua frequência</Text>
        <TouchableOpacity onPress={voltar}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Frequência Atual</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Digite sua frequência atual"
          value={frequencia}
          onChangeText={setFrequencia}
        />
        <Text style={styles.label}>Número de Faltas Previstas</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Digite o número de faltas previstas"
          value={faltas}
          onChangeText={setFaltas}
        />
        <TouchableOpacity style={styles.button} onPress={enviarDados}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={alterarDados}>
          <Text style={styles.buttonText}>Alterar Dados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonDanger]} onPress={excluirDados}>
          <Text style={styles.buttonText}>Excluir Dados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonInfo]} onPress={visualizarFrequencia}>
          <Text style={styles.buttonText}>Visualizar Frequência</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}