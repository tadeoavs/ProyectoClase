import { StyleSheet, Text, View, FlatList, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function Puertas() {
    const [puertas, setPuertas] = useState([]);
    const api = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

    // Obtener las puertas
    const fetchPuertas = async () => {
        try {
            const res = await fetch(`${api}/api/puertas`);
            const data = await res.json();
            setPuertas(data.body || []);
        } catch {
            setPuertas([]);
        }
    };

    useEffect(() => {
        fetchPuertas();
    }, []);

    const togglePuerta = async (id, status) => {
        try {
            await fetch(`${api}/api/puertas/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: !status }),
            });
            fetchPuertas(); // Refresca la lista después de actualizar
        } catch (e) {
            alert('Error al actualizar la puerta');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Puertas</Text>
            <FlatList
                data={puertas}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.puertaItem}>
                        <View>
                            <Text style={styles.nombre}>{item.nombre}</Text>
                            <Text style={styles.ubicacion}>{item.ubicacion}</Text>
                        </View>
                        <Switch
                            value={!!item.status}
                            onValueChange={() => togglePuerta(item.id, item.status)}
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
    puertaItem: {
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