# Camada Shared

A camada shared contém utilitários, bibliotecas, configurações e componentes reutilizáveis em toda a aplicação. Esta camada também inclui implementações de fluxos complexos que são reutilizáveis em diferentes partes do sistema.

## Estrutura Recomendada

```
shared/
├── api/           # Configuração e utilitários de API
├── config/        # Configurações globais
├── lib/           # Bibliotecas e utilitários
├── ui/            # Componentes de UI reutilizáveis
└── hooks/         # Hooks React compartilhados
```

## Exemplo no Contexto do Kumbulink

### API

```typescript
// api/baseApi.ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})

// Interceptors para:
// - Token de autenticação
// - Refresh token
// - Tratamento de erros
// - Logging
```

### UI Components

Componentes base reutilizáveis:

- Button (Primary, Secondary, Danger)
- Input (Text, Number, Currency)
- Select
- Modal
- Toast/Notifications
- Card
- Table
- Form components

### Hooks Comuns

```typescript
// hooks/useDebounce.ts
// hooks/useLocalStorage.ts
// hooks/useMediaQuery.ts
// hooks/usePrevious.ts
```

### Utilitários

```typescript
// lib/currency.ts
export const formatCurrency = (value: number): string
export const parseCurrency = (value: string): number

// lib/date.ts
export const formatDate = (date: Date): string
export const parseDate = (dateString: string): Date

// lib/validation.ts
export const validateCPF = (cpf: string): boolean
export const validateBankAccount = (account: string): boolean
```

## Regras e Convenções

1. Não deve importar de nenhuma outra camada
2. Deve conter apenas código realmente compartilhado
3. Componentes devem ser altamente reutilizáveis
4. Deve ter boa documentação e testes
5. Evitar dependências externas desnecessárias
6. Manter consistência visual nos componentes de UI
7. Implementar temas e variáveis CSS globais
8. Utilizar TypeScript para melhor tipagem
