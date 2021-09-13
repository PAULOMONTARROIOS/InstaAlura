import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList } from 'react-native';
import Post from './src/components/Post'

const width = Dimensions.get('screen').width

class App extends Component {

  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(resposta => resposta.json())
      .then(json => this.setState({ fotos: json }))
  }

  render() {
    return (
      <FlatList
        keyExtractor={item => item.id}
        data={this.state.fotos}
        renderItem={({ item }) =>
          <Post foto={item} />
        }
      />
    );
  }
}

const estilo = StyleSheet.create({
});

export default App;
