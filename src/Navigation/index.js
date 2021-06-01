import React from 'react';
import {AuthProvider} from './AuthProvider';
import {Routes} from './Routes';

const Providers = ({user, isAppFirstLaunched}) => {
  return (
    <AuthProvider initialValue={user}>
      <Routes isAppFirstLaunched={isAppFirstLaunched}/>
    </AuthProvider>
  );
}

export default Providers;
