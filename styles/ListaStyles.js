import {
    StyleSheet,
    Dimensions
} from 'react-native';

const larguraDaTela = Dimensions.get('screen').width;

const stylesRanking = StyleSheet.create({
    rankingLista: {
        flex: 1,
    },
    rankingRespostas: {
        marginLeft: 10,
        marginTop: 3,
        fontSize: 14
    },
    rankingJogador: {
        marginLeft: 10,
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'bold',
    },
    rankingData: {
        marginLeft: 10,
        marginTop: 3,
        marginBottom: 10,
        fontSize: 14,
        fontWeight: 'bold',
    }
});

const stylesQuiz = StyleSheet.create({
    quizLista: {
        flex: 1,
    },
    quizPerguntaView: {
        flex: 1,
        margin: 10
    },
    quizPerguntaBotao: {
        flex: 1,
        height: 50,
        borderColor: 'red',
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: 'white',
        margin: 5,
    },
    quizPerguntaOpcao: {
        marginTop: 15,
        marginLeft: 5,
        fontWeight: 'bold'
    },
    quizPerguntaTitulo: {
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    quizPerguntaImg: {
        width: larguraDaTela - 20,
        height: larguraDaTela / 2
    }
});

export { stylesQuiz, stylesRanking }
