import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class imageUpload extends React.Component {
  state = {
    photo: null,
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

  render() {
    const { photo } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
        )}

        <TouchableHighlight style={[styles.buttonContainer, styles.addBookButton]} onPress={() => this.handleChoosePhoto('add_books')}>
          <Text style={styles.addBookText}>Choose Photo</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({

  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 250,
    borderRadius: 5,
    borderColor: '#4863A0',
    marginTop: 20,
  },
  addBookButton: {
    backgroundColor: '#4863A0',
  },
  addBookText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});