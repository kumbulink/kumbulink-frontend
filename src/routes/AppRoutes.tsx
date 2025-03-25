import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import { LoginPage } from '../pages/login'
import { RegisterPage } from '../pages/register'
import { CreateOfferPage } from '../pages/create-offer'
import { HomePage } from '../pages/home'
import Layout from '../ui/Layout'
import { ExchangeOfferPage } from '@/pages/offer'

const isAuthenticated = true

const AppRoutes = () => {
  return (
    <Router basename='/Kumbulink'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route
            path='/'
            element={isAuthenticated ? <HomePage /> : <Navigate to='/login' />}
          />
          <Route path='/home' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registrar' element={<RegisterPage />} />
          <Route path='/criar-anuncio' element={<CreateOfferPage />} />
          <Route path='/anuncio/:id' element={<ExchangeOfferPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
