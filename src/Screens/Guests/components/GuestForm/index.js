import React, { useEffect } from 'react';
import {Text, withStyles} from "@ui-kitten/components";
import {SeModal} from "../../../../Shared/SeModal";
import {useForm} from "react-hook-form";
import {SeInput} from "../../../../Shared/SeFields/SeInput";
import {FooterButtons} from "../../../CreateEvent/components/FooterButtons";
import {SeSeparator} from "../../../../Shared/Separator";
import {View} from "react-native";
import {useApiRequest} from "../../../../hooks/useApiRequest";
import {EVENTS_EVENTID_GUESTS} from "../../../../lib/apiRoutes";
import {emailRegex} from "../../../../lib/constants";

const GuestFormComponent = ({eva, isOpen, onClose, eventId, getGuests, guestToEdit}) => {
  const styles = eva?.style
  const {call: handleGuest, loading} = useApiRequest(EVENTS_EVENTID_GUESTS(eventId), {skip:true})
  const {control, handleSubmit, reset, formState: {errors}} = useForm();

  useEffect(() => {
    reset(guestToEdit)
  }, [guestToEdit]);

  const onSubmit = async (values) => {
    let res
    if(guestToEdit?.id){
      res = await handleGuest(values, 'PUT',`/${guestToEdit?.id}`)
    } else {
      res = await handleGuest(values, 'POST')
    }

    if(res?.success){
      getGuests()
      onClose()
    }
  }

  return <SeModal isOpen={isOpen} onClose={onClose}>
    <Text style={styles?.title}>
      {guestToEdit?.id? `Editar ${guestToEdit?.name} 😎` :"Añadir Invitado 😎"}
    </Text>
    <SeSeparator value={2}/>
    <View style={{flex: 2}}>
      <SeInput
        name='name'
        control={control}
        errors={errors}
        label='Nombre'
        placeholder='Nombre'
        rightIcon='person'
        required
        maxLength={30}
      />
      <SeSeparator value={2}/>
      <SeInput
        name='email'
        control={control}
        errors={errors}
        label='Email'
        placeholder='email@email.com'
        rightIcon='email'
        pattern={{
          pattern:emailRegex,
          errorMsg: 'Email Inavlido'
        }}
        trim
        maxLength={30}
        required
      />
      <SeSeparator value={2}/>
      <SeInput
        name='phone'
        control={control}
        errors={errors}
        label='Telefono'
        placeholder='Telefono'
        rightIcon='phone'
      />
    </View>
    <SeSeparator value={4}/>

    <FooterButtons
      style={styles?.containerButtons}
      leftAction={onClose}
      rightAction={handleSubmit(onSubmit)}
      size='xs'
      gap={2}
      loading={loading}
    />
  </SeModal>
};

export const GuestForm = withStyles(GuestFormComponent, (theme) => ({

  title: {
    fontSize: 20
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
}));