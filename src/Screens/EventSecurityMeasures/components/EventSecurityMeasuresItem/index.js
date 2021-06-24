import React, {useEffect, useState} from 'react';
import {Pressable, View} from "react-native";
import {Layout, withStyles, Text, Radio} from "@ui-kitten/components";
import {format} from 'date-fns'
import {DarkerImageBackground} from "../../../../Shared/DarkerImageBackground";
import {CheckmarkCircleOutline, ForwardIcon, TrashOutline} from "../../../../Shared/icons";
import {SeAlert} from "../../../../Shared/SeAlert";
import {useApiRequest} from "../../../../hooks/useApiRequest";
import {EVENTS_EVENTID_SECURITYMEASURES_ID, EVENTS_EVENTID_TASKS_ID} from "../../../../lib/apiRoutes";
import {useDisclosure} from "../../../../hooks/useDisclosure";
import {EventSecurityMeasuresItemModal} from "../EventSecurityMeasuresModal";

const EventSecurityMeasuresItemComponent = ({item, eva, eventSecurityMeasures = [], eventId}) => {
  const {style: styles, theme} = eva;
  const {call: handleSecurityMeasure, loading} = useApiRequest(EVENTS_EVENTID_SECURITYMEASURES_ID(eventId, item?.id), {
    skip: true
  })
  const [isActive,setIsActive] = useState(eventSecurityMeasures.includes(eventSecurityMeasure => eventSecurityMeasure.id === item.id))

  useEffect(()=>{
    if (eventSecurityMeasures && eventSecurityMeasures.length) {
      setIsActive(
        Boolean(
          eventSecurityMeasures.filter(eventSecurityMeasure => eventSecurityMeasure.id === item.id)[0]
        )
      )
    }
  },[eventSecurityMeasures])

  const {isOpen, onOpen, onClose} = useDisclosure()

  const {isOpen: isOpenConfirmAlert, onOpen:onOpenConfirmAlert, onClose:onCloseConfirmAlert} = useDisclosure()

  const toggleEventSecurityMeasure = async () => {
    const res = await handleSecurityMeasure()
    if (res?.success) {
      setIsActive(res?.data?.securityMeasure)
      onCloseConfirmAlert()
    }
  }

  return <Layout style={styles?.item}>
    <View style={styles?.leftSide}>
      <Pressable onPress={isActive ? toggleEventSecurityMeasure : null}>
        {({pressed}) => (
          <Layout level={pressed ? "2" : "1"} style={styles?.leftSideContentCompleteIcon}>
            <View style={styles?.rightBorder}>
              {
                isActive?
                  <View style={styles?.checkIcon}>
                    <CheckmarkCircleOutline
                      fill={theme['color-success-600']}
                      style={styles?.deleteIcon}
                    />
                  </View> :
                  <Radio
                    style={styles?.setCompleteRadio}
                    onChange={onOpenConfirmAlert}
                    disabled={loading}
                  />
              }
            </View>
          </Layout>
        )}
      </Pressable>
      <Pressable onPress={onOpen} style={{flex: 1}}>
        {({pressed}) => (
          <Layout level={pressed ? "2" : "1"} style={styles?.leftSideContentInfo}>
            <Text style={styles?.textName}>{item?.name}</Text>
          </Layout>
        )}
      </Pressable>
    </View>
    <EventSecurityMeasuresItemModal
      isOpen={isOpen}
      onClose={onClose}
      securityMeasure={item}
    />
    <SeAlert
      isOpen={isOpenConfirmAlert}
      onCancel={onCloseConfirmAlert}
      onConfirm={toggleEventSecurityMeasure}
      loading={loading}
      confirmButtonText='Si, marcala activada'
      confirmButtonColor={theme['color-info-700']}
      title={item?.name}
      message='¿Esta usted seguro que su evento cumple con esta medida de seguridad?'
    />
  </Layout>
}

export const EventSecurityMeasuresItem = withStyles(EventSecurityMeasuresItemComponent, (theme) => ({
  item: {
    flexDirection: 'row',
    minHeight: 70,
    borderRadius: 8,
    marginHorizontal: 24,
    marginVertical: 6,
    overflow: 'hidden',
    shadowColor: theme["color-basic-transparent-500"],
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftSide: {
    flex: 5,
    flexDirection: 'row',
  },
  rightSide: {
    flex: 1,
  },
  leftSideContentCompleteIcon: {
    flex: 1,
    paddingVertical: 8,
  },
  setCompleteRadio: {
    paddingHorizontal: 18
  },
  checkIcon: {
    paddingHorizontal: 10
  },
  leftSideContentInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  rightSideContent: {
    flex: 1,
    paddingVertical: 8
  },
  leftBorder: {
    flex: 1,
    borderLeftWidth: 2,
    borderColor: theme['color-basic-900'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightBorder: {
    flex: 1,
    borderRightWidth: 2,
    borderColor: theme['color-basic-900'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    width: 48,
    height: 48,
  },
  deleteIcon: {
    width: 36,
    height: 36,
  },
  textName: {
    fontSize: 16
  }
}));

