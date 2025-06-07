import { Button, FormControl, Input, VStack, Center, Spinner, Alert ,Text, HStack, IconButton, CloseIcon,Select, CheckIcon } from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { postData } from '../service/TarefasService';
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";

const AdicionarTarefa = () => {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false); 
  const [alertMessage, setAlertMessage] = useState(''); 

  const adicionarTarefa = async (titulo, descricao, status) => {
    setLoading(true);
    try {
      const body = { title: titulo, description: descricao, step:status };
      const result = await postData(body);
      setLoading(false);
      setShowAlert(true); 
      setAlertMessage('Tarefa criada com sucesso!');     
    } catch (error) {
      setShowAlert(true); 
      setAlertMessage('Erro ao criar tarefa. Tente novamente mais tarde.');
    }
  };
  

  const navigation = useNavigation();

  const validarForm = Yup.object().shape({
    titulo: Yup.string()
      .min(4, 'O Titulo precisa ter no minimo 4 caracteres')
      .max(64, 'O Titulo precisa ter no maximo 64 caracteres')
      .required('O titulo é obrigatorio'),
    descricao: Yup.string()
      .min(8, 'A descriçao precisa ter no minimo 8 caracteres')
      .max(128, 'A descriçao precisa ter no maximo 128 caracteres')
      .required('A descrição é obrigatoria'),
    status: Yup.string()
      .required('O status é obrigatório')
  });

  return (
    <>
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
    <Center flex={1} px={3} style={{ backgroundColor: 'pink' }}>
     {loading ? ( <Spinner size={'lg'} />) : (
      <Formik 
        initialValues={{ titulo: '', descricao: '', status: ''  }}
        validationSchema={validarForm}
        onSubmit={(values, actions) => {
          adicionarTarefa(values.titulo, values.descricao, values.status);
          actions.resetForm();
          navigation.navigate('Tarefas');
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <VStack space={4} width="100%">
            <FormControl isInvalid={touched.titulo && errors.titulo}>
              <FormControl.Label _text={{color:'white', fontSize: 'md', fontWeight: 'bold' }}>Titulo</FormControl.Label>
              <Input
                onChangeText={handleChange('titulo')}
                onBlur={handleBlur('titulo')}
                value={values.titulo}
                 style={{ backgroundColor: 'white', bordercolor:'pink' }}
                 borderWidth={1} 
                borderColor="#FF69B4" 
              />
              <FormControl.ErrorMessage>{errors.titulo}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={touched.descricao && errors.descricao}>
              <FormControl.Label _text={{color:'white', fontSize: 'md', fontWeight: 'bold' }}>Descricao</FormControl.Label>
              <Input
                onChangeText={handleChange('descricao')}
                onBlur={handleBlur('descricao')}
                value={values.descricao}
                style={{ backgroundColor: 'white' }}
                borderWidth={1} 
                borderColor="#FF69B4" 
              />
              <FormControl.ErrorMessage>{errors.descricao}</FormControl.ErrorMessage>
            </FormControl>
             <FormControl isInvalid={touched.status && errors.status}>
                  <FormControl.Label _text={{ color: 'white', fontSize: 'md', fontWeight: 'bold' }}>Status</FormControl.Label>
                  <Select
                    selectedValue={values.status}
                    minWidth="200"
                    borderWidth={1} 
                  borderColor="#FF69B4"
                    accessibilityLabel="Selecione o status"
                    placeholder="Selecione o status"
                    _selectedItem={{
                      bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                      }} _light={{
                        bg: "coolGray.100",
                        _hover: {
                          bg: "coolGray.200"
                        },
                        _focus: {
                          bg: "coolGray.200:alpha.70"
                        }
                      }} _dark={{
                        bg: "coolGray.800",
                        _hover: {
                          bg: "coolGray.900"
                        },
                        _focus: {
                          bg: "coolGray.900:alpha.70"
                        }
                    }}
                    mt={1}
                    onValueChange={(itemValue) => setFieldValue('status', itemValue)}
                    style={{ backgroundColor: 'white' }}
                    _actionSheetContent={{ bg: 'white' }} 
                    _item={{ bg: 'white' }} 
                  >
                    <Select.Item label="Para fazer" value="Para fazer" />
                    <Select.Item label="Em andamento" value="Em andamento" />
                    <Select.Item label="Pronto" value="Pronto" />
                  </Select>
                  <FormControl.ErrorMessage>{errors.status}</FormControl.ErrorMessage>
                </FormControl>
            <Button onPress={handleSubmit} style={{ backgroundColor: 'rgb(255,105,180)' }} _text={{ fontSize: 'md', fontWeight: 'bold' }}>Adicionar</Button>
          </VStack>
        )}
      </Formik>
    )}
    
     
    </Center>
    </>
  );
};



export default AdicionarTarefa;