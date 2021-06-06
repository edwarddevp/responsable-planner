import React from 'react';
import {useWindowDimensions} from "react-native";
import {SceneMap} from "react-native-tab-view";
import {TasksList} from "../Screens/Tasks/components/TasksList";

export const useTaskTabs = ({tasks,...rest}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const layout = useWindowDimensions();
  const [routes] = React.useState([
    { key: '1', title: 'Pendientes' },
    { key: '2', title: 'Completadas' },
  ]);

  const renderScene = SceneMap({
    '1': ()=>
      <TasksList
        title='Tareas Pendientes'
        data={tasks?.filter(task=>!task?.isCompleted)}
        {...rest}
      />,
    '2': ()=>
      <TasksList
        title='Tareas Completadas'
        data={tasks?.filter(task=>task?.isCompleted)}
        {...rest}
      />,
  })

  return {
    navigationState:{index:selectedIndex, routes: routes},
    setSelectedIndex,
    initialLayout:{ width: layout.width },
    routes,
    renderScene,
  }
};
