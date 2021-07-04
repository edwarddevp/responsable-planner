import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableWithoutFeedback, Platform} from 'react-native';
import {Button, Input, Text, Icon, Spinner, withStyles, useTheme} from '@ui-kitten/components';
import Toast from 'react-native-toast-message';
import {ImageOverlay} from '../../Shared/image-overlay.component';
import {EmailIcon} from '../../Shared/icons';
import {KeyboardAvoidingView} from '../../Shared/3rd-party';
import {AuthContext} from '../../Navigation/AuthProvider';
import {useForm, Controller} from "react-hook-form";
import {authBgImage, emailRegex} from "../../lib/constants";
import { StatusBar } from 'react-native';
import loginImage from './../../../assets/loginImage.jpg'

const LoginScreenComponent = ({navigation,eva}) => {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const styles = eva?.style
  const theme = useTheme();
  const image = {uri: authBgImage};
  const {login} = useContext(AuthContext);

  useEffect(() => {
    if(Platform.OS === 'android') {
      StatusBar.setBarStyle('light-content');
    }
    return () => {
      StatusBar.setBarStyle('dark-content');
    }
  }, []);

  const {control, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      email:'test8@email.com',
      password: 'asd123'
    },
  });

  const onSubmit = async ({email, password}) => {
    setLoading(true);
    const response = await login(email, password);

    if (!response?.success) {
      setLoading(false);
      if(response?.errors?.error?.[0]){
        Toast.show({
          text1:response?.errors?.error?.[0],
          type:'error'
        });
      } else {
        Toast.show({
          text1:`Error de conexion`,
          text2:`inténtelo de nuevo más tarde`,
          type:'error'
        });
      }
    }
  };

  const onSignUpButtonPress = () => {
    navigation && navigation.navigate('Signup');
  };

  const renderPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={()=>setPasswordVisible(!passwordVisible)}>
      <Icon fill={theme['color-primary-500']} {...props} name={passwordVisible ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView>
      <StatusBar style="light" />
      <ImageOverlay
        style={styles.container}
        source={loginImage}
      >
        <View style={styles.headerContainer}>
          <Text
            style={styles.textColor}
            category='h1'
            status='control'>
            Bienvenido
          </Text>
          <Text
            style={{...styles.textColor,...styles.signInLabel}}
            category='s1'
            status='control'>
            Inicia sesión en tu cuenta
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            render={({fieldState:{isTouched},field: {onChange, onBlur, value}}) => (
              <Input
                status={(errors.email && isTouched) ? 'danger' : 'control'}
                placeholder='Email'
                accessoryRight={(props)=> <EmailIcon fill={theme['color-primary-500']} {...props}/>}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="email"
            rules={{required: true, pattern: emailRegex}}
            defaultValue=""
          />
          {
            errors.email?.type === 'required' ?
              <Text status='danger'>Campo Requerido.</Text> :
              errors.email?.type === 'pattern' &&
              <Text status='danger'>Email Invalido.</Text>
          }
          <Controller
            control={control}
            render={({fieldState:{isTouched},field: {onChange, onBlur, value}}) => (
              <Input
                style={styles.passwordInput}
                status={(errors.password && isTouched) ? 'danger' : 'control'}
                placeholder='Contraseña'
                accessoryRight={renderPasswordIcon}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                secureTextEntry={!passwordVisible}
              />
            )}
            name="password"
            rules={{required: true}}
            defaultValue=""
          />
          {errors.password && <Text status='danger'>Campo Requerido.</Text>}
        </View>
        <Button
          type='submit'
          style={styles.signInButton}
          size='giant'
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {
            loading ?
              <View style={styles.indicator}>
                <Spinner size='small' status='control'/>
              </View> :
              'Inicia Sesión'
          }

        </Button>

        <Button
          style={styles.signUpButton}
          appearance='ghost'
          status='control'
          onPress={onSignUpButtonPress}>
          No tienes una cuenta? Registrate
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

export const LoginScreen = withStyles(LoginScreenComponent, (theme) => ({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 216,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textColor: {
    // color: theme['color-primary-500']
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  signInLabel: {
    marginTop: 16,
  },
  passwordInput: {
    marginTop: 24,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  signUpButton: {
    marginVertical: 12,
  },
  socialAuthContainer: {
    marginTop: 32,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
}));

