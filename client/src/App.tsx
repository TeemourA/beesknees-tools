import React, { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  // useEffect(() => {
  //   fetch('http://localhost:3000/sets')
  //     .then((data) => data.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err.message));
  // }, []);

  return (
    <div className="App">
      <LoginPage />
    </div>
  );
};

export default App;
