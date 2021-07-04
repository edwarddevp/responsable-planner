import React, {useEffect, useState} from 'react';
import Toast from "react-native-toast-message";
import {Controller, useForm} from "react-hook-form";
import {Icon, Input, Text, withStyles} from "@ui-kitten/components";
import {ScrollView, TouchableWithoutFeedback, View} from "react-native";
import {SeInput} from "../../../../Shared/SeFields/SeInput";
import {FooterButtons} from "../../../CreateEvent/components/FooterButtons";
import {SeSeparator} from "../../../../Shared/Separator";
import {useApiRequest} from "../../../../hooks/useApiRequest";
import {USERS_ID} from "../../../../lib/apiRoutes";

const UserSettingsFormComponent = ({eva, user, selectedIndex, navigation}) => {
  const styles = eva?.style
  const {call: handleEvent, loading} = useApiRequest(USERS_ID(user?.id), {skip: true})
  const {control, handleSubmit, reset, formState: {errors}} = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );
  
  useEffect(() => {
    if (user?.id && selectedIndex === 1) {
      reset({
        ...user,
      })
    }
  }, [user, selectedIndex]);

  const onSubmit = async (values) => {
    const res = await handleEvent(values, 'PUT')

    if (res?.success) {
      navigation.navigate('HOME');
      Toast.show({
        text1: `Usuario actualizado exitosamente`
      });
    }
  }

  return <View>
    <ScrollView contentContainerStyle={styles?.scrollView}>
      <View>
        <SeInput
          name='name'
          control={control}
          errors={errors}
          label='Nombre'
          placeholder='Nombre'
          rightIcon='person'
          maxLength={30}
        />
        <SeSeparator value={2}/>
        <SeInput
          name='password'
          control={control}
          errors={errors}
          label='Nueva Contraseña'
          placeholder='Nueva Contraseña'
          accessoryRight={renderPasswordIcon}
          secureTextEntry={!passwordVisible}
          maxLength={30}
        />
      </View>
      <SeSeparator value={4}/>
      <FooterButtons
        style={styles?.containerButtons}
        rightAction={handleSubmit(onSubmit)}
        size='xs'
        loading={loading}
        confirmButtonText='Guardar Cambios'
        buttonSize='medium'
      />
    </ScrollView>
  </View>
};

export const UserSettingsForm = withStyles(UserSettingsFormComponent, (theme) => ({
  scrollView: {
    paddingHorizontal: 26,
    paddingVertical: 26,
  },
  title: {
    fontSize: 20
  },
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  containerButtons: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  label: {
    fontSize: 16,
    marginBottom: 12
  },
}));