import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import MenuPage from './pages/MenuPage/MenuPage.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import CompanyPage from './pages/CompanyPage/CompanyPage.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'menu', element: <MenuPage /> },
      { path: 'login', element : <LoginPage/>},
      { path: 'company', element: <CompanyPage />}
    ],
  },
])
