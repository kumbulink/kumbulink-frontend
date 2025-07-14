import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

import { useUserStore } from '@/shared/model/providers/userStore'

import { http } from '@/shared/lib'

interface LoginResponse {
  id: number
  user_email: string
  user_nicename: string
  user_display_name: string
  document_id: string
  document_type: string
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
  const [showPassword, setShowPassword] = useState<boolean>(false)
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
        '/jwt-auth/v1/token',
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
        id: data.id,
        email: data.user_email,
        nicename: data.user_nicename,
        displayName: data.user_display_name,
        documentId: data.document_id,
        documentType: data.document_type
      })

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

          <div className='relative'>
            <label htmlFor='password' className='sr-only'>
              Senha
            </label>
            <input
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Senha'
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-primary-green'
            />
            <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-4 top-1/2 -translate-y-1/2'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              className='text-gray-400'
            >
              {showPassword ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 3l18 18M10.5 10.677a2 2 0 002.823 2.823M7.362 7.561C5.68 8.74 4.279 10.42 3 12c1.889 2.991 5.282 6 9 6 1.55 0 3.043-.523 4.395-1.35M12 6c4.008 0 6.701 3.158 9 6-1.007 1.797-2.956 3.992-4.5 5.5'
                />
              ) : (
                <>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                  />
                </>
              )}
            </svg>
          </button>
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
          <Link to={{ pathname: '/register' }} className='text-primary-orange'>
            Crie aqui.
          </Link>
        </p>
      </section>
    </main>
  )
}
