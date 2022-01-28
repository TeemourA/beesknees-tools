import React, { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import { useAppDispatch, useAppSelector } from './redux/typedRedux';
import { terminateSessionRequest } from './features/session/session.slice';

const App: React.FC = () => {
  const { token } = useAppSelector((state) => state.session);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(terminateSessionRequest());
  };

  return (
    <div className="App">
      {!token ? (
        <LoginPage />
      ) : (
        <div>
          You are logged in<button onClick={handleLogout}>log out</button>
        </div>
      )}
    </div>
  );
};

export default App;
