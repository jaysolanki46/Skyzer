import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import { Animated, View, Image, StyleSheet } from 'react-native';
import StartUpImage from '../assets/images/startup-logo.png';
import TopStatusBar from '../components/TopStatusBar';
import Colors from '../config/Colors';

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(1)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
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
    <LinearGradient colors={[Colors.backgroundColor1of3, Colors.backgroundColor2of3, Colors.backgroundColor3of3]} style={{
      flex: 1,
    }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TopStatusBar />
        <FadeInView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <Image
            style={styles.logo}
            source={StartUpImage}
          />
        </FadeInView>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 500,
    height: 100,
  }
});