import React, {useState, useEffect} from "react";
import {Layout, withStyles} from "@ui-kitten/components";
import {MainLayout} from "../../Layout/MainLayout";
import {EventSecurityMeasuresList} from "./components/EventSecurityMeasuresList";
import {FloatingActionButton} from "../../Shared/FloatingActionButton";
import {useDisclosure} from "../../hooks/useDisclosure";
import {useApiRequest} from "../../hooks/useApiRequest";
import {
  EVENTS_EVENTID_SECURITYMEASURES,
  SECURITYMEASURES
} from "../../lib/apiRoutes";
import {useIsFocused} from "@react-navigation/native";
import {SeAlert} from "../../Shared/SeAlert";
import Toast from "react-native-toast-message";

const EventSecurityMeasuresScreen = ({navigation, eva, route}) => {
  const {style:styles, theme} = eva;
  const {eventId, eventName, eventSecurityMeasuresIds} = route?.params || {};
  const {call: handleSecurityMeasure, loading} = useApiRequest(EVENTS_EVENTID_SECURITYMEASURES(eventId), {
    skip: true,
    method: 'POST'
  })

  const {
    data: securityMeasures,
    call: getSecurityMeasures,
    loading: loadingSecurityMeasures
  } = useApiRequest(SECURITYMEASURES)

  // check if screen is focused
  const isFocused = useIsFocused();

  useEffect(() => {
    getSecurityMeasures()
  }, [isFocused]);


  const { isOpen, onClose, onOpen} = useDisclosure()
  const [securitiesActive, setSecuritiesActive] = useState(eventSecurityMeasuresIds)
  const [isChanged, setIsChanged] = useState(false)

  useEffect(() => {
    const array1 = eventSecurityMeasuresIds.slice()
    const array2 = securitiesActive.slice();

    array1.sort();
    array2.sort();

    const res = !(array1.length === array2.length && array1.every(function(v, i) { return v === array2[i] } ))

    setIsChanged(res)
  }, [securitiesActive]);

  const submitSecurityMeasures = async () => {
    const res = await handleSecurityMeasure({
      "securityMeasureIds": securitiesActive
    })
    if(res?.success){
      onClose()
      Toast.show({
        text1:`Medidas de Seguridad guardadas`,
        type:'success'
      });
      setTimeout(()=>{
        navigation.navigate('DASHBOARD', {id:eventId});
      },100)
    }

  }

  return (
    <MainLayout navigation={navigation} title={eventName}>
      <Layout style={styles?.bg} level='3'>
        <EventSecurityMeasuresList
          securitiesActive={securitiesActive}
          setSecuritiesActive={setSecuritiesActive}
          securityMeasures={securityMeasures}
          loadingSecurityMeasures={loadingSecurityMeasures}
          eventSecurityMeasuresIds={eventSecurityMeasuresIds}
        />
        {
          isChanged &&
          <FloatingActionButton
            onPress={onOpen}
            icon='checkmark-circle-2'
          />
        }
        <SeAlert
          isOpen={isOpen}
          onCancel={onClose}
          onConfirm={submitSecurityMeasures}
          loading={loading}
          confirmButtonText='Si,guarda los cambios'
          confirmButtonColor={theme['color-info-700']}
          title='Guardar Medidas de Seguridad'
          message='¿Esta usted seguro que su evento cumple con estas medida de seguridad?'
        />
      </Layout>
    </MainLayout>
  );
};

export const EventSecurityMeasures = withStyles(EventSecurityMeasuresScreen, (theme) => ({
  bg: {
    flex: 1,
    // backgroundColor: theme["color-basic-300"],
  },
  placeholder: {
    width: "100%",
    height: 200,
    backgroundColor: theme["color-basic-500"],
  },
}));
