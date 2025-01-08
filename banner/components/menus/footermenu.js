import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomePage from '../../HomePage'
import ImagePickerPage from '../../ImagePickerPage'
import LeadPage from '../../pages/LeadPage'
import GrowPage from '../../pages/GrowPage'
import Account from '../../pages/Account'


const tabMenu=()=>{
    const TabNav = createBottomTabNavigator();
    return (
        <TabNav.Navigator>
            <TabNav.Screen name='Home' component={HomePage}/>
            <TabNav.Screen name='ImagePicker' component={ImagePickerPage}/>
            <TabNav.Screen name='Lead' component={LeadPage}/>
            <TabNav.Screen name='Grow' component={GrowPage}/>
            <TabNav.Screen name='Account' component={Account}/>
        </TabNav.Navigator>
    )
}

const FooterMenu = () => {
    const navigation = useNavigation();
    const route = useRoute();
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
            <FontAwesome5 name="home" style={styles.iconStyle} color={route.name === 'Home' && 'blue'}/>
            <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>navigation.navigate('ImagePicker')}>
            <FontAwesome5 name="images" style={styles.iconStyle} color={route.name === 'ImagePicker' && 'blue'}/>
            <Text>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>navigation.navigate('Lead')}>
            <FontAwesome5 name="group" style={styles.iconStyle} color={route.name === 'Lead' && 'blue'}/>
            <Text>About</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>navigation.navigate('Grow')}>
            <FontAwesome5 name="sunrise" style={styles.iconStyle} color={route.name === 'Grow' && 'blue'}/>
            <Text>Grow</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>navigation.navigate('Account')}>
            <FontAwesome5 name="user" style={styles.iconStyle} color={route.name === 'Account' && 'blue'}/>
            <Text>Account</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        margin:10,
        justifyContent:"space-between"
    },
    iconStyle:{
        marginBottom:3,
        alignSelf:"center",
        fontSize:25
    }
})

export default FooterMenu