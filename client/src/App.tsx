import React, { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import { useAppDispatch, useAppSelector } from './redux/typedRedux';
import { terminateSessionRequest } from './features/session/session.slice';
import SaveNewCardSet from './components/SaveNewCardSet';
import { fetchCardSetsRequest } from './features/cardSets/cardSets.slice';

const App: React.FC = () => {
  const { token } = useAppSelector((state) => state.session);
  const { cardSets } = useAppSelector((state) => state.cardSets);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(terminateSessionRequest());
  };

  useEffect(() => {
    if (token) dispatch(fetchCardSetsRequest());
  }, [token]);

  return (
    <div className="App">
      {!token ? (
        <LoginPage />
      ) : (
        <>
          <div>
            You are logged in<button onClick={handleLogout}>log out</button>
          </div>
          <SaveNewCardSet />
          {!cardSets.length ? (
            <p>no card sets</p>
          ) : (
            <ul>
              {cardSets.map((set) => (
                <li>
                  <p>{set.title}</p>
                  <p>{set.url}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default App;
