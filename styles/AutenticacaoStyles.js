import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    autenticacaoView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30
    },
    autenticacaoInput: {
      height: 45,
      alignSelf: 'stretch',
      backgroundColor: '#EEE',
      marginBottom: 20
    },
    autenticacaoButton: {
      height: 45,
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#069',
      marginBottom: 10
    },
    autenticacaoTextButton: {
      fontWeight: 'bold',
      color: '#FFF'
    }
  });

export { styles }