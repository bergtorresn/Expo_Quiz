import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    loginView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30
    },
    loginInput: {
      height: 45,
      alignSelf: 'stretch',
      backgroundColor: '#EEE',
      marginBottom: 20
    },
    loginButton: {
      height: 45,
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#069',
      marginBottom: 10
    },
    loginTextButton: {
      fontWeight: 'bold',
      color: '#FFF'
    }
  });

export { styles }