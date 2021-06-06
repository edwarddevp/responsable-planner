import React, { useEffect } from 'react';
import {Text, withStyles} from "@ui-kitten/components";
import {SeModal} from "../../../../Shared/SeModal";
import {useForm} from "react-hook-form";
import {SeInput} from "../../../../Shared/SeFields/SeInput";
import {FooterButtons} from "../../../CreateEvent/components/FooterButtons";
import {SeSeparator} from "../../../../Shared/Separator";
import {View} from "react-native";
import {useApiRequest} from "../../../../hooks/useApiRequest";
import {EVENTS_EVENTID_TASKS} from "../../../../lib/apiRoutes";

const TasksFormComponent = ({eva, isOpen, onClose, eventId, getTasks, taskToEdit}) => {
  const styles = eva?.style
  const {call: handleGuest, loading} = useApiRequest(EVENTS_EVENTID_TASKS(eventId), {skip:true})
  const {control, handleSubmit, reset, formState: {errors}} = useForm();

  useEffect(() => {
    reset(taskToEdit)
  }, [taskToEdit]);

  const onSubmit = async (values) => {
    let res
    if(taskToEdit?.id){
      res = await handleGuest(values, 'PUT',`/${taskToEdit?.id}`)
    } else {
      res = await handleGuest(values, 'POST')
    }

    if(res?.success){
      getTasks()
      onClose()
    }
  }

  return <SeModal isOpen={isOpen} onClose={onClose} flexContent={8} upperSpace={2}>
    <Text style={styles?.title}>
      {taskToEdit?.id? `Editar ${taskToEdit?.title} 😃` :"Añadir Tarea 😃"}
    </Text>
    <SeSeparator value={2}/>
    <View style={{flex: 2}}>
      <SeInput
        name='title'
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
        multiline
        textStyle={{ minHeight: 64 }}
        name='description'
        control={control}
        errors={errors}
        label='Descripcion:'
        placeholder='Descripcion'
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

export const TasksForm = withStyles(TasksFormComponent, (theme) => ({
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