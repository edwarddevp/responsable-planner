import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './AuthProvider';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export const Routes = ({isAppFirstLaunched}) => {
  const {user} = useContext(AuthContext);

  return (
    <NavigationContainer>
      {
        user?.id ?
          <AppStack/> :
          <AuthStack
            isAppFirstLaunched={isAppFirstLaunched}
          />
      }
    </NavigationContainer>
  );
};


