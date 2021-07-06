import React from 'react';
import AwesomeAlert from "react-native-awesome-alerts";
import {Spinner, Text, withStyles} from "@ui-kitten/components";
import {View} from "react-native";
import {SeSeparator} from "../Separator";

const SeAlertComponent = ({eva, isOpen, onCancel, onConfirm, message, title, confirmButtonText, confirmButtonColor, loading}) => {
  const {style:styles,theme} = eva
  return <AwesomeAlert
    show={isOpen}
    showProgress={false}
    title={loading? null : title || "Eliminar"}
    message={loading? null : message || 'Estas seguro quieres eliminar este elemento? no podras deshacer esta acción'}
    titleStyle={styles?.textColor}
    messageStyle={{...styles?.textColor,...styles?.textCenter}}
    overlayStyle={styles?.backdrop}
    contentContainerStyle={styles?.content}
    closeOnTouchOutside={true}
    closeOnHardwareBackPress={false}
    showCancelButton={!loading}
    showConfirmButton={!loading}
    cancelButtonColor={theme['color-basic-600']}
    cancelText="No, vuelve atras"
    customView={loading ? <View style={styles?.loading}>
      <Spinner size='giant' status='control'/>
      <SeSeparator value={2} />
      <Text>Cargando...</Text>
    </View> : null}
    confirmText={confirmButtonText || "Si, eliminalo"}
    confirmButtonColor={confirmButtonColor || "#DD6B55"}
    onCancelPressed={onCancel}
    onConfirmPressed={onConfirm}
    onDismiss={onCancel}
  />
}
export const SeAlert = withStyles(SeAlertComponent, (theme) => ({
  textCenter: {
    textAlign: 'center'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor:theme['color-basic-800'],
  },
  textColor: {
    color:'white'
  },
  loading:{
    alignItems:'center'
  }
}));
