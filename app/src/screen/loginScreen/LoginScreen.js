import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import {hideLoading, showLoading} from '../../redux/action/LoadingAction';
import {styles} from './Styles';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegister: false,
      email: '',
      pass: '',
      confirm: '',
    };
  }

  _next = (next) => {
    switch (next) {
      case 1:
        this._passInput && this._passInput.focus();
        break;
      case 2:
        this._confirmInput && this._confirmInput.focus();
        break;
    }
  };

  _onInputEmail = (text) => {
    this.setState({email: text});
  };

  _onInputPass = (pass) => {
    this.setState({pass: pass});
  };

  _handleSignIn = async () => {};

  _handleRegister = async () => {};

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>WellCome To ...</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'Email'}
          onChangeText={this._onInputEmail}
          blurOnSubmit={false}
          returnKeyType={'next'}
          onSubmitEditing={() => this._next(1)}
        />
        <TextInput
          ref={(ref) => {
            this._passInput = ref;
          }}
          style={styles.textInput}
          secureTextEntry={true}
          placeholder={'PassWord'}
          returnKeyType={'next'}
          onChangeText={this._onInputPass}
          blurOnSubmit={false}
          onSubmitEditing={() => this._next(2)}
        />
        {!this.state.isRegister ? null : (
          <TextInput
            ref={(ref) => {
              this._confirmInput = ref;
            }}
            onChangeText={(text) => this.setState({confirm: text})}
            style={styles.textInput}
            secureTextEntry={true}
            placeholder={'Confirm PassWord'}
            returnKeyType={'next'}
          />
        )}
        <View style={styles.buttonContainer}>
          <Text style={styles.button} onPress={this._handleSignIn}>
            Login
          </Text>
          <Text style={styles.button} onPress={this._handleRegister}>
            Register
          </Text>
        </View>
      </View>
    );
  }
}

export default connect(
  (state) => {
    return {};
  },
  {showLoading, hideLoading},
)(LoginScreen);
