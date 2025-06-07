import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RenderItem = ({ item, back, next, edit, remove }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.titulo}>{item.title}</Text>
      <Text style={styles.descricao}>{item.description}</Text>      

      <View style={styles.icones}>
        <TouchableOpacity onPress={() => back(item)}>
          <Ionicons name='arrow-undo-circle-outline' size={24} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => next(item)}>
          <Ionicons name='arrow-redo-circle-outline' size={24} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => edit(item)}>
          <Ionicons name='create-outline' size={24} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => remove(item)}>
          <Ionicons name='trash-outline' size={24} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    backgroundColor: '#FF69B4',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#fff',    
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  descricao: {
    fontSize: 14,  
    color: 'white'
  },
  icones: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 6,
    gap:8,
    },
});

export default RenderItem;
