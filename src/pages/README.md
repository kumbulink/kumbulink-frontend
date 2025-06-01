# Camada Pages

A camada de páginas é responsável por compor features e widgets em telas completas da aplicação.

## Estrutura Recomendada

```
pages/
├── home/
├── dashboard/
├── offers/
│   ├── list/
│   └── create/
├── banks/
├── profile/
└── index.ts      # Exporta as rotas
```

## Exemplo no Contexto do Kumbulink

### Página: Dashboard

```typescript
// Dashboard/index.tsx
import { OffersList } from '@/widgets/OffersList'
import { BankAccountsSummary } from '@/widgets/BankAccountsSummary'
import { TransactionHistory } from '@/widgets/TransactionHistory'
import { UserBalance } from '@/widgets/UserBalance'

export const DashboardPage = () => {
  return (
    <Layout>
      <UserBalance />
      <OffersList />
      <BankAccountsSummary />
      <TransactionHistory />
    </Layout>
  )
}
```

### Principais Páginas

1. Dashboard
   - Visão geral do usuário
   - Resumo de ofertas
   - Saldo e movimentações

2. Ofertas
   - Lista de ofertas ativas
   - Criação de novas ofertas
   - Histórico de ofertas

3. Contas Bancárias
   - Lista de contas vinculadas
   - Adição de nova conta
   - Gerenciamento de contas

4. Perfil
   - Dados do usuário
   - Configurações
   - Preferências

## Regras e Convenções

1. Páginas podem importar de todas as camadas exceto `app`
2. Devem focar na composição de widgets e features
3. Não devem conter lógica de negócio
4. Podem conter lógica de roteamento e layout
5. Devem ser organizadas de acordo com a estrutura de URLs
6. Podem implementar lazy loading para otimização
7. Devem ter seus próprios layouts quando necessário
8. Responsáveis pela composição do breadcrumb e navegação
