import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const HeaderMenu = () => {
  return (
    <View>
        <TouchableOpacity>
            <FontAwesome5Icon name="call" style={styles.iconStyle}/>
            <Text>Help</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    iconStyle:{
        marginBottom:3,
        alignSelf:"center",
        fontSize:25
    }
})
export default HeaderMenu