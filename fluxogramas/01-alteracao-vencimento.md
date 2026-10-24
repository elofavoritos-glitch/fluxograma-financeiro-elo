# Alteração de Vencimento / Prazo (CR)

Dois caminhos: **com faturamento** (formulário completo) ou **cadastro** (item: título + novo prazo, mesmo fluxo).
Se reprovada em qualquer alçada, volta ao solicitante.

> Anotação: prever mais de um título por solicitação.

```mermaid
flowchart LR
    START((Início)) --> TIPO{Tipo de alteração}
    TIPO -->|Com faturamento| FORM["Formulário: Título, Cód. Cliente, Motivo (pré-definido), Justificativa (texto), Nova data, Região"]
    TIPO -->|Cadastro| ITEM["Item: Título + Novo prazo"]
    FORM --> AP1{Aprovação Gerente Regional}
    ITEM --> AP1
    AP1 -->|Aprovado| AP2{Aprovação Financeiro}
    AP2 -->|Aprovado| USR[Usuário executa]
    USR --> FIM((Concluído))
    AP1 -->|Reprovado| VOLTA[Volta ao solicitante]
    AP2 -->|Reprovado| VOLTA
```
