import { Link } from 'react-router'

export function LoginPage() {
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
        <form action='#' method='POST' className='space-y-6'>
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
              className='w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-primary-green'
            />
          </div>

          <div>
            {/* <button
              type='submit'
              className='w-full bg-primary-green text-white py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-green'
            >
              Entrar
            </button> */}
            <Link to={{ pathname: '/home' }}>
              <button
                type='submit'
                className='w-full bg-primary-green text-white py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-green'
              >
                Entrar
              </button>
            </Link>
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
          <div className='flex items-center justify-center'>
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
          </div>
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
