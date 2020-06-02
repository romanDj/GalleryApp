import {Image, Text, TouchableHighlight, View, StyleSheet} from 'react-native';
import React from 'react';

export default function ListItem({data, clicked}) {
  return (
    <View style={styles.logoContainer}>
      <TouchableHighlight onPress={() => clicked(data.id)}>
        <Image
          style={styles.logo}
          source={{
            uri: data.small,
          }}
        />
      </TouchableHighlight>
      <View style={styles.logoInfo}>
        {data.title != null && <Text>Название - {data.title}</Text>}
        <Text style={styles.author}>Автор - {data.author}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    paddingBottom: 10,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(136,136,136)',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  logo: {
    aspectRatio: 1,
  },
  logoInfo: {
    margin: 10,
  },
  author: {
    color: '#717171',
    fontWeight: 'bold',
  },
});
