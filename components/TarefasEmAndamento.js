import { useState, useEffect, useCallback } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getData, patchStep, deleteData } from '../service/TarefasService';
import RenderItem from './Tarefa';
import { useFocusEffect } from '@react-navigation/native';
import { Divider, VStack, Alert ,Text, HStack, IconButton, CloseIcon } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const TarefasEmAndamento = () => {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false); 
  const [alertMessage, setAlertMessage] = useState('');

  const navigation = useNavigation();
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getData();
      const resultFiltered = result.filter(task => task.step === 'Em andamento');
      setTarefas(resultFiltered);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchData();
    }, [])
  );


  const nextStep = async (item) => {
    setLoading(true);
    try {
      const step = 'Pronto';
      await patchStep(item.id, step);
      await fetchData();
      setAlertMessage('Tarefa concluída'); 
      setShowAlert(true); 
    } catch (error) {
      setAlertMessage('Erro ao mover tarefa. Tente novamente mais tarde.');
      setShowAlert(true); 
    } finally {
      setLoading(false);
    }
  };

  const backStep = async (item) => {
    setLoading(true);
    try {
      const step = 'Para fazer';
      await patchStep(item.id, step);
      await fetchData();
      setAlertMessage('Tarefa para fazer'); 
      setShowAlert(true); 
    } catch (error) {
      setAlertMessage('Erro ao mover tarefa. Tente novamente mais tarde.');
      setShowAlert(true); 
    } finally {
      setLoading(false);
    }
  };

  const editarTarefa = async (item) => {
    navigation.navigate('EditarTarefa', { id: item.id });
  };

  const deleteTarefa = async (item) => {
    setLoading(true);
    try {            
      await deleteData(item.id);
      await fetchData();
      setAlertMessage('Tarefa deletada');
      setShowAlert(true); 
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      setAlertMessage('Erro ao deletar tarefa. Tente novamente mais tarde.');
      setShowAlert(true); 
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <RenderItem 
      item={item} 
      back={backStep} 
      next={nextStep} 
      edit={editarTarefa} 
      remove={deleteTarefa} 
    />
  );

  return (
    <View style={styles.container}>
      {showAlert && (
        <Alert w="100%" status={alertMessage.includes('sucesso') ? 'success' : 'error'}>
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="md" color="coolGray.800">
                    {alertMessage}
                  </Text>
                </HStack>
                <IconButton variant="unstyled" _focus={{
              borderWidth: 0
            }} icon={<CloseIcon size="3" />} _icon={{
              color: "coolGray.600"
            }} />
              </HStack>
            </VStack>
          </Alert>
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#FF1493" style={styles.spinner} />
      ) : tarefas.length === 0 ? (
        <Text style={styles.emptyMessage}>Nenhum item na lista :(</Text>
      ) : (
        <FlatList
          data={tarefas}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <Divider />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'pink'
  },  
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default TarefasEmAndamento;
