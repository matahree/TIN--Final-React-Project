import React, { useState} from 'react';
import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import MainContent from './components/other/MainContent';
import Footer from './components/fragments/Footer';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import CustomerList from './components/views/customer/CustomerList'
import CarList from './components/views/car/CarList'
import RentList from './components/views/rent/RentList'

import CustomerDetails from './components/views/customer/CustomerDetails'
import CarDetails from './components/views/car/CarDetails'
import RentDetails from './components/views/rent/RentDetails'

import CustomerForm from './components/views/customer/CustomerForm'
import CarForm from './components/views/car/CarForm'
import RentForm from './components/views/rent/RentForm'


import LoginForm from "./components/other/LoginForm";


import ProtectedRoute from "./components/other/ProtectedRoute";

import CustomerAccessDenied from "./components/views/customer/CustomerAccessDenied";



function App() {
  const [user, setUser] = useState()

  const handleLogin = (user) => {
    localStorage.setItem('user', user)
    setUser(user)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(undefined)
  }


  return (
      <>
      <BrowserRouter>

          <Header />
          <Navigation handleLogout={handleLogout} />
          <Routes>

            <Route path="/" element={<MainContent />} />

            <Route path="cars">
              <Route index={true} element={<CarList />} />

              <Route path="details/:carId" element={<CarDetails />} />
              <Route path="add" element={<CarForm />} />
              <Route path="edit/:carId" element={<CarForm />} />
            </Route>

            <Route path="rents">
              <Route index={true} element={<RentList />} />

              <Route path="details/:rentId" element={<RentDetails />} />
              <Route path="add" element={<RentForm />} />
              <Route path="edit/:rentId" element={<RentForm />} />
            </Route>

            <Route path="customers">
              <Route index={true} element={<CustomerList />} />

              <Route path="details/:customerId" element={<CustomerDetails />} />
              <Route path="add" element={<ProtectedRoute><CustomerForm /></ProtectedRoute>} />
              <Route path="edit/:customerId" element={<CustomerForm />} />
            </Route>


            <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
            <Route path="/noAccess" element={<CustomerAccessDenied />} />
        </Routes>
        <Footer />

    </BrowserRouter>
      </>
  );
}

export default App;