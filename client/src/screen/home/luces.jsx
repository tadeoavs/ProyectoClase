import { StyleSheet, Text, View, FlatList, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function Luces() {
  const [luces, setLuces] = useState([]);
  const api = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

  // Función para obtener las luces
  const fetchLuces = async () => {
    try {
      const res = await fetch(`${api}/api/luces`);
      const data = await res.json();
      setLuces(data.body || []);
    } catch {
      setLuces([]);
    }
  };

  useEffect(() => {
    fetchLuces();
  }, []);

  const toggleLuz = async (id, status) => {
    try {
      await fetch(`${api}/api/luces/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: !status }),
      });
      fetchLuces(); // Refresca la lista después de actualizar
    } catch (e) {
      alert('Error al actualizar la luz');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Luces</Text>
      <FlatList
        data={luces}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.luzItem}>
            <View>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.ubicacion}>{item.ubicacion}</Text>
            </View>
            <Switch
              value={!!item.status}
              onValueChange={() => toggleLuz(item.id, item.status)}
            />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  luzItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  nombre: { fontSize: 18, fontWeight: 'bold' },
  ubicacion: { fontSize: 14, color: '#666' },
});