import React, {useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch, useStore, connect} from 'react-redux';
import {load, swap} from '../../store/actions/photos';
import ListItem from '../components/ListItem';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
  },
});

export default function List({navigation}) {
  let states = useSelector(state => state.photos);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(load());
  }, [dispatch]);
  let clickImage = useCallback(id => navigation.push('Photo', {id: id}), [
    navigation,
  ]);
  return (
    <View style={styles.page}>
      <SafeAreaView>
        <FlatList
          refreshing={states.loaded}
          onRefresh={() => dispatch(load())}
          // onEndReached={() => dispatch(swap())}
          data={states.photos}
          // extraData={states.photos}
          renderItem={({item}) => <ListItem data={item} clicked={clickImage} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  );
}
