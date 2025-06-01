# API e Serviços

Esta pasta contém as configurações e integrações com APIs e serviços externos.

## Estrutura

```
api/
├── http/           # Cliente HTTP base e interceptors
├── auth/          # Serviços de autenticação
├── offers/        # Serviços relacionados a ofertas
└── banks/         # Serviços relacionados a bancos
```

## Exemplos

### HTTP Client

```typescript
// http/client.ts
import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})

// Interceptors para autenticação
http.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### Serviços de Autenticação

```typescript
// auth/service.ts
export const authService = {
  login: (credentials: LoginDTO) => http.post('/auth/login', credentials),
  register: (userData: RegisterDTO) => http.post('/auth/register', userData),
  logout: () => http.post('/auth/logout')
}
```

## Convenções

1. Usar TypeScript para tipagem
2. Documentar interfaces e tipos
3. Separar por domínio
4. Manter consistência nos retornos
5. Tratar erros adequadamente
6. Usar interceptors para lógica comum
