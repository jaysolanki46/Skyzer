import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Colors from '../config/Colors';


export default function WavyHeader({ customStyles }) {
  return (
    <View style={customStyles}>
      <View style={{ width: Dimensions.get('window').width, height: 180, backgroundColor: Colors.primary}}>
        <Svg
          height="100%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: 'absolute', bottom: 50 }}
        >
          <Path
            fill={Colors.white}
            d="M0,64L48,74.7C96,85,192,107,288,96C384,85,480,43,576,37.3C672,32,768,64,864,106.7C960,149,1056,203,1152,213.3C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </Svg>
      </View>
    </View>
  );
}