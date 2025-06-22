import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useContext } from 'react';
import { estadologinGlobal } from '../../context/contextData';
import React from 'react'
import { Alert } from 'react-native';



export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const rutas = useNavigation();
  const { login } = useContext(estadologinGlobal);

  const api = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

  const handlogin = async () => {
    try {
      const response = await fetch(`${api}/api/usuario/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // Aquí puedes guardar el token o datos del usuario si tu backend los envía
        login(); // Cambia el estado a logueado
      } else {
        alert(data.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      alert('Error de conexión');
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="account-circle" size={80} color="#4F8EF7" style={{ marginBottom: 20 }} />
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
      <View style={styles.inputContainer}>
        <TextInput
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          left={<TextInput.Icon icon="email" />}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          left={<TextInput.Icon icon="lock" />}
          secureTextEntry
          style={styles.input}
        />
      </View>
      <Button
        mode="contained"
        icon="login"
        onPress={handlogin}
        style={styles.loginButton}
        contentStyle={{ height: 50 }}
        labelStyle={{ fontSize: 16 }}
      >
        Iniciar sesión
      </Button>
      <TouchableOpacity onPress={() => rutas.push('crearcuenta')}>
        <Text style={styles.registerText}>
          ¿No tienes cuenta? <Text style={{ color: '#4F8EF7', fontWeight: 'bold' }}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#22223b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#4F8EF7',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 25,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '100%',
    borderRadius: 8,
    marginBottom: 18,
    backgroundColor: '#4F8EF7',
  },
  registerText: {
    color: '#22223b',
    fontSize: 15,
    textAlign: 'center',
  },
});