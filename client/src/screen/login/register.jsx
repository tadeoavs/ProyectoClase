import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import React from 'react';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [loading, setLoading] = useState(false);
  const rutas = useNavigation();

  const api = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

  const handleRegister = async () => {
    if (!nombre || !email || !pw || !pw2) {
      alert('Completa todos los campos');
      return;
    }
    if (pw !== pw2) {
      alert('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${api}/api/usuario/agregar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: 0,
          nombre,
          email,
          pw,
          status: 1
        }),
      });
      const data = await response.json();
      if (response.ok && data.status !== false) {
        alert('Usuario registrado correctamente');
        rutas.goBack();
      } else {
        alert(data.mensaje || 'Error al registrar');
      }
    } catch (error) {
      alert('Error de conexión');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <TextInput
        label="Nombre"
        value={nombre}
        onChangeText={setNombre}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Contraseña"
        value={pw}
        onChangeText={setPw}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Repetir contraseña"
        value={pw2}
        onChangeText={setPw2}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleRegister}
        loading={loading}
        style={styles.button}
      >
        Registrarse
      </Button>
      <TouchableOpacity onPress={() => rutas.goBack()}>
        <Text style={styles.loginText}>
          ¿Ya tienes cuenta? <Text style={{ color: '#4F8EF7', fontWeight: 'bold' }}>Inicia sesión</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#22223b',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    borderRadius: 8,
    marginBottom: 18,
    backgroundColor: '#4F8EF7',
  },
  loginText: {
    color: '#22223b',
    fontSize: 15,
    textAlign: 'center',
  },
});