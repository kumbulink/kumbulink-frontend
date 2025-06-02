# Camada Widgets

A camada widgets contém componentes compostos que combinam múltiplas features e entidades em interfaces reutilizáveis. Isso inclui também fluxos complexos que envolvem múltiplas features quando esses fluxos são principalmente relacionados à UI e composição.

## Estrutura Recomendada

```
widgets/
├── Header/
├── Sidebar/
├── OffersList/
├── BankAccountsList/
├── TransactionHistory/
└── UserBalance/
```

## Exemplo no Contexto do Kumbulink

### Widget: Header

```typescript
// Composição do cabeçalho
- Logo do Kumbulink
- Menu de navegação
- Perfil do usuário
- Notificações
- Saldo atual
```

### Widget: OffersList

Componente complexo que exibe e gerencia ofertas:
- Filtros de busca
- Lista paginada
- Ações por oferta
- Status em tempo real
- Ordenação

### Widget: BankAccountsList

Lista gerenciável de contas bancárias:
- Lista de contas vinculadas
- Ações rápidas
- Formulário de adição
- Validação de dados
- Status de verificação

### Widget: TransactionHistory

Histórico de transações com:
- Filtros por período
- Agrupamento por tipo
- Exportação de dados
- Detalhes expandíveis
- Status de processamento

### Widget: OfferCreationFlow

Exemplo de fluxo complexo implementado como widget:
- Wizard multi-step para criação de oferta
- Integração com múltiplas features (ofertas, bancos, autenticação)
- Validação em tempo real
- Preview da oferta
- Confirmação e feedback
- Persistência de estado entre steps

## Regras e Convenções

1. Widgets podem importar de `shared`, `entities` e `features`
2. Devem ser componentes compostos e reutilizáveis
3. Podem ter seu próprio estado local
4. Devem ser responsivos e acessíveis
5. Podem implementar lazy loading
6. Devem seguir o design system
7. Podem ter variações por contexto
8. Devem ter documentação de uso

### Exemplo de Composição

```typescript
// OffersList/index.tsx
import { useOffers } from '@/features/offer-management'
import { OfferCard } from '@/entities/offer'
import { SearchInput, Pagination } from '@/shared/ui'

export const OffersList = () => {
  // Composição de features e entidades
  // Gerenciamento de estado local
  // Lógica de apresentação
  return (/* UI composta */)
}
```

## Boas Práticas

1. Dividir em subcomponentes quando necessário
2. Implementar skeleton loading
3. Usar memoização para performance
4. Documentar props e comportamentos
5. Testar diferentes cenários de uso
6. Manter consistência visual
7. Implementar tratamento de erros
8. Considerar estados de loading e vazio
