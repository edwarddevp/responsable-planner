import React from 'react';
import {MenuItem, Text, withStyles} from "@ui-kitten/components";
import {View} from "react-native";
import {SeAlert} from "../../../../Shared/SeAlert";
import {useDisclosure} from "../../../../hooks/useDisclosure";
import {useApiRequest} from "../../../../hooks/useApiRequest";
import {CATEGORIES, EVENTS_ID} from "../../../../lib/apiRoutes";

const EditEventMenuComponent = ({eva,eventId, setSelectedIndex, navigation}) => {
  const styles = eva?.style
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {data} = useApiRequest(CATEGORIES)
  const {call: deleteEvent, loading} = useApiRequest(EVENTS_ID(eventId), {
    method: 'DELETE',
    skip: true
  })

  const deleteEventConfirm = async () => {
    await deleteEvent()
    onClose()
    navigation.navigate('HOME')
  }

  return <View>
    <MenuItem
      style={styles?.menuItem}
      title={()=><Text style={styles?.menuItemTitle}>Editar</Text>}
      onPress={() => setSelectedIndex(1)}
    />
    <MenuItem
      style={styles?.menuItem}
      title={()=><Text style={styles?.menuItemTitle} status='danger'>Eliminar Evento</Text>}
      onPress={onOpen}
    />
    <SeAlert
      isOpen={isOpen}
      onCancel={onClose}
      onConfirm={deleteEventConfirm}
      loading={loading}
    />
  </View>
}

export const EditEventMenu = withStyles(EditEventMenuComponent, (theme) => ({
  menuItem:{
    paddingVertical:16,
    paddingHorizontal:24,
    borderBottomWidth:1
  },
  menuItemTitle:{
    fontSize:16
  }
}));