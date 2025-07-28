import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import IndexPage from './Pages/IndexPage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import RegisterPage from './Pages/RegisterPage.jsx'
import Layout from './Layout.jsx'
import axios from 'axios'
import { UserContextProvider } from './userContext.jsx';
import MyAccomodationsPage from './Pages/MyAccomodationsPage.jsx';
import AccomodationFormPage from './Pages/AccomodationFormPage.jsx';
import MyBookingsPage from './Pages/MyBookingsPage.jsx';
import 'react-toastify/dist/ReactToastify.css';
import AccountCenter from './Pages/AccountCenter.jsx';
import MyGuestsPage from './Pages/MyGuestsPage.jsx';
import SinglePlacePage from './Pages/SinglePlacePage.jsx'


axios.defaults.baseURL = 'https://rentease-backend-5p7h.onrender.com';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route element={<Layout />}>
        
          <Route path="/" element={<Navigate to="/home" />} />
          <Route index path="/home" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account-center" element={<AccountCenter />} />
          <Route path="/home/:id" element={<SinglePlacePage />} />
          <Route path="/account/my-guests" element={<MyGuestsPage />} />
          <Route path="/account/my-bookings" element={<MyBookingsPage />} />
          <Route path="/account/my-accomodations" element={<MyAccomodationsPage />} />
          <Route path="/account/my-accomodations/new" element={<AccomodationFormPage />} />
          <Route path="/account/my-accomodations/:id" element={<AccomodationFormPage />} />

        </Route>

      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </UserContextProvider>
  )
}

export default App
