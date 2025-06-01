# Camada Entities

A camada de entidades contém os modelos de negócio e suas operações CRUD básicas.

## Estrutura Recomendada

```
entities/
├── user/
│   ├── model/         # Tipos e interfaces
│   ├── api/           # Requisições HTTP
│   ├── ui/           # Componentes de UI específicos
│   └── lib/          # Helpers e utils
├── offer/
├── bank/
└── transaction/
```

## Exemplo no Contexto do Kumbulink

### Entidade User

```typescript
// model/types.ts
interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'USER'
  balance: number
}

// api/userApi.ts
const fetchUser = (id: string) => api.get<User>(`/users/${id}`)
const updateUser = (id: string, data: Partial<User>) => api.patch(`/users/${id}`, data)

// ui/UserCard.tsx
// Componente de cartão que exibe informações básicas do usuário
```

### Entidade Offer

- Representa uma oferta de compra/venda
- Inclui informações como valor, tipo (compra/venda), status
- Gerencia o ciclo de vida básico de uma oferta

### Entidade Bank

- Representa uma conta bancária vinculada
- Armazena informações como banco, agência, conta
- Gerencia operações básicas com contas bancárias

## Regras e Convenções

1. Entidades são independentes entre si
2. Podem importar apenas de `shared`
3. Não devem conter lógica de negócio complexa
4. Devem ser reutilizáveis em diferentes features
5. Cada entidade deve ter sua própria pasta com subpastas para model, api, ui e lib
6. Os componentes de UI devem ser atômicos e não devem conter lógica de negócio
