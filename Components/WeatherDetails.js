import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { colors } from '../utils/index'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors
export default function WeatherDetails({ currentWeather, unitSystem }) {
    const {
        main: { feels_like, humidity, pressure },
        wind: { speed }
    } = currentWeather

    const windSpeed = unitSystem === 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/hour`
    return (
        <View style={styles.weatherDetails}>
            <View style={styles.weatherDetailsRow}>
                <FontAwesome5 name="temperature-low" size={24} color={PRIMARY_COLOR} />
                <View style={{ ...styles.weatherDetialsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }}>
                    <View style={styles.weatherDetailsItems}>
                        <Text>Feels like :</Text>
                        <Text style={styles.textSecondary}>{feels_like}°</Text>
                    </View>
                </View>
                <MaterialCommunityIcons name="water" size={30} color={PRIMARY_COLOR} />
                <View style={styles.weatherDetailsItems}>
                    <Text>Humidity :</Text>
                    <Text style={styles.textSecondary}>{humidity} %</Text>
                </View>
            </View>
            <View style={{...styles.weatherDetailsRow, borderTopWidth:1, borderTopColor:BORDER_COLOR}}>
                <MaterialCommunityIcons name="weather-windy" size={27} color={PRIMARY_COLOR} />
                <View style={{ ...styles.weatherDetialsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }}>
                    <View style={styles.weatherDetailsItems}>
                        <Text>Wind Speed:</Text>
                        <Text style={styles.textSecondary}>{windSpeed}</Text>
                    </View>
                </View>
                <MaterialCommunityIcons name="speedometer" size={36} color={PRIMARY_COLOR} />
                <View style={styles.weatherDetailsItems, styles.textSecondary}>
                    <Text>Pressure :</Text>
                    <Text style={styles.textSecondary}>{pressure} hpa</Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    weatherDetails: {
        marginTop: 'auto',
        width: 380,
        margin: 40,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10
    },
    weatherDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        // padding: 5
    },
    weatherDetialsBox: {
        padding: 20
    },
    weatherDetailsItems: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    textSecondary: {
        fontSize: 15,
        color: SECONDARY_COLOR,
        fontWeight: '700',
        ...Platform.select({
            ios:{
                margin: 5
            },
            android:{
                margin: 4
            }
        }),
    }
})