import React from "react";
import {Layout, withStyles, TabBar, Tab} from "@ui-kitten/components";
import {MainLayout} from "../../Layout/MainLayout";
import {useApiRequest} from "../../hooks/useApiRequest";
import {EVENTS_EVENTID_TASKS} from "../../lib/apiRoutes";
import {FloatingActionButton} from "../../Shared/FloatingActionButton";
import {useScreenFocused} from "../../hooks/useScreenFocused";
import {useHandleCUModal} from "../../hooks/useHandleCUModal";
import {TasksForm} from "./components/TasksForm";
import {TabView} from 'react-native-tab-view';
import {useTaskTabs} from "../../hooks/useTaskTabs";

const TasksScreen = ({route, navigation, eva}) => {
  const styles = eva?.style;
  const {eventId, eventName} = route?.params || {};
  const {data, call: getTasks, loading} = useApiRequest(EVENTS_EVENTID_TASKS(eventId))
  useScreenFocused(getTasks)

  const {isOpen, onOpen, onClose, itemToEdit: taskToEdit, setItemToEdit: setTaskToEdit} = useHandleCUModal()

  const {navigationState, setSelectedIndex, initialLayout, renderScene} = useTaskTabs({
    setTaskToEdit,
    navigation,
    getTasks,
    loading,
    tasks: data?.data?.tasks,
  })

  return (
    <MainLayout navigation={navigation} title={eventName} backButton>
      <Layout style={styles?.bg} level='3'>
        <TabView
          initialLayout={initialLayout}
          navigationState={navigationState}
          renderScene={renderScene}
          onIndexChange={setSelectedIndex}
          renderTabBar={() => <TabBar
            selectedIndex={navigationState?.index}
            onSelect={index => setSelectedIndex(index)}
            style={styles?.tabBar}
          >
            <Tab title='Pendientes'/>
            <Tab title='Completadas'/>
          </TabBar>
          }
        />
        <TasksForm
          isOpen={isOpen}
          onClose={onClose}
          eventId={eventId}
          getTasks={getTasks}
          taskToEdit={taskToEdit}
        />
        <FloatingActionButton
          onPress={onOpen}
        />
      </Layout>
    </MainLayout>
  );
};

export const Tasks = withStyles(TasksScreen, (theme) => ({
  bg: {
    flex: 1
    // backgroundColor: theme["color-basic-300"],
  },
  tabBar: {
    paddingVertical: 16
  },

}));
