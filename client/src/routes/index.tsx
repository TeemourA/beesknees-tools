import { Navigate, RouteObject } from 'react-router';
import { Link } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';

const routes = (token: string | null): RouteObject[] => [
  {
    path: '/',
    element: token ? (
      <nav>
        <li>
          <Link to="/my/cards">Cards</Link>
        </li>
      </nav>
    ) : (
      <Navigate to="/login" />
    ),
    children: [
      {
        path: '/my/cards',
        element: (
          <ul>
            <li>cards 1</li>
            <li>cards 2</li>
            <li>cards 3</li>
          </ul>
        ),
      },
    ],
  },
  { path: '/login', element: token ? <Navigate to="/" /> : <LoginPage /> },
  // {
  //   path: '/my/cards',
  //   element: (
  //     <ul>
  //       <li>cards 1</li>
  //       <li>cards 2</li>
  //       <li>cards 3</li>
  //     </ul>
  //   ),
  // },
];

export default routes;
