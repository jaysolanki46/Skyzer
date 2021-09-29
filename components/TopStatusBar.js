import React from 'react';
import { StatusBar, Platform } from 'react-native';

export default TopStatusBar = () => {
    return (
            Platform.OS === 'ios' ?
                <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
                :
                <StatusBar barStyle="light-content" hidden={false} translucent={true}></StatusBar>
    );
}