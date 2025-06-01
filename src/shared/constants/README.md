# Constantes

Esta pasta contém constantes compartilhadas do projeto.

## Estrutura

```
constants/
├── api.ts         # Endpoints e configurações da API
├── routes.ts      # Rotas da aplicação
├── validation.ts  # Regras de validação
└── enums/         # Enumerações
```

## Exemplos

### Endpoints da API

```typescript
// api.ts
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/jwt-auth/v1/token',
    REGISTER: '/custom/v1/create-user',
    LOGOUT: '/custom/v1/logout'
  },
  OFFERS: {
    LIST: '/wp/v2/offers',
    CREATE: '/wp/v2/offers',
    UPDATE: (id: string) => `/wp/v2/offers/${id}`
  }
}
```

### Rotas

```typescript
// routes.ts
export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register'
  },
  OFFERS: {
    LIST: '/my-offers',
    CREATE: '/create-offer',
    DETAILS: (id: string) => `/offer/${id}`
  }
}
```

### Enumerações

```typescript
// enums/status.ts
export enum OfferStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED'
}

export enum DocumentType {
  ID = 'Bilhete de Identidade',
  PASSPORT = 'Passaporte'
}
```

## Convenções

1. Usar constantes para valores fixos
2. Agrupar por domínio
3. Usar enums quando apropriado
4. Documentar significados não óbvios
5. Evitar valores mágicos no código
6. Manter consistência de nomenclatura
