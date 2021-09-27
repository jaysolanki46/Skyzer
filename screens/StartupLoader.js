import React, { useRef } from 'react';
import { ImageBackground, Animated, View , Image, StyleSheet} from 'react-native';
import BackgroundImage from "../assets/images/background.jpg";
import StartUpImage from '../assets/images/startup-logo.png';

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
      <ImageBackground source={BackgroundImage} resizeMode="cover" style={{
        flex: 1,
        justifyContent: "center"
      }}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <FadeInView style={{flex:1, justifyContent: 'center', alignItems: 'center', }}>
            <Image
                            style={styles.logo}
                            source={StartUpImage}
                        />
        </FadeInView>
        </View>
      </ImageBackground>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 500,
        height: 100,
    }
});