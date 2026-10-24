# Alteração de Vencimento / Prazo (CR)

Dois caminhos: **com faturamento** (formulário completo) ou **cadastro** (títulos + novo prazo, mesmo fluxo).
Aceita **vários títulos na mesma solicitação**.
Se recusada em qualquer alçada, volta ao solicitante. Se aprovada, o retorno vai para o cliente.

```mermaid
flowchart LR
    START((Início)) --> TIPO{Tipo de alteração}
    TIPO -->|Com faturamento| FORM["Formulário: Títulos (1 ou mais), Cód. Cliente, Motivo (pré-definido), Justificativa (texto), Nova data, Região"]
    TIPO -->|Cadastro| ITEM["Item: Títulos (1 ou mais) + Novo prazo"]
    FORM --> AP1{Aprovação Gerente Regional}
    ITEM --> AP1
    AP1 -->|Aprovado| AP2{Aprovação Financeiro}
    AP2 -->|Aprovado| USR[Usuário executa]
    USR --> CLI[Retorno ao cliente]
    CLI --> FIM((Concluído))
    AP1 -->|Recusado| VOLTA[Volta ao solicitante]
    AP2 -->|Recusado| VOLTA
```
