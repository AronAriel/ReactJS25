import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage/HomePage';
import MenuPage from './pages/MenuPage/MenuPage';
import LoginPage from './pages/LoginPage/LoginPage';
import CompanyPage from './pages/CompanyPage/CompanyPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'menu', element: <MenuPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'company', element: <CompanyPage /> },
    ],
  },
]);
