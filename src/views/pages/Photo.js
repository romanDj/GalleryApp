import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ActivityIndicator
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loadById, unload} from '../../store/actions/photos';

const styles = StyleSheet.create({
  photo: {
    aspectRatio: 1,
  },
});

export default function Photo({route, navigation}) {
  const {id} = route.params;
  let {current} = useSelector(s => s.photos);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadById(id));
    return () => dispatch(unload());
  },[]);

  return (
    <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
      {current != null ? (
        <Image
          style={styles.photo}
          source={{
            uri: current.full,
          }}
        />
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
}
