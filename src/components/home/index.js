import React, { Component } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';

import { connect } from 'react-redux';
import Axios from 'axios';

class Home extends Component {

    state = {
        searchQuery: 'star',
        films: []
    };

    _onChangeSearch = query => this.setState({ searchQuery: query });

    getFilms = async () => {
        const result = await Axios.get('http://www.omdbapi.com/?apikey=2e5772f5&s=' + this.state.searchQuery);
        //console.log(result.data.Search);
        this.setState({ films: result.data.Search });
    }

    render() {
        const { searchQuery } = this.state;
        console.log(this.state.films);
        return (
            <View style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={this._onChangeSearch}
                    value={searchQuery}
                />
                <ScrollView style={{ padding: 10 }}>
                    {this.state.films.map((value) => (
                        <View key={value.imdbID} style={{ padding: 5 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={{ width: 50, height: 50, borderRadius: 120 }}
                                    source={{
                                        uri: value.Poster,
                                    }}
                                />
                                <View>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', textAlignVertical: 'center', marginLeft: 10 }}>{value.Title}</Text>
                                    <Text style={{ fontSize: 15, textAlignVertical: 'center', marginLeft: 10 }}>{value.Year}</Text>
                                </View>
                            </View>
                            <Divider style={{ marginTop: 10 }} />
                        </View>
                    ))}
                </ScrollView>
                <Button mode="contained" onPress={this.getFilms} color="red" style={{ marginTop: 10 }}>
                    GO
                </Button>
            </View>
        )
    }
}

export default connect(state => ({ userLogged: state.dataUser.userLogged }))(Home);