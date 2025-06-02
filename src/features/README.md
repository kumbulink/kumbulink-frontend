# Camada Features

A camada de features contém os casos de uso e funcionalidades do sistema, incluindo fluxos complexos que são principalmente focados em lógica de negócio e orquestração de múltiplas features.

## Estrutura Recomendada

```
features/
├── auth/
│   ├── model/      # Estado local e lógica
│   ├── api/        # Integrações
│   ├── ui/         # Componentes
│   └── lib/        # Utilitários
├── offer-management/
├── bank-management/
└── transaction-management/
```

## Exemplo no Contexto do Kumbulink

### Feature: Auth

```typescript
// Exemplo de estrutura da feature de autenticação

// model/store.ts
class AuthStore {
  user: User | null
  login(credentials: LoginDTO)
  logout()
  checkAuth()
}

// ui/LoginForm.tsx
// Formulário de login com validação e integração com AuthStore

// api/authApi.ts
const login = (credentials: LoginDTO) => api.post('/auth/login', credentials)
const refreshToken = () => api.post('/auth/refresh')
```

### Feature: Offer Management

- Criação de ofertas de compra/venda
- Listagem e filtro de ofertas
- Gerenciamento do status da oferta
- Cancelamento de ofertas

### Feature: Bank Management

- Adição de contas bancárias
- Validação de dados bancários
- Gerenciamento de contas vinculadas
- Remoção de contas

## Regras e Convenções

1. Features podem importar de `shared` e `entities`
2. Devem conter toda a lógica de negócio relacionada ao caso de uso
3. Podem compor múltiplas entidades para criar funcionalidades
4. Devem ser independentes entre si
5. Cada feature deve ter sua própria pasta com subpastas organizadas
6. Os componentes de UI podem ser mais complexos e conter lógica de negócio
7. Utilizar stores (MobX/Zustand) para gerenciar estado local da feature
8. Implementar validações e regras de negócio específicas
