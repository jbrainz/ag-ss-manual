import React from 'react';
import {AuthProvider} from './Auth/AuthProvider';
import LoadAssets from './components/LoadAssets';
import Routes from './components/Routes';

const Providers = () => {
  return (
    <AuthProvider>
      <LoadAssets>
        <Routes />
      </LoadAssets>
    </AuthProvider>
  );
};

export default Providers;
