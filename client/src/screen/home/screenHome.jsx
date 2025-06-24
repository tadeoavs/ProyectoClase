import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { estadoGlobal } from '../../context/contextData'
import { Card, Button, Divider, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function screenHome() {
  const { contador, sumar, restar } = useContext(estadoGlobal);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Card style={styles.card} elevation={3}>
        <Card.Title title="Home" subtitle="Pantalla principal" />
        <Divider />
        <Card.Content>
          <Text style={styles.label}>Contador:</Text>
          <Text style={styles.counter}>{contador}</Text>
          <View style={styles.buttonRow}>
            <Button mode="contained" onPress={sumar} style={styles.buttonPlus}>
              Sumar
            </Button>
            <Button mode="outlined" onPress={restar} style={styles.buttonMinus}>
              Restar
            </Button>
          </View>
        </Card.Content>
      </Card>
      <View style={styles.cardsRow}>
        <Card style={styles.cardFeature}>
          <Card.Title title="Luces" subtitle="Accede a tus luces" />
          <Card.Content style={{ alignItems: 'center' }}>
            <IconButton icon="lightbulb" size={48} color="#FFD600" />
            <Button
              mode="contained"
              style={{ marginTop: 16, borderRadius: 8 }}
              onPress={() => navigation.navigate('luces')}
            >
              Acceder a luces
            </Button>
          </Card.Content>
        </Card>
        <Card style={styles.cardFeature}>
          <Card.Title title="Puertas" subtitle="Accede a tus puertas" />
          <Card.Content style={{ alignItems: 'center' }}>
            <IconButton icon="door" size={48} color="#1976D2" />
            <Button
              mode="contained"
              style={{ marginTop: 16, borderRadius: 8 }}
              onPress={() => navigation.navigate('puertas')}

            >
              Acceder a puertas
            </Button>
          </Card.Content>
        </Card>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 350,
    borderRadius: 12,
    paddingVertical: 10,
  },
  label: {
    fontSize: 18,
    color: '#22223b',
    marginTop: 10,
    marginBottom: 2,
  },
  counter: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 18,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  buttonPlus: {
    borderRadius: 8,
    marginRight: 8,
  },
  buttonMinus: {
    borderRadius: 8,
    marginLeft: 8,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 16, // Espacio entre cartas (puedes ajustar)
    marginTop: 20,
    width: '100%',
  },
  cardFeature: {
    flex: 1,
    maxWidth: 170, // Ajusta el ancho máximo si lo deseas
    borderRadius: 12,
    marginHorizontal: 4,
  },
});