import React from 'react'
import {View, Platform, StyleSheet} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {colors} from '../utils/index'

export default function ReloadIcon({load}){
    const reloadIcon = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'
    return(
        <View style={styles.relodIcon}>
            <Ionicons onPress={load} name={reloadIcon} size={24} color={colors.BORDER_COLOR} />
        </View>
    )
}
const styles = StyleSheet.create({
    relodIcon:{
        position:'absolute',
        
        ...Platform.select({
            ios:{
                right:-90,
                top:60,
            },
            android:{
                right:-60,
                top:40,
            }
        }),
        
    }
})