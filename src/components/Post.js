import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TextInput
} from 'react-native';

const width = Dimensions.get('screen').width

export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            foto: {
                ...this.props.foto,
                valorComentario: '',
                likers: [{}, {}, {}],
                comentarios: [{ id: 1, login: 'Paulo', texto: 'Bela imagem!' }]
            }
        }
    }

    carregaIcone(likeada) {
        return likeada ? require('./../../resources/img/s2-checked.png') :
            require('./../../resources/img/s2.png')
    }

    like() {
        const { foto } = this.state;
        let novaLista = [];

        if (!foto.likeada) {
            novaLista = [...foto.likers, { login: 'meuUsuario' }]
            //novaLista = foto.likers.concat({login: 'meuUsuario'});
        } else {
            novaLista = foto.likers.filter(liker => {
                return liker.login !== 'meuUsuario'
            })
        }

        const fotoAtualizada = {
            ...this.state.foto,
            likeada: !this.state.foto.likeada,
            likers: novaLista
        }
        this.setState({ foto: fotoAtualizada })
    }

    exibeLikes(likers) {
        if (likers.length <= 0) return;

        return (
            <Text style={estilo.likes}>
                {likers.length} {likers.length > 1 ? ' curtidas' : ' curtida'}
            </Text>
        );
    }

    exibeLegenda(foto) {

        return foto.comentario.length !== 0 &&
            <View style={estilo.comentario}>
                <Text style={estilo.usuarioComentario}>{foto.loginUsuario}</Text>
                <Text>{foto.comentario}</Text>
            </View>
    }

    adicionaComentario() {
        if(this.state.valorComentario === '')
            return;

        const novaLista = [...this.state.foto.comentarios,
        {
            id: this.state.foto.valorComentario,
            login: 'meuUsuario',
            texto: this.state.foto.valorComentario
        }];

        const fotoAtualizada = {
            ...this.state.foto,
            comentarios: novaLista
        }

        this.setState({ foto: fotoAtualizada, valorComentario: '' })
        this.inputComentario.clear();
    }

    render() {
        const { foto } = this.state;

        return (
            <View>
                <View style={estilo.cabecalho}>
                    <Image style={estilo.fotoDePerfil}
                        source={{ uri: foto.urlPerfil }} />
                    <Text style={estilo.nomeUsuario}>{foto.loginUsuario}</Text>
                </View>
                <Image style={estilo.imgPostagem}
                    source={{ uri: foto.urlFoto }} />
                <View style={estilo.rodape}>
                    <TouchableOpacity onPress={this.like.bind(this)}>
                        <Image style={estilo.curtida}
                            source={this.carregaIcone(foto.likeada)} />
                    </TouchableOpacity>

                    {this.exibeLikes(foto.likers)}
                    {this.exibeLegenda(foto)}

                    {foto.comentarios.map(comentario =>
                        <View key={comentario.id} style={estilo.comentario}>
                            <Text style={estilo.usuarioComentario}>{comentario.login}</Text>
                            <Text>{comentario.texto}</Text>
                        </View>
                    )}
                    <View style={estilo.secaoComentario}>
                        <TextInput
                            ref={input => this.inputComentario = input}
                            onChangeText={texto => this.setState({ valorComentario: texto })}
                            style={estilo.texto} placeholder="comente aqui..."></TextInput>
                        <TouchableOpacity onPress={this.adicionaComentario.bind(this)}>
                            <Image style={estilo.imgSend} source={require('../../resources/img/send.png')} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }
};

const estilo = StyleSheet.create({
    cabecalho: {
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    fotoDePerfil: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    nomeUsuario: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10
    },
    imgPostagem: {
        width: width,
        height: width
    },
    rodape: {
        margin: 15
    },
    curtida: {
        height: 30,
        width: 30,
        marginBottom: 10
    },
    likes: {
        fontWeight: 'bold',
    },
    usuarioComentario: {
        fontWeight: 'bold',
        marginRight: 10
    },
    comentario: {
        flexDirection: "row"
    },
    texto: {
        flex: 1,
        height: 40,
    },
    imgSend: {
        height: 25,
        width: 25,
        justifyContent: 'flex-start'
    },
    secaoComentario: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    }

});
