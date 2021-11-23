import React from 'react';
import { Image } from 'react-native';
import LogoImage from "../assets/images/logo.png";

export default Logo = () => {
    return (
        <Image style={{ width: 50, height: 50, }} source={LogoImage} />
    );
}