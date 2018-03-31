import React from 'react';
import  MapView  from 'react-native-maps';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { View,TextInput,Text, ScrollView, Dimensions,Modal} from 'react-native';
import { Constants } from 'expo';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';



export default class MapRedirect extends React.Component {
    static navigationOptions = {
        header: null,
      };
      constructor(props){
        super(props);
          this.state={
            
            modalVisible:false,
            // latitude: null,
            // longitude: null,
            
            region: {
              latitude: 0.00,
              longitude: 0.00,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            searchType:'',
            sourceaddress:'',
            destinationaddress:''
            
          }; 
          
      }
    
      componentWillMount() {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            this.setState({
              region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }, 
            });
          },
          (error) => console.log( error),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
      }
      openModal(sourceData){
        console.log(sourceData);
        this.setState({
          searchType:sourceData,
          modalVisible:true

        })

      }
      clickSource(sourceData){
        console.log(sourceData)
        this.setState(
         { 
          sourceaddress:sourceData.formatted_address ,
          region:{
            latitude:sourceData.geometry.location.lat,
            longitude: sourceData.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          modalVisible:false
        }    
        )
      }
      clickDestination(dataDestination){
        this.setState(
          {
            destinationaddress:dataDestination.formatted_address ,
            region: {
              latitude:dataDestination.geometry.location.lat,
              longitude: dataDestination.geometry.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            modalVisible:false
          }
        )
      }

  render() {
    return (
      <ScrollView style={{top:40,flex:1}}>
      <View>
        {this.state.searchType ? (
      <TextInput
              style={{height: 100, borderColor: '#fff',borderColor:'#000',borderWidth:1,borderBottomColor:'#000',height:Dimensions.get("window").height-600,borderTopColor:'#000',borderWidth:1,borderRadius:5,margin:5,borderLeftColor:'#000',borderRightColor:'#000'}}
               value={this.state.sourceaddress}
              underlineColorAndroid='transparent'
              onFocus={()=>{this.openModal('source')}}
          /> 
        ):<TextInput
        style={{height: 100, borderColor: '#fff',borderColor:'#000',borderWidth:1,borderBottomColor:'#000',height:Dimensions.get("window").height-600,borderTopColor:'#000',borderWidth:1,borderRadius:5,margin:5,borderLeftColor:'#000',borderRightColor:'#000'}}
        //  value={this.state.newData.formatted_address}
        placeholder="start trip"
        underlineColorAndroid='transparent'
        onFocus={()=>{this.openModal('source')}}
    /> 
      }
      {this.state.searchType ? (
        <TextInput
              style={{height: 100, borderColor: '#fff',borderColor:'#000',borderWidth:1,borderBottomColor:'#000',height:Dimensions.get("window").height-600,borderTopColor:'#000',borderWidth:1,borderRadius:5,margin:5,borderLeftColor:'#000',borderRightColor:'#000'}}
               value={this.state.destinationaddress}
              underlineColorAndroid='transparent'
              onFocus={()=>{this.openModal('destination')}}
          /> 
      ):<TextInput
      style={{height: 100, borderColor: '#fff',borderColor:'#000',borderWidth:1,borderBottomColor:'#000',height:Dimensions.get("window").height-600,borderTopColor:'#000',borderWidth:1,borderRadius:5,margin:5,borderLeftColor:'#000',borderRightColor:'#000'}}
      //  value={this.state.allNewData.formatted_address}
      placeholder="end trip"
      underlineColorAndroid='transparent'
      onFocus={()=>{this.openModal('destination')}}
  /> 
    }
      </View>
      {this.state.searchType ? ( 
    <MapView
    style={{ height:Dimensions.get("window").height}}
    region={this.state.region}   
  >
  <MapView.Marker
        coordinate={this.state.region}
        title={"Your Location"}
      />
  </MapView>
      ):<MapView
      style={{ height:Dimensions.get("window").height}}
      region={this.state.region} 
    >
    <MapView.Marker
          coordinate={this.state.region}
          title={"Your Location"}
        />
    </MapView>
      }
      <Modal animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
           this.setState({modalVisible:false}) ;
          }}>
          {
            this.state.searchType=='source' ? 
            (
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
            this.clickSource(details);
           
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
        ):
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
            this.clickDestination(details);
           
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
      }
        </Modal>
  </ScrollView>
    )
  }
}