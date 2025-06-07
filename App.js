import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeBaseProvider } from 'native-base';
import TarefasPraFazer from './components/TarefasPraFazer';
import TarefasEmAndamento from './components/TarefasEmAndamento';
import TarefasFinalizadas from './components/TarefasFinalizadas';
import AdicionarTarefa from './components/AdicionarTarefa';
import EditarTarefa from './components/EditarTarefa';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Para fazer') {
            iconName = 'list-circle-outline';
          } else if (route.name === 'Nova Tarefa') {
            iconName = 'duplicate-outline';
          } else if (route.name === 'Pronto') {
            iconName = 'checkmark-circle-outline';
          } else if (route.name === 'Em Andamento') {
            iconName = 'options-outline';
          }

          return <Ionicons name={iconName} size={size} color={'#FF69B4'} />;
        },

        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: '#FF69B4',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#FF69B4',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
        },
      })}>
      <Tab.Screen name="Nova Tarefa" component={AdicionarTarefa} />
      <Tab.Screen name="Para fazer" component={TarefasPraFazer} />
      <Tab.Screen name="Em Andamento" component={TarefasEmAndamento} />
      <Tab.Screen name="Pronto" component={TarefasFinalizadas} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditarTarefa"
            component={EditarTarefa}
            options={{ title: 'Editar Tarefa' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
