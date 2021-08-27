import React, { useRef, useEffect } from 'react';
import { Animated, Text, View , ActivityIndicator, Image, StyleSheet} from 'react-native';

const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  
    React.useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }
      ).start();
    }, [fadeAnim])
  
    return (
      <Animated.View                 
        style={{
          ...props.style,
          opacity: fadeAnim,         
        }}
      >
        {props.children}
      </Animated.View>
    );
  }
  
export default Loading = () => {

    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <FadeInView style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
                            style={styles.logo}
                            source={require('../assets/images/startup-logo.png')}
                        />
        </FadeInView>
        </View>
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    logo: {
        width: 500,
        height: 100,
    }
});