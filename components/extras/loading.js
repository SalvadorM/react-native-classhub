import React from 'react'
import { View, Text,ActivityIndicator, StyleSheet } from 'react-native'

export default Loading = () => {
    return(
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#3D9994'
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      },
    //   classname: {
    //       fontSize: 32,
    //       color: 'palevioletred'
    //   }
})