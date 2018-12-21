import {
    StyleSheet
} from 'react-native';

const stylesResultado = StyleSheet.create({
    resultadoContainer: {
        flex: 1
    },
    resultadoViewDados: {
        margin: 10,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    resultadoTextInfo: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    resultadoTextDados: {
        fontSize: 18,
    },
    resultadoBotaoRanking: {
        height: 50,
        borderColor: 'red',
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: 'white',
        margin: 10,
    },
    resultadoTituloBotao: {
        marginTop: 15,
        marginLeft: 5,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export { stylesResultado }
