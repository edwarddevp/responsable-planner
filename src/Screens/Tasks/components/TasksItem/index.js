import React from 'react';
import {Pressable, View} from "react-native";
import {Layout, withStyles, Text, Radio} from "@ui-kitten/components";
import {CheckmarkCircleOutline, TrashOutline} from "../../../../Shared/icons";
import {useApiRequest} from "../../../../hooks/useApiRequest";
import {EVENTS_EVENTID_TASKS_ID} from "../../../../lib/apiRoutes";
import {useDisclosure} from "../../../../hooks/useDisclosure";
import {SeAlert} from "../../../../Shared/SeAlert";

const TasksItemComponent = ({item, eva, setTaskToEdit, getTasks}) => {
  const {style: styles, theme} = eva;
  const {call: handleTask, loading} = useApiRequest(EVENTS_EVENTID_TASKS_ID(item?.eventid, item?.id), {
    skip: true
  })
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {isOpen: isOpenCompleted, onOpen: onOpenCompleted, onClose: onCloseCompleted} = useDisclosure()

  const editGuest = () => setTaskToEdit(item);
  const deleteGuestConfirm = async () => {
    await handleTask(undefined, 'DELETE')
    onClose()
    getTasks()
  }

  const markCompleted = async () => {
    await handleTask({isCompleted: !item?.isCompleted}, 'PUT')
    isOpenCompleted && onCloseCompleted()
    getTasks()
  }

  return <Layout style={styles?.item}>
    <View style={styles?.leftSide}>
      <Pressable onPress={item?.isCompleted ? onOpenCompleted : null}>
        {({pressed}) => (
          <Layout level={pressed ? "2" : "1"} style={styles?.leftSideContentCompleteIcon}>
            <View style={styles?.rightBorder}>
              {
                item?.isCompleted ?
                  <View style={styles?.checkIcon}>
                    <CheckmarkCircleOutline
                      fill={theme['color-success-600']}
                      style={styles?.deleteIcon}
                    />
                  </View>
                  :
                  <Radio
                    style={styles?.setCompleteRadio}
                    onChange={markCompleted}
                    disabled={loading}
                  />
              }
            </View>
          </Layout>
        )}
      </Pressable>
      <Pressable onPress={editGuest} style={{flex: 1}}>
        {({pressed}) => (
          <Layout level={pressed ? "2" : "1"} style={styles?.leftSideContentInfo}>
            <Text style={styles?.textName}>{item?.title}</Text>
          </Layout>
        )}
      </Pressable>
    </View>

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
    <SeAlert
      isOpen={isOpenCompleted}
      onCancel={onCloseCompleted}
      onConfirm={markCompleted}
      loading={loading}
      confirmButtonText='Si, marcala pendiente'
      confirmButtonColor={theme['color-info-700']}
      title='Marcar Pendiente'
      message='Quieres Marcar esta tarea como pendiente?'
    />
  </Layout>
}

export const TasksItem = withStyles(TasksItemComponent, (theme) => ({
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
    paddingHorizontal: 16
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

