import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import { LoginPage } from '@/pages-xpto/login'
import { RegisterPage } from '@/pages-xpto/tmp_xpto'
import { CreateOfferPage } from '@/pages-xpto/create-offer'
import { HomePage } from '@/pages-xpto/home'
import Layout from '../ui/Layout'
import { ExchangeOfferPage } from '@/pages-xpto/offer'

const isAuthenticated = localStorage.getItem('jwt_token')

const AppRoutes = () => {
  return (
    <Router basename='/'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/login'
            element={isAuthenticated ? <Navigate to='/' /> : <LoginPage />}
          />
          <Route path='/registrar' element={<RegisterPage />} />
          <Route path='/criar-anuncio' element={<CreateOfferPage />} />
          <Route path='/anuncio/:id' element={<ExchangeOfferPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
