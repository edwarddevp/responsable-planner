import React from "react";
import {Layout, withStyles} from "@ui-kitten/components";
import {MainLayout} from "../../Layout/MainLayout";
import {EventSecurityMeasuresList} from "./components/EventSecurityMeasuresList";
import {FloatingActionButton} from "../../Shared/FloatingActionButton";
import {SeAlert} from "../../Shared/SeAlert";
import {useSecurityMeasures} from "../../hooks/useSecurityMeasures";

const EventSecurityMeasuresScreen = ({navigation, eva, route}) => {
  const {style:styles, theme} = eva;
  const { eventName, onSubmit, eventList, alert} = useSecurityMeasures(navigation, route?.params || {})

  return (
    <MainLayout navigation={navigation} title={eventName} backButton>
      <Layout style={styles?.bg} level='3'>
        <EventSecurityMeasuresList {...eventList} />
        {
          alert?.isChanged &&
          <FloatingActionButton
            onPress={alert?.onOpen}
            icon='checkmark-circle-2'
          />
        }
        <SeAlert
          isOpen={alert?.isOpen}
          onCancel={alert?.onClose}
          onConfirm={onSubmit}
          loading={alert?.loading}
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
