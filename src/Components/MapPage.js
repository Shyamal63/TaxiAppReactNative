import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';
import {Actions} from 'react-native-router-flux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { Router, Scene } from 'react-native-router-flux';

const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

export default class MapPage extends React.Component {
  
    static navigationOptions = {
        header: null,
      };
      clickSearch(newData){
        Actions.MapRedirect({mapDetails:newData});
      }
    

  render() {
    return (
      <View style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
        <GooglePlacesAutocomplete
    //    onPress={()=> this.clichSearch()} 
          placeholder="Search"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log(details);
            this.clickSearch(details);
           
            console.log(details.geometry.location);
            
           // console.log(details);
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyDaGFbazSmWpNwypOcASFPAoLU87mtTfU8',
            language: 'en', // language of the results
            types: '(cities)', // default: 'geocode'
          }}
          styles={{
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription:{
              color: '#1faadb',
            },
          }}
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            key:'AIzaSyDaGFbazSmWpNwypOcASFPAoLU87mtTfU8',
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food',
          }}
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3',
          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        //    predefinedPlaces={[homePlace, workPlace]}
          debounce={200}
        />
      </View>
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
