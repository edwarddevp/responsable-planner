import React, {useEffect} from 'react';
import {Text, withStyles} from "@ui-kitten/components";
import {useForm} from "react-hook-form";
import {SeInput} from "../../../../Shared/SeFields/SeInput";
import {FooterButtons} from "../../../CreateEvent/components/FooterButtons";
import {SeSeparator} from "../../../../Shared/Separator";
import {Dimensions, ScrollView, View} from "react-native";
import {useApiRequest} from "../../../../hooks/useApiRequest";
import {CATEGORIES, EVENTS_ID} from "../../../../lib/apiRoutes";
import {SeInputDate} from "../../../../Shared/SeFields/SeInputDate";
import {compareAsc} from "date-fns";
import {SeSelect} from "../../../../Shared/SeFields/SeSelect";

const {height} = Dimensions.get('window');

const EditEventFormComponent = ({eva, eventId, event, selectedIndex, navigation}) => {
  const styles = eva?.style
  const {data} = useApiRequest(CATEGORIES)
  const {call: handleEvent, loading} = useApiRequest(EVENTS_ID(eventId), {skip: true})
  const {control, handleSubmit, reset, watch, getValues, setValue, formState: {errors}} = useForm({
    defaultValues: {
      startdate: new Date(),
      enddate: new Date()
    }
  });
  const date = new Date()
  const watchStartDate = watch('startdate', date)

  useEffect(() => {
    const validate = compareAsc(watchStartDate, getValues('enddate'))
    if (validate > 0) {
      setValue('enddate', watchStartDate)
    }
  }, [watchStartDate])

  useEffect(() => {
    if (event?.id && selectedIndex === 1) {
      reset({
        ...event,
        startdate: new Date(event?.startdate),
        enddate: new Date(event?.enddate)
      })
    }
  }, [event, selectedIndex]);

  const onSubmit = async (values) => {
    const res = await handleEvent(values, 'PUT')

    if (res?.success) {
      navigation.navigate('EVENT', {
        screen: 'DASHBOARD',
        params: {
          eventId: eventId,
          refreshEvent: true,
        },
      });
      console.log('%c res?.success', 'background: #222; color: #bada55',res?.success)
      // onClose()
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
          required
          maxLength={30}
        />
        <SeSeparator value={2}/>
        <SeSelect
          name='categoryid'
          control={control}
          errors={errors}
          label='Category'
          placeholder='Category'
          required
          data={data?.data?.categories}
        />
        <SeSeparator value={2}/>
        <Text style={styles?.label}>Fecha del evento:</Text>
        <View style={styles?.twoColumns}>
          <SeInputDate
            name='startdate'
            control={control}
            errors={errors}
            size='small'
            mode='datetime'
            minimumDate={date}
            style={styles?.startDate}
            required
          />
          <SeInputDate
            name='enddate'
            control={control}
            errors={errors}
            size='small'
            mode='datetime'
            minimumDate={watchStartDate}
            style={styles?.endDate}
            required
          />
        </View>
        <SeSeparator value={2}/>
        <SeInput
          name='direction'
          control={control}
          errors={errors}
          label='Ubicación:'
          placeholder='Ubicación'
          rightIcon='map-outline'
        />
        <SeSeparator value={2}/>
        <SeInput
          multiline
          textStyle={{minHeight: 64}}
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
        rightAction={handleSubmit(onSubmit)}
        size='xs'
        gap={2}
        loading={loading}
        confirmButtonText='Guardar Cambios'
      />
    </ScrollView>
  </View>
};

export const EditEventForm = withStyles(EditEventFormComponent, (theme) => ({
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