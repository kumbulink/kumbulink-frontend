# Tipos e Interfaces

Esta pasta contém as definições de tipos compartilhados do projeto.

## Estrutura

```
types/
├── api/           # Tipos relacionados à API
│   ├── requests/  # DTOs de requisição
│   └── responses/ # DTOs de resposta
├── models/        # Modelos de domínio
├── components/    # Tipos de props de componentes
└── store/         # Tipos dos stores globais
```

## Exemplos

### Modelos de Domínio

```typescript
// models/user.ts
export interface User {
  id: number
  email: string
  displayName: string
  documentId: string
  documentType: string
}

// models/offer.ts
export interface Offer {
  id: number
  type: 'BUY' | 'SELL'
  amount: number
  status: 'ACTIVE' | 'PENDING' | 'COMPLETED'
  userId: number
}
```

### DTOs

```typescript
// api/requests/auth.ts
export interface LoginDTO {
  email: string
  password: string
}

export interface RegisterDTO extends LoginDTO {
  displayName: string
  documentId: string
  documentType: string
}
```

## Convenções

1. Usar apenas tipos e interfaces
2. Não incluir lógica
3. Documentar tipos complexos
4. Organizar por domínio
5. Manter consistência de nomenclatura
6. Evitar duplicação
