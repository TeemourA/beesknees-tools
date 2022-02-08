import React from 'react';
import { useRoutes } from 'react-router-dom';
import { useAppSelector } from './redux/typedRedux';

import routes from './routes';

const App: React.FC = () => {
  const { token } = useAppSelector((state) => state.session);

  const appRoutes = useRoutes(routes(token));

  return <>{appRoutes}</>;
};

export default App;
