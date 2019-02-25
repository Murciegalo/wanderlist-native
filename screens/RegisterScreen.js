import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegistrationForm from '../components/RegistrationForm';
import { authRegister } from '../actions/authActions';

export class RegisterScreen extends Component {
  handlePress = async(username, email, password1, password2, home) => {
    console.log(username, email, password1, password2, home);
    await this.props.authRegister(username, email, password1, password2, home);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authenticated) {
      this.props.navigation.navigate('Main')
    }
  }

  render() {
    return (
      <View style={styles.registrationForm}>
        <RegistrationForm handlePress={this.handlePress} {...this.props} />
      </View>
    );
  }
}

const mapState = state => {
  return {
    authenticated: state.auth.authenticated,
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    authRegister,
  }, dispatch)
}

export default connect(mapState, mapDispatch)(RegisterScreen);

RegisterScreen.propTypes = {
  authRegister: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  registrationForm: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
})