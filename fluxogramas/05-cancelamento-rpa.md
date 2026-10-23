# Cancelamento RPA — CR

Cancelamento de Recibo de Pagamento a Autônomo (RPA). Compartilha o formulário
e a trilha de aprovação com Reembolso Viagem e Solicitação de Pagamento.

```mermaid
flowchart TD
    START((Início)) --> CANC[Cancelamento RPA]

    CANC --> FORM[Formulário]
    FORM --> F1[Cód. Fornecedor]
    FORM --> F2["Tipo (seleção)"]
    FORM --> F3["Motivo (seleção)"]
    FORM --> F4[Descrição]
    FORM --> F5[Ficha Viagem]
    FORM --> F6[CTE]
    FORM --> F7[Região]
    FORM --> F8[Dados Pagamento]

    F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 --> APROV{Aprovação Gestor}
    APROV -->|Aprovado| USER[Usuário]
    APROV -->|Reprovado| FIM_REP((Reprovado))
    USER --> FIM((Concluído))
```
