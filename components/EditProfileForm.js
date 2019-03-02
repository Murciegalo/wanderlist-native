import React, { Component } from 'react'
import { 
  ActivityIndicator,
  Picker, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  StyleSheet 
} from 'react-native'
import countries from '../countries.json'

export default class EditProfileForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: props.user.username,
      email: props.user.email,
      biography: props.user.biography,
      home: props.user.home.id,
    };
  }

  render() {
    // Create the Picker items from a list of the countries' names and value.
    const pickerItems = [...countries].sort((a, b) => a.name > b.name).map(country => (
      <Picker.Item key={country.pk} value={country.pk} label={country.name} />
    ))

    var { authenticating } = this.props;

    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.textInput}
          value={this.state.username}
          onChangeText={(value) => this.setState({username: value})}
        />
        <TextInput 
          style={styles.textInput}
          value={this.state.email}
          onChangeText={(value) => this.setState({email: value})}
        />
        <TextInput 
          style={styles.textInput}
          placeholder='Biography'
          value={this.state.biography}
          onChangeText={(value) => this.setState({biography: value})}
        />
        <Picker
          style={styles.picker}
          selectedValue={this.state.home}
          onValueChange={(value) => this.setState({home: value})}
        >
          {pickerItems}
        </Picker>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.updateButton}
          >
            <Text style={styles.text}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => this.props.navigation.navigate('Profile')}
          >
            <Text style={{ fontSize: 16 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width: 300
  },
  textInput: {
    height: 50,
    fontSize: 16
  },
  picker: {
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  updateButton: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2196f3",
    flex: 1,
    marginRight: 5,
    borderRadius: 10
  },
  cancelButton: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    flex: 1,
    marginLeft: 5,
    borderRadius: 10
  },
  text: {
    color: 'white',
    fontSize: 16
  }
})