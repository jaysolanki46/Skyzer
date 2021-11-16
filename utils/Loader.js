import LoaderImage from '../assets/images/loaders/loader.gif';
import React from 'react';
import { Image, View } from 'react-native';

export default Loader = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ width: 100, height: 100 }} source={LoaderImage} />
        </View>
    );
}