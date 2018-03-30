import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { Router, Scene,Stack } from 'react-native-router-flux';
import MapPage from './src/Components/MapPage'
import MapRedirect from './src/Components/MapRedirect'



export default class App extends React.Component {
  static navigationOptions = { 
    header: null,
  };
  render() {
    return (
      <Router>
       <Stack key="root">
        <Scene key="MapRedirect" component={MapRedirect}  />  
       <Scene key="MapPage" component={MapPage} />
       
      
       </Stack>
     </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
