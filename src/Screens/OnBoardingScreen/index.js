import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageOne from "./components/PageOne";
import PageTwo from "./components/PageTwo";
import PageThree from "./components/PageThree";

const Dots = ({selected}) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor
      }}
    />
  );
}

const Skip = ({...props}) => (
  <TouchableOpacity
    style={{marginHorizontal: 10}}
    {...props}
  >
    <Text style={{fontSize: 16}}>Saltar</Text>
  </TouchableOpacity>
);

const Next = ({...props}) => (
  <TouchableOpacity
    style={{marginHorizontal: 10}}
    {...props}
  >
    <Text style={{fontSize: 16}}>Siguiente</Text>
  </TouchableOpacity>
);

const Done = ({...props}) => (
  <TouchableOpacity
    style={{marginHorizontal: 10}}
    {...props}
  >
    <Text style={{fontSize: 16}}>Listo</Text>
  </TouchableOpacity>
);

export const OnBoardingScreen = ({navigation}) => {
  const onDone = () => {
    AsyncStorage.setItem('alreadyLaunched', 'true');
    navigation.replace("Login")
  }

  const onSkip = () => {
    AsyncStorage.setItem('alreadyLaunched', 'true');
    navigation.replace("Login")
  }
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={onSkip}
      onDone={onDone}
      pages={[
        {
          backgroundColor: '#D8B668',
          image: <PageOne width={300} height={300} />,
          title: 'Crea tu evento',
          subtitle: 'Una manera sencilla de administrar y hacer seguro tu evento',
        },
        {
          backgroundColor: '#EBD18A',
          image: <PageTwo width={300} height={300} />,
          title: 'Protegelo contra el covid-19',
          subtitle: 'Te ayudamos a cumplir con las medidas de seguridad, necesarias para hacer tu evento seguro',
        },
        {
          backgroundColor: '#D8B668',
          image: <PageThree width={300} height={300} />,
          title: '¡Empieza ya!',
          subtitle: "Crea un evento y transformalo en una experiencia segura para todos",
        },
      ]}
    />
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img:{
    width: 50,
    height: 50
  }
});
