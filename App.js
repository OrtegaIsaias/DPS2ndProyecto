import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';

const Stack = createNativeStackNavigator();

// -------------------- HOME SCREEN --------------------
function HomeScreen({ navigation }) {
  return (
    <View style={stylesHome.container}>
      <Text style={stylesHome.title}>MiComuniAPP</Text>
      <Text style={stylesHome.subtitle}>Gestión de eventos y actividades</Text>

      <TouchableOpacity
        style={stylesHome.btn}
        onPress={() => navigation.navigate('Eventos')}
      >
        <Text style={stylesHome.btnText}>Ver eventos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[stylesHome.btn, { backgroundColor: '#ef476f' }]}
        onPress={() => navigation.navigate('AgregarEvento')}
      >
        <Text style={stylesHome.btnText}>Agregar evento</Text>
      </TouchableOpacity>
    </View>
  );
}

const stylesHome = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe66d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 38, fontWeight: 'bold', color: '#2b2d42' },
  subtitle: { marginTop: 10, fontSize: 18, color: '#2b2d42' },
  btn: {
    marginTop: 20,
    backgroundColor: '#06d6a0',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 12,
  },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

// -------------------- EVENTS SCREEN --------------------
function EventsScreen({ navigation, route }) {
  const [eventsList, setEventsList] = useState([
    { id: '1', title: 'Partido de fútbol', date: 'Dom 30 Nov', place: 'Cancha Central', type: 'Deporte' },
    { id: '2', title: 'Taller de Manualidades (niños)', date: 'Sáb 6 Dic', place: 'Casa Comunal', type: 'Niños' },
    { id: '3', title: 'Taller de Memoria (adultos mayores)', date: 'Vie 12 Dic', place: 'Centro Día', type: 'Adultos Mayores' },
  ]);

  // Si llega un nuevo evento desde AddEventScreen → lo agregamos a la lista
  if (route.params?.nuevoEvento) {
    const nuevo = route.params.nuevoEvento;
    if (!eventsList.some(ev => ev.id === nuevo.id)) {
      setEventsList([...eventsList, nuevo]);
    }
  }

  return (
    <ScrollView contentContainerStyle={stylesEvents.page}>
      <Text style={stylesEvents.title}>Eventos</Text>

      {eventsList.map(e => (
        <TouchableOpacity
          key={e.id}
          style={stylesEvents.card}
          onPress={() => navigation.navigate('Detalles', e)}
        >
          <Text style={stylesEvents.cardType}>{e.type}</Text>
          <Text style={stylesEvents.cardDate}>{e.date}</Text>
          <Text style={stylesEvents.cardTitle}>{e.title}</Text>
          <Text style={stylesEvents.cardPlace}>{e.place}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const stylesEvents = StyleSheet.create({
  page: { padding: 20, backgroundColor: '#f7f7f7' },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ff2d55',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#0044ff',
    padding: 18,
    marginBottom: 18,
    borderRadius: 12,
  },
  cardType: { color: '#fff' },
  cardDate: { color: '#fff' },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  cardPlace: { color: '#fff' },
});

// -------------------- EVENT DETAILS --------------------
function EventDetailScreen({ route }) {
  const { title, date, place, type } = route.params;

  return (
    <View style={stylesDetail.container}>
      <Text style={stylesDetail.title}>{title}</Text>
      <Text style={stylesDetail.info}>📅 Fecha: {date}</Text>
      <Text style={stylesDetail.info}>📍 Lugar: {place}</Text>
      <Text style={stylesDetail.info}>🏷 Tipo: {type}</Text>
    </View>
  );
}

const stylesDetail = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 30, fontWeight: 'bold', marginBottom: 20 },
  info: { fontSize: 18, marginBottom: 10 },
});

// -------------------- ADD EVENT SCREEN --------------------
function AddEventScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [type, setType] = useState('');

  return (
    <View style={stylesAdd.container}>
      <Text style={stylesAdd.title}>Agregar Evento</Text>

      <TextInput
        style={stylesAdd.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={stylesAdd.input}
        placeholder="Fecha"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={stylesAdd.input}
        placeholder="Lugar"
        value={place}
        onChangeText={setPlace}
      />

      <TextInput
        style={stylesAdd.input}
        placeholder="Tipo (Niños, Deporte, etc)"
        value={type}
        onChangeText={setType}
      />

      <TouchableOpacity
        style={stylesAdd.btn}
        onPress={() => {
          const nuevo = {
            id: Date.now().toString(),
            title,
            date,
            place,
            type,
          };

          navigation.navigate('Eventos', { nuevoEvento: nuevo });
        }}
      >
        <Text style={stylesAdd.btnText}>Guardar Evento</Text>
      </TouchableOpacity>
    </View>
  );
}

const stylesAdd = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: '#118ab2',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

// -------------------- MAIN APP --------------------
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Eventos" component={EventsScreen} />
        <Stack.Screen name="Detalles" component={EventDetailScreen} />
        <Stack.Screen name="AgregarEvento" component={AddEventScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}