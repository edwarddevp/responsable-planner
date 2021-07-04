import React, {useContext} from 'react';
import {format} from "date-fns";
import {MenuItem, OverflowMenu, Text, TopNavigationAction, withStyles} from "@ui-kitten/components";
import {InfoIcon, LogoutIcon, MenuIcon, SettingsOutline, ShareOutline} from "../../../../Shared/icons";
import {AuthContext} from "../../../../Navigation/AuthProvider";
import {SeSeparator} from "../../../../Shared/Separator";
import {SeImageWithCaption} from "../../../../Shared/SeImageWithCaption";
import {ScrollView, View, Share} from "react-native";
import {FooterButtons} from "../../../../Screens/CreateEvent/components/FooterButtons";
import {SeModal} from "../../../../Shared/SeModal";
import {useDisclosure} from "../../../../hooks/useDisclosure";
import {SeAlert} from "../../../../Shared/SeAlert";

const MenuNavbarComponent = ({eva, event, navigation}) => {
  const {style: styles, theme} = eva
  const [menuVisible, setMenuVisible] = React.useState(false);
  const {logout} = useContext(AuthContext);
  const aboutModal = useDisclosure()
  const alertLogOut = useDisclosure()

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  );

  const onShare = async () => {
    try {
      const startDate = new Date(event?.startdate)
      const endDate = new Date(event?.enddate)
      const result = await Share.share({
        message: `
Usted a sido formalmente invitado a asistir al evento "${event?.name}".\n
${event?.description ? event?.description + '.\n' : ''}
El evento se realizara el dia ${format(startDate, 'MM/dd/yyyy')} a las ${format(startDate, 'p')} hasta el dia ${format(endDate, 'MM/dd/yyyy')} a las ${format(endDate, 'p')}.\n
${event?.direction ? "El evento tendra lugar en: "+event?.direction + '.\n' : ''}
Este evento es considerado ${event?.securityCategory} para asistir.\n
Lo estaremos esperando a nuestro ${event?.categoyName}, gracias`
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return <>
    {event ? <TopNavigationAction icon={ShareOutline} onPress={onShare}/> : <></>}
    <OverflowMenu
      anchor={renderMenuAction}
      visible={menuVisible}
      onBackdropPress={toggleMenu}
    >
      <MenuItem accessoryLeft={InfoIcon} title='Nosotros' onPress={aboutModal?.onOpen}/>
      <MenuItem accessoryLeft={SettingsOutline} title='Opciones' onPress={()=>navigation.navigate('USER_SETTINGS')}/>
      {/*<MenuItem accessoryLeft={LogoutIcon} title='Salir' onPress={alertLogOut?.onOpen}/>*/}
    </OverflowMenu>

    <SeModal isOpen={aboutModal?.isOpen} onClose={aboutModal?.onClose}>
      <Text style={styles?.title}>
        Sobre Nosotros
      </Text>
      <SeSeparator value={2}/>
      <ScrollView>
        <SeImageWithCaption
          containerStyles={styles?.center}
          style={styles.tinyLogo}
          source={require('../../../../../assets/icon.png')}
          caption="Safe Event Planner - 2021"
        />
        <SeSeparator value={2}/>
        <View style={{flex: 2}}>
          <Text style={styles?.description}>
            {"  " + 'Safe Event Planner es una aplicación que busca ayudarte a administrar tus eventos y mantenerlos seguro de infecciones'}
          </Text>
          <SeSeparator/>
          <Text style={styles?.description}>
            {"  " + 'Para ello te brindamos herramientas como el creador de eventos y el puntaje de seguridad, para que puedas observar en todo momento que tan seguro es tu evento'}
          </Text>
          <SeSeparator/>
          <Text style={styles?.description}>
            {"  " + 'Para que te puedas proteger a ti y a tus seres queridos'}
          </Text>
        </View>
      </ScrollView>
      <SeSeparator value={2}/>
      <FooterButtons
        style={styles?.containerButtons}
        leftAction={aboutModal?.onClose}
        size='xs'
        submitButton={false}
      />
    </SeModal>

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
  </>
};

export const MenuNavbar = withStyles(MenuNavbarComponent, (theme) => ({
  tinyLogo: {
    width: 120,
    height: 120,
  },
  center: {
    alignItems: 'center'
  },
  description: {
    fontSize: 14,
    textAlign: 'justify'
  },
}));