# Camada App

Esta é a camada de mais alto nível que inicializa e configura toda a aplicação.

## Propósito
- Inicialização da aplicação
- Configuração global
- Providers (React Context, Router, etc)
- Estilos globais
- Configuração de temas

## Estrutura Recomendada
```
app/
  └─ providers/     # Providers globais da aplicação
  └─ styles/        # Estilos e temas globais
  └─ app.tsx        # Componente raiz da aplicação
  └─ index.ts       # Ponto de entrada da camada
```

## Exemplo no Contexto do Kumbulink
No caso do Kumbulink, esta camada inclui:

- Providers para autenticação (AuthProvider)
- Configuração do tema (light/dark)
- Providers para notificações de transações
- Configuração global do Axios para chamadas à API
- Configuração do React Router
- Providers para estado global (se necessário)

## Regras e Convenções
1. Esta camada não deve conter lógica de negócio
2. Deve expor apenas o componente App e tipos/interfaces necessários
3. É o único lugar onde providers globais devem ser definidos
