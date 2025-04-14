import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

import { useUserStore } from '@/store/userStore'

import http from '@/shared/utils/http.ts'

interface LoginResponse {
  token: string
  user_email: string
  user_nicename: string
  user_display_name: string
}

interface WordPressError {
  code: string
  message: string
  data: {
    status: number
  }
}

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const setUser = useUserStore(state => state.setUser)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const { data } = await http.post<LoginResponse>(
        'https://api.kumbulink.com/wp-json/jwt-auth/v1/token',
        {
          username: email,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      setUser({
        token: data.token,
        email: data.user_email,
        nicename: data.user_nicename,
        displayName: data.user_display_name
      })

      localStorage.setItem('jwt_token', data.token)
      void navigate('/')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const wpError = error.response.data as WordPressError
        setError(wpError.message)
      } else {
        setError('Ocorreu um erro ao tentar fazer login. Tente novamente.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className='flex flex-col items-center justify-center bg-white min-h-screen'>
      <section className='w-full max-w-lg space-y-4 px-4'>
        <figure className='flex justify-center mb-6'>
          <img
            src='kumbulink.svg'
            alt='Logo Kumbulink'
            className='w-48 h-48 mb-6'
          />
        </figure>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='email' className='sr-only'>
              E-mail
            </label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='E-mail'
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-primary-green'
            />
          </div>

          <div>
            <label htmlFor='password' className='sr-only'>
              Senha
            </label>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='Senha'
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-primary-green'
            />
          </div>

          {error && (
            <div className='text-red-500 text-sm text-center'>{error}</div>
          )}

          <div>
            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-primary-green text-white py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-green disabled:opacity-50'
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>

          <div className='text-center'>
            <Link
              to={{ pathname: '/reset-password' }}
              className='text-primary-orange'
            >
              Esqueci a senha
            </Link>
          </div>

          {/* Login com Google */}
          {/* <div className='flex items-center justify-center'>
            <button
              type='button'
              className='w-full flex items-center justify-center border border-gray-300 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-green'
              aria-label='Entrar com Google'
            >
              <img
                src='https://developers.google.com/identity/images/g-logo.png'
                alt='Logo do Google'
                className='w-5 h-5 mr-2'
              />
              Entrar com Google
            </button>
          </div> */}
        </form>

        {/* Link para criar conta */}
        <p className='text-center text-gray-700'>
          Não possui uma conta?{' '}
          <Link to={{ pathname: '/registrar' }} className='text-primary-orange'>
            Crie aqui.
          </Link>
        </p>
      </section>
    </main>
  )
}
