import React from 'react';
import  MapView  from 'react-native-maps';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { View,TextInput,Text, ScrollView, Dimensions} from 'react-native';
import { Constants } from 'expo';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';



export default class MapRedirect extends React.Component {
    static navigationOptions = {
        header: null,
      };
      constructor(props){
        super(props);
          this.state={
            newData:this.props.mapDetails,
            allNewData:this.props.mapPageDetails,
            // latitude: null,
            // longitude: null,
            
            region: {
              latitude: 0.00,
              longitude: 0.00,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            
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
  render() {
    return (
       this.state.newData ? (
         console.log(this.state.newData),
         
      <ScrollView style={{top:23,flex:1}}>
        <View >
          <TextInput
            style={{height: 80, borderColor: '#fff',borderColor:'#000',borderWidth:1,borderBottomColor:'#000',height:Dimensions.get("window").height-600,borderTopColor:'#000',borderWidth:1,borderRadius:5,margin:5,borderLeftColor:'#000',borderRightColor:'#000'}}
            value={this.state.newData.formatted_address}
            underlineColorAndroid='transparent'
            onFocus={()=>{Actions.MapPage({searchType:'source'})}}
          />
          {this.state.allNewData ? (
          <TextInput
            style={{height: 80, borderColor: '#fff',borderColor:'#000',borderWidth:1,borderBottomColor:'#000',height:Dimensions.get("window").height-600,borderTopColor:'#000',borderWidth:1,borderRadius:5,margin:5,borderLeftColor:'#000',borderRightColor:'#000'}}
            value={this.state.allNewData.formatted_address}
            underlineColorAndroid='transparent'
            onFocus={()=>{Actions.MapPage({searchType:'destination'})}}
          />
          ): <TextInput
          style={{height: 80, borderColor: '#fff',borderColor:'#000',borderWidth:1,borderBottomColor:'#000',height:Dimensions.get("window").height-600,borderTopColor:'#000',borderWidth:1,borderRadius:5,margin:5,borderLeftColor:'#000',borderRightColor:'#000'}}
          
          underlineColorAndroid='transparent'
          onFocus={()=>{Actions.MapPage({searchType:'destination'})}}
        />
        }
        </View>
      <MapView
      style={{ height:Dimensions.get("window").height}}
      initialRegion={{
              latitude: this.state.newData.geometry.location.lat,
              longitude: this.state.newData.geometry.location.lng,
              latitudeDelta: 0.005,
              longitudeDelta:  0.010
          }}   
    >
    <MapView.Marker
         coordinate={{"latitude":this.state.newData.geometry.location.lat,"longitude": this.state.newData.geometry.location.lng}}
         title={"Your Location"}
       />
    </MapView>
     </ScrollView>

      ):
      <ScrollView style={{top:23,flex:1}}>
        <View >
          <TextInput
            style={{height: 80, borderColor: '#fff',borderColor:'#000',borderWidth:3,borderBottomColor:'#000',height:Dimensions.get("window").height-600,borderTopColor:'#000',borderWidth:1,borderRadius:5,margin:5,borderLeftColor:'#000',borderRightColor:'#000'}}
            placeholder="start trip"
            // value={this.state.newData.formatted_address}
            // value={this.state.region.coords}
            // value={this.state.region}
            underlineColorAndroid='transparent'
            onFocus={()=>{Actions.MapPage({searchType:'source'})}}
          />
           <TextInput
            style={{height: 80, borderColor: '#fff',borderColor:'#000',borderWidth:1,borderBottomColor:'#000',height:Dimensions.get("window").height-600,borderTopColor:'#000',borderWidth:1,borderRadius:5,margin:5,borderLeftColor:'#000',borderRightColor:'#000'}}
            // value={this.state.newData.formatted_address}
            underlineColorAndroid='transparent'
            onFocus={()=>{Actions.MapPage({searchType:'destination'})}}
          />
 
        </View>
      <MapView
      style={{ height:Dimensions.get("window").height}}
      region={this.state.region}
    >
    <MapView.Marker
      coordinate={{"latitude":this.state.region.latitude,"longitude":this.state.region.longitude}}
      title={"Your Location"}
    />
    </MapView>
     </ScrollView>
    );
   return(
     this.state.allNewData ? (
      //  console.log(this.state.allNewData),
      <ScrollView style={{top:40,flex:1}}>
      <View >
      <TextInput
              style={{height: 100, borderColor: '#fff',borderColor:'#000',borderWidth:1,borderBottomColor:'#000',height:Dimensions.get("window").height-600,borderTopColor:'#000',borderWidth:1,borderRadius:5,margin:5,borderLeftColor:'#000',borderRightColor:'#000'}}
               value={this.state.newData.formatted_address}
              underlineColorAndroid='transparent'
              onFocus={()=>{Actions.MapPage({searchType:'source'})}}
          /> 
        <TextInput
              style={{height: 100, borderColor: '#fff',borderColor:'#000',borderWidth:1,borderBottomColor:'#000',height:Dimensions.get("window").height-600,borderTopColor:'#000',borderWidth:1,borderRadius:5,margin:5,borderLeftColor:'#000',borderRightColor:'#000'}}
               value={this.state.allNewData.formatted_address}
              underlineColorAndroid='transparent'
              onFocus={()=>{Actions.MapPage({searchType:'destination'})}}
          /> 
           
      </View>
    <MapView
    style={{ height:Dimensions.get("window").height}}
    initialRegion={{
            latitude: this.state.newData.geometry.location.lat,
            longitude: this.state.newData.geometry.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta:  0.010
        }}   
  >
  <MapView.Marker
        coordinate={{"latitude":this.state.newData.geometry.location.lat,"longitude": this.state.newData.geometry.location.lng}}
        title={"Your Location"}
      />
  </MapView>

  </ScrollView>

      
     ): <ScrollView style={{top:40,flex:1}}>
     <View >
     <TextInput
         style={{height: 100, borderColor: '#fff',borderColor:'#000',borderWidth:3,borderBottomColor:'#000',height:Dimensions.get("window").height-600,borderTopColor:'#000',borderWidth:1,borderRadius:5,margin:5,borderLeftColor:'#000',borderRightColor:'#000'}}
         placeholder="Start Trip"
         // value={this.state.newData.formatted_address}
         // value={this.state.region.coords}
         // value={this.state.region}
         underlineColorAndroid='transparent'
         onFocus={()=>{Actions.MapPage({searchType:'source'})}}
       />
       <TextInput
         style={{height: 100, borderColor: '#fff',borderColor:'#000',borderWidth:3,borderBottomColor:'#000',height:Dimensions.get("window").height-600,borderTopColor:'#000',borderWidth:1,borderRadius:5,margin:5,borderLeftColor:'#000',borderRightColor:'#000'}}
         placeholder="End Trip"
         // value={this.state.newData.formatted_address}
         // value={this.state.region.coords}
         // value={this.state.region}
         underlineColorAndroid='transparent'
         onFocus={()=>{Actions.MapPage({searchType:'destination'})}}
       />
     </View>
   <MapView
   style={{ height:Dimensions.get("window").height}}
   region={this.state.region}
 >
 <MapView.Marker
   coordinate={{"latitude":this.state.region.latitude,"longitude":this.state.region.longitude}}
   title={"Your Location"}
 />
 </MapView>
  </ScrollView>
   );
   
  }
}