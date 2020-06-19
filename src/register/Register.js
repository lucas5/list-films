import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { TextInput, DefaultTheme, HelperText, Snackbar } from 'react-native-paper'
import { Button } from 'native-base'

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: 'black',
        accent: '#f1c40f',
    },
};


export default class Register extends Component {

    state = {
        username: '',
        password: '',
        confirm_password: '',
        email: '',
        visible: false
    }

    setUsername = (username) => {
        this.setState({ username })
    }

    setEmail = (email) => {
        this.setState({ email })
    }

    setPassword = (password) => {
        this.setState({ password })
    }

    setConfirmPassword = (confirm_password) => {
        this.setState({ confirm_password })
    }

    auth = () => {
        if (this.state.confirm_password !== this.state.password) {
            this.setState({ visible: true })
        }
    }

    _hasErrors = () => {
        return !(this.state.confirm_password === this.state.password);
    }

    _onDismissSnackBar = () => this.setState({ visible: false });

    render() {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../assets/images/pluma.png')}
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
                    />
                    <TextInput
                        label='Email'
                        value={this.state.email}
                        onChangeText={this.setUsername}
                        mode="flat"
                        style={{ backgroundColor: 'transparent' }}
                        theme={theme}
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
                    <TextInput
                        label='Confirm password'
                        value={this.state.confirm_password}
                        onChangeText={this.setConfirmPassword}
                        mode="flat"
                        secureTextEntry
                        style={{ backgroundColor: 'transparent', marginTop: 5 }}
                        theme={theme}
                    />
                    <HelperText
                        type="error"
                        visible={this._hasErrors()}
                    >
                        As senhas não batem!
                    </HelperText>
                    <View style={{ paddingTop: 30 }}>
                        <Button block danger rounded onPress={this.auth}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Cadastrar</Text>
                        </Button>
                    </View>
                </View>
                <Snackbar
                    style={{ backgroundColor: '#FA5858' }}
                    visible={this.state.visible}
                    onDismiss={this._onDismissSnackBar}
                >
                    Algo deu errado :(
        </Snackbar>
            </View>
        )
    }
}

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
