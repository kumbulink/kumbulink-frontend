import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'

import { useUserStore } from '@/shared/model'

import { Layout } from '@/shared/ui/devices'

import {
  CreateOfferPage,
  MyOffersPage,
  AcceptedOffersPage
} from '@/pages/offer'
import { LoginPage } from '@/pages/login'
import { RegisterPage } from '@/pages/register'
import { HomePage } from '@/pages/home'
import { HelpPage } from '@/pages/help'
import { BankListPage } from '@/pages/bank-list'
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
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create-offer' element={<CreateOfferPage />} />
          <Route path='/my-offers' element={<MyOffersPage />} />
          <Route path='/offer/:id' element={<ExchangeOfferPage />} />
          <Route path='/banks' element={<BankListPage />} />
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
