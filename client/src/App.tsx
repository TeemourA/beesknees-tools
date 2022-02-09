import React, { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import { useAppDispatch, useAppSelector } from './redux/typedRedux';
import { terminateSessionRequest } from './features/session/session.slice';
import SaveNewCardSet from './components/SaveNewCardSet';
import { fetchCardSetsRequest } from './features/cardSets/cardSets.slice';
import { CardSet } from './features/cardSets/cardSets.types';

const App: React.FC = () => {
  const [selectedCardSets, setSelectedCardSets] = useState<CardSet[]>([]);
  const [message, setMessage] = useState<string>('');

  const { token } = useAppSelector((state) => state.session);
  const { cardSets } = useAppSelector((state) => state.cardSets);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(terminateSessionRequest());
  };

  const handleCardSetSelect = (cardSet: CardSet) => {
    setSelectedCardSets((prevSelectedCardSets) => {
      if (!prevSelectedCardSets.includes(cardSet))
        return [...prevSelectedCardSets, cardSet];

      return [
        ...prevSelectedCardSets.filter(
          (currentCardSet) => currentCardSet !== cardSet
        ),
      ];
    });
  };

  const handleSelectAllCardSets = () =>
    cardSets.forEach((set) => handleCardSetSelect(set));

  useEffect(() => {
    setMessage(
      `${selectedCardSets
        .map((selectedSet) => `${selectedSet.title}\n${selectedSet.url}\n\n`)
        .join('')}`
    );
  }, [selectedCardSets]);

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
          <div style={{ marginTop: '30px' }}>
            <SaveNewCardSet />
          </div>
          {!cardSets.length ? (
            <p>no card sets</p>
          ) : (
            <ul style={{ marginTop: '30px' }}>
              <button onClick={() => handleSelectAllCardSets()}>
                Select all
              </button>
              {cardSets.map((set) => (
                <li
                  style={{ listStyle: 'none', marginTop: '15px' }}
                  key={set.__id}
                >
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCardSetSelect(set)}
                      checked={selectedCardSets.includes(set)}
                    />
                    <a href={set.url} rel="noreferrer" target="_blank">
                      {set.title}
                    </a>
                  </label>
                </li>
              ))}
            </ul>
          )}
          {!selectedCardSets.length ? (
            <p>no selected card sets</p>
          ) : (
            <>
              <textarea cols={40} rows={10} value={message} />
              <button
                onClick={() => navigator.clipboard.writeText(message.trim())}
              >
                Copy to clipboard
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
