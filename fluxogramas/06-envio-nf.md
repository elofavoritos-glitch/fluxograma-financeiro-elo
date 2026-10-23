# Envio NF — Fiscal (em desenvolvimento)

Envio de Nota Fiscal pela área Fiscal. Fluxo ainda **em desenvolvimento** —
mapeamento preliminar a partir do quadro.

```mermaid
flowchart TD
    START((Início)) --> ROUTER{Área}
    ROUTER -->|CR| CR[Contas a Receber]
    ROUTER -->|CP| CP[Contas a Pagar]
    ROUTER -->|Fiscal| FISCAL[Fiscal]

    FISCAL --> NF["Envio NF<br/>(em desenvolvimento)"]

    classDef dev fill:#fff3cd,stroke:#d39e00;
    class NF dev;
```

> **Pendente:** detalhar campos e trilha de aprovação do Envio NF quando o processo for definido.
