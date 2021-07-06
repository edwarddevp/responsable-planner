import React from 'react';
import {MenuItem, Text, withStyles} from "@ui-kitten/components";
import {View} from "react-native";
import {SeAlert} from "../../../../Shared/SeAlert";
import {useDisclosure} from "../../../../hooks/useDisclosure";

const UserSettingsMenuComponent = ({eva, setSelectedIndex, navigation, logout}) => {
  const {style:styles, theme} = eva
  const alertLogOut = useDisclosure()

  return <View>
    <MenuItem
      style={styles?.menuItem}
      title={()=><Text style={styles?.menuItemTitle}>Editar</Text>}
      onPress={() => setSelectedIndex(1)}
    />
    <MenuItem
      style={styles?.menuItem}
      title={()=><Text style={styles?.menuItemTitle}>Ver Introduccion de la app</Text>}
      onPress={() => navigation.navigate("ONBOARDING_REPEAT")}
    />
    <MenuItem
      style={styles?.menuItem}
      title={()=><Text style={styles?.menuItemTitle} status='danger'>Cerrar Sesión</Text>}
      onPress={alertLogOut?.onOpen}
    />
    <SeAlert
      isOpen={alertLogOut?.isOpen}
      onCancel={alertLogOut?.onClose}
      onConfirm={logout}
      loading={alertLogOut?.loading}
      confirmButtonText='Si, quiero cerrar sesión'
      confirmButtonColor={theme['color-info-700']}
      title='Cerrar Sesión'
      message='¿Esta usted seguro que quiere cerrar sesión?, tendra que introducir sus datos nuevamente'
    />
  </View>
}

export const UserSettingsMenu = withStyles(UserSettingsMenuComponent, (theme) => ({
  menuItem:{
    paddingVertical:16,
    paddingHorizontal:24,
    borderBottomWidth:1
  },
  menuItemTitle:{
    fontSize:16
  }
}));