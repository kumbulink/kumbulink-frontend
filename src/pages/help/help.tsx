import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Collapse, SearchIcon } from '@/shared/ui'

export const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const faqItems = [
    {
      title: 'Como funciona a plataforma?',
      content: `
        A KumbuLink revoluciona o mercado de câmbio ao conectar diretamente pessoas que desejam transferir dinheiro para diferentes países. Em vez de depender de bancos e taxas elevadas, você faz um match financeiro, encontrando alguém com a necessidade oposta à sua.

        Por exemplo, se você deseja enviar Kwanza de Angola para Portugal ou Brasil, a plataforma encontra alguém que precisa enviar euros ou reais para Angola. Assim, ambos realizam a transação diretamente, com segurança e sem complicação.
      `
    },
    {
      title: 'Como posso me cadastrar e começar a usar a plataforma?',
      content:
        'Para começar, faça seu cadastro fornecendo seus dados pessoais e documentos necessários. Após a verificação, você poderá criar ou aceitar anúncios.'
    },
    {
      title: 'Quais são as taxas e custos envolvidos?',
      content:
        'A Kumbulink cobra uma taxa de 3% sobre o valor da transação, calculada automaticamente e mostrada antes da confirmação.'
    },
    {
      title: 'Como é garantida a segurança das transações?',
      content:
        'Utilizamos tecnologia de ponta para proteger seus dados e transações. Todos os usuários são verificados e as transações são monitoradas.'
    },
    {
      title: 'Em quais países a plataforma está disponível?',
      content:
        'Atualmente operamos em Angola, Brasil e Portugal, permitindo transferências entre estes países.'
    },
    {
      title: 'Como faço para enviar e receber dinheiro?',
      content:
        'Você pode criar um anúncio ou aceitar um existente. Após o match, siga as instruções para completar a transferência de forma segura.'
    },
    {
      title: 'Quais são os métodos de envio e recebimento aceitos?',
      content:
        'Aceitamos transferências bancárias através dos principais bancos de Angola, Brasil e Portugal.'
    },
    {
      title:
        'O que acontece se a outra parte não cumprir sua parte da transação?',
      content:
        'Nossa equipe de suporte está disponível para mediar e resolver quaisquer problemas que possam surgir durante a transação.'
    },
    {
      title: 'A plataforma é regulamentada?',
      content:
        'Sim, operamos de acordo com as regulamentações financeiras dos países onde atuamos.'
    },
    {
      title: 'Qual contato em caso de dúvidas ou sugestões?',
      content:
        'Qualquer dúvida, sugestão ou reclamação, entre em contato pelos canais: contato@kumbulink.com ou  +55 11 959163266'
    }
  ]

  const filteredFaqItems = useMemo(() => {
    if (searchQuery.length < 3) return faqItems

    const normalizedQuery = searchQuery.toLowerCase().trim()

    return faqItems.filter(
      item =>
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.content.toLowerCase().includes(normalizedQuery)
    )
  }, [searchQuery])

  return (
    <div className='min-h-screen bg-white p-4'>
      {/* Header */}
      <header className='px-4 py-3 flex items-center gap-4 border-b border-gray-200'>
        <Link to='/' className='text-gray-700'>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path
              d='M15 18L9 12L15 6'
              stroke='black'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </Link>
        <h1 className='text-title text-gray-900'>Ajuda</h1>
      </header>

      {/* Search Bar com feedback visual */}
      <div className='px-4 py-3'>
        <div className='relative'>
          <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
          <input
            type='text'
            placeholder='Como podemos te ajudar?'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='w-full border border-[#e0e0e0] pl-10 pr-4 py-3 bg-gray-50 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-200'
          />
        </div>
      </div>

      {/* FAQ List com estado vazio */}
      <div className='divide-y divide-gray-200'>
        {filteredFaqItems.length === 0 && searchQuery.length >= 3 ? (
          <div className='px-4 py-8 text-center text-gray-500'>
            Nenhum resultado encontrado para &quot;{searchQuery}&quot;
          </div>
        ) : (
          filteredFaqItems.map((item, index) => (
            <Collapse key={index} title={item.title}>
              {item.content}
            </Collapse>
          ))
        )}
      </div>
    </div>
  )
}

export default HelpPage
