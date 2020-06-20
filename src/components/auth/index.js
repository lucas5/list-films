import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { TextInput, DefaultTheme, Button } from 'react-native-paper'
//import { Button } from 'native-base'
import api from '../../services/api';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../../store/actions/dataUser';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: 'black',
        accent: '#f1c40f',
    },
};



class Login extends Component {

    state = {
        username: '',
        password: '',
        loading: false
    }

    setUsername = (username) => {
        this.setState({ username })
    }

    setPassword = (password) => {
        this.setState({ password })
    }

    auth = async () => {

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        this.setState({ loading: true });

        try {
            const result = await api.post(`/user/auth`, user);
            this.setState({ loading: false });
            this.props.loginUser(result.data);
            this.props.navigation.navigate('Home');
        } catch (error) {
            this.setState({ loading: false });
            console.log(error);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../../assets/images/bilhete.png')}
                    />
                </View>

                <View style={{ margin: 30, rounded: 10 }}>
                    <TextInput
                        label='Username'
                        value={this.state.username}
                        onChangeText={this.setUsername}
                        mode="flat"
                        style={{ backgroundColor: 'transparent' }}
                        theme={theme}
                        autoCapitalize="none"
                    />
                    <TextInput
                        label='Password'
                        value={this.state.password}
                        onChangeText={this.setPassword}
                        mode="flat"
                        secureTextEntry
                        style={{ backgroundColor: 'transparent', marginTop: 5 }}
                        theme={theme}
                    />
                    <TouchableOpacity>
                        <Text style={{ color: 'red', textAlign: 'right', fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', paddingTop: 10, paddingBottom: 10 }}>Esqueceu a senha?</Text>
                    </TouchableOpacity>

                    <View style={{ paddingTop: 30 }}>
                        <Button mode="outlined" onPress={this.auth} color="red" loading={this.state.loading}>
                            Entrar
                        </Button>
                    </View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={{ color: 'red', textAlign: 'left', fontSize: 15, fontWeight: 'bold', paddingTop: 10, paddingBottom: 10 }}>Não possui cadastro?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    userLogged: state.dataUser.userLogged
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    text: {
        color: "grey",
        fontSize: 30,
        fontWeight: "bold"
    },
    tinyLogo: {
        width: 150,
        height: 150,
    },
});

