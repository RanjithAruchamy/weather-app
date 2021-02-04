import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as location from 'expo-location';
import WeatherInfo from './Components/weatherInfo';
import UnitsPicker from './Components/UnitsPicker';
import {colors} from './utils/index'
import ReloadIcon from './Components/ReloadIcon'
import WeatherDetails from './Components/WeatherDetails'

const weatherApiKey = '8611595a902cdc493b8233b10b0b7124';
const baseUrl = 'https://api.openweathermap.org'

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] =useState(null)
  const [unitSystem, setUnitSystem] = useState('metric') // imperial(f) or metric(c)

  useEffect(() => {
    load();
  }, [unitSystem])

  async function load(){
    setCurrentWeather(null)
    setErrorMessage(null)
    try{
    let {status} = await location.requestPermissionsAsync()
    if(status != 'granted'){
      setErrorMessage('Access to location is mandatory to access this application')
      await alert(errorMessage)
      // status = await location.requestPermissionsAsync()
      return
    }
    // console.log(status);
    const Location = await location.getCurrentPositionAsync()
    const {latitude, longitude} = Location.coords
    const weatherUrl = `${baseUrl}/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${weatherApiKey}`
    const request = await fetch(weatherUrl)
    const response = await request.json()
    if(request.ok){
      // console.log('inside response if');
      setCurrentWeather(response)
    }else{
      // console.log('inside response else');
      setErrorMessage(response.message)
    }
    // alert(`Latitude: ${latitude}, Longitude: ${longitude}`)
  }catch(error){
    setErrorMessage(error.message)
  }
  }
  if(currentWeather){
    
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
        <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
        <ReloadIcon load ={load}/>
        <WeatherInfo currentWeather = {currentWeather} />
        </View>
        <WeatherDetails currentWeather = {currentWeather} unitSystem={unitSystem}/>
      </View>
    );
  }else if(errorMessage){
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }else{
    return(
      <View>
        <ActivityIndicator style={styles.indicator} size='large' color={colors.PRIMARY_COLOR}/>
        <StatusBar style='auto'/>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#85e2ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  main:{
    flex:1,
    justifyContent:'center'
  },
  indicator:{
    top:450,
  }
});
