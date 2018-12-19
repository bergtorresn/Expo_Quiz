import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class ResultadoScreen extends React.Component {

  static navigationOptions = {
    title: 'Resultado',
  };

  constructor(){
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.props.navigation.navigate('Ranking')}>
          <Text>Ranking</Text>
        </TouchableHighlight>
      </View>
    );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});