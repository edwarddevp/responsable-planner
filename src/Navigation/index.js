import React from 'react';
import {AuthProvider} from './AuthProvider';
import {Routes} from './Routes';

const Providers = ({user, isAppFirstLaunched, setIsAppFirstLaunched}) => {
  return (
    <AuthProvider initialValue={user}>
      <Routes isAppFirstLaunched={isAppFirstLaunched} setIsAppFirstLaunched={setIsAppFirstLaunched}/>
    </AuthProvider>
  );
}

export default Providers;
