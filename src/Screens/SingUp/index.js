import React, {useState, useContext, useEffect} from 'react';
import {View, TouchableWithoutFeedback, Platform, StatusBar} from 'react-native';
import {
  Button,
  Input,
  StyleService,
  useStyleSheet,
  Text,
  Icon,
  Spinner
} from '@ui-kitten/components';
import {ImageOverlay} from '../../Shared/image-overlay.component';
import {EmailIcon, PersonIcon} from '../../Shared/icons';
import {KeyboardAvoidingView} from '../../Shared/3rd-party';
import {AuthContext} from '../../Navigation/AuthProvider';
import {Controller, useForm} from "react-hook-form";
import {authBgImage, emailRegex} from "../../lib/constants";
import Toast from "react-native-toast-message";

export const SingUp = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const image = {uri: authBgImage};
  const {register} = useContext(AuthContext);

  const styles = useStyleSheet(themedStyles);

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
      password: 'asd123',
      name: 'Pedro'
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);

    const response = await register(values);
    if (response?.success) {
      navigation && navigation.navigate('Login');
      Toast.show({
        text1: `Usuario registrado exitosamente`,
        text2: 'por favor, inicie sessión'
      });
    } else {
      setLoading(false);
      Toast.show({
        text1:`Error de conexion`,
        text2:`inténtelo de nuevo más tarde`,
        type: 'error'
      });
    }
  };

  const onSignInButtonPress = () => {
    navigation && navigation.navigate('Login');
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView>
      <StatusBar style="light" />
      <ImageOverlay
        style={styles.container}
        source={require('../../../assets/images/register.jpg')}>
        <View style={styles.headerContainer}>
          <Text
            category='h1'
            status='control'>
            Bienvenido
          </Text>
          <Text
            style={styles.signInLabel}
            category='s1'
            status='control'>
            Crea una nueva cuenta
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Controller
            control={control}
            render={({fieldState:{isTouched},field: {onChange, onBlur, value}}) => (
              <Input
                status={(errors.name && isTouched) ? 'danger' : 'control'}
                placeholder='Nombre'
                accessoryRight={PersonIcon}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="name"
            rules={{required: true}}
          />
          {errors.name && <Text status='danger'>Campo Requerido.</Text>}
          <Controller
            control={control}
            render={({fieldState:{isTouched},field: {onChange, onBlur, value}}) => (
              <Input
                style={styles.formInput}
                status={(errors.email && isTouched) ? 'danger' : 'control'}
                placeholder='Email'
                accessoryRight={EmailIcon}
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
                style={styles.formInput}
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
          style={styles.signUpButton}
          size='giant'
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {
            loading ?
              <View style={styles.indicator}>
                <Spinner size='small' status='control'/>
              </View> :
              'Registrarse'
          }

        </Button>
        <Button
          style={styles.signInButton}
          appearance='ghost'
          status='control'
          onPress={onSignInButtonPress}>
          Tienes una cuenta? Inicia Sesión
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  profileAvatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
    alignSelf: 'center',
    backgroundColor: 'background-basic-color-1',
    tintColor: 'text-hint-color',
  },
  editAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  formInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
  },
  termsCheckBoxText: {
    color: 'text-control-color',
    marginLeft: 10,
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
