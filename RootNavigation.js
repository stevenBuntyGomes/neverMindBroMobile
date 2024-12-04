import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import ScreensNav from './Components/nav/ScreensNav'

export default function RootNavigation () {
    return (
        <NavigationContainer>
            <ScreensNav/>
        </NavigationContainer>
    )
}

