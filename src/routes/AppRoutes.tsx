import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'

import { useUserStore } from '@/store/userStore'

import { LoginPage } from '@/pages/login'
import { RegisterPage } from '@/pages/register'
import { CreateOfferPage } from '@/pages/create-offer'
import { HomePage } from '@/pages/home'
import Layout from '../ui/Layout'
import { ExchangeOfferPage } from '@/pages/offer'
import { HelpPage } from '@/pages/help'
import { ProfilePage } from '@/pages/profile'

const AppRoutes = () => {
  const isAuthenticated = useUserStore(state => state.user !== null)

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
          <Route path='/help' element={<HelpPage />} />
          <Route
            path='/profile'
            element={
              !isAuthenticated ? <Navigate to='/login' /> : <ProfilePage />
            }
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
