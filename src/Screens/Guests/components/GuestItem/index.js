import React from 'react';
import {Pressable, View} from "react-native";
import {Layout, withStyles, Text} from "@ui-kitten/components";
import {PersonIcon, TrashOutline} from "../../../../Shared/icons";
import {SeSeparator} from "../../../../Shared/Separator";
import {useApiRequest} from "../../../../hooks/useApiRequest";
import {EVENTS_EVENTID_GUESTS_ID} from "../../../../lib/apiRoutes";
import {useDisclosure} from "../../../../hooks/useDisclosure";
import {SeAlert} from "../../../../Shared/SeAlert";

const GuestItemComponent = ({item, eva, setGuestToEdit, getGuests}) => {
  const {style: styles, theme} = eva;
  const {call: deleteGuest, loading} = useApiRequest(EVENTS_EVENTID_GUESTS_ID(item?.eventid, item?.id), {
    method: 'DELETE',
    skip: true
  })
  const {isOpen, onOpen, onClose} = useDisclosure()

  const editGuest = () => setGuestToEdit(item);
  const deleteGuestConfirm = async () => {
    await deleteGuest()
    getGuests()
    onClose()
  }

  return <Layout style={styles?.item}>
    <Pressable onPress={editGuest} style={styles?.leftSide}>
      {({pressed}) => (
        <Layout level={pressed ? "2" : "1"} style={styles?.leftSideContent}>
          <PersonIcon fill={theme['color-primary-500']} style={styles?.userIcon}/>
          <SeSeparator d='H'/>
          <View>
            <Text style={styles?.textName}>{item?.name}</Text>
            <Text style={styles?.textEmail}>{item?.email}</Text>
            {item?.phone && <Text style={styles?.textPhone}>{item?.phone}</Text>}
          </View>
        </Layout>
      )}
    </Pressable>
    <Pressable onPress={onOpen} style={styles?.rightSide}>
      {({pressed}) => (
        <Layout level={pressed ? "2" : "1"} style={styles?.rightSideContent}>
          <View style={styles?.leftBorder}>
            <TrashOutline fill={theme['color-danger-600']} style={styles?.deleteIcon}/>
          </View>
        </Layout>
      )}
    </Pressable>
    <SeAlert
      isOpen={isOpen}
      onCancel={onClose}
      onConfirm={deleteGuestConfirm}
      loading={loading}
    />
  </Layout>
}

export const GuestItem = withStyles(GuestItemComponent, (theme) => ({
  item: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
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
  },
  rightSide: {
    flex: 1,
  },
  leftSideContent: {
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
  userIcon: {
    width: 48,
    height: 48,
  },
  deleteIcon: {
    width: 36,
    height: 36,
  },
  textName: {
    fontSize: 18
  },
  textEmail: {
    fontSize: 12,
    color: theme['color-basic-600']
  },
  textPhone: {
    fontSize: 12,
    color: theme['color-basic-600']
  }
}));

