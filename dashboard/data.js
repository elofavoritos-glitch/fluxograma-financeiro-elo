/* Fonte única dos fluxos. Editável pelo editor (editor.html) ou à mão.
   A dashboard (index.html) lê FLOW_DATA daqui; se houver versão salva no
   navegador (localStorage "elo-fluxos"), ela tem prioridade. */
window.FLOW_DATA = {
  areas: [
    {id:"CR",name:"Contas a Receber",short:"CR",cls:"cr"},
    {id:"CP",name:"Contas a Pagar",short:"CP",cls:"cp"},
    {id:"FI",name:"Fiscal",short:"Fiscal",cls:"fi"}
  ],
  processes: [
   {id:"alteracao",area:"CR",icon:"calendar",title:"Alteração de Vencimento / Prazo",short:"Alteração de Vencimento",fields:6,
    summary:"Altera a data de vencimento ou o prazo de títulos do cliente. Aceita vários títulos na mesma solicitação.",
    steps:[
     {type:"form",title:"Formulário",sub:"2 caminhos",desc:"O solicitante escolhe o caminho. Os dois seguem o mesmo fluxo de aprovação.",
      groups:[{label:"Com faturamento",fields:["Títulos (1 ou mais)","Cód. Cliente","Motivo (pré-definido)","Justificativa (texto livre)","Nova data","Região"]},
              {label:"Cadastro",fields:["Títulos (1 ou mais)","Novo prazo"]}]},
     {type:"approval",title:"Gerente Regional",sub:"1ª aprovação",desc:"O gerente da região avalia a alteração.",reject:"volta ao solicitante"},
     {type:"approval",title:"Financeiro",sub:"2ª aprovação",desc:"O Financeiro faz a validação final.",reject:"volta ao solicitante"},
     {type:"exec",title:"Usuário executa",sub:"Equipe de CR",desc:"A alteração aprovada é aplicada nos títulos."},
     {type:"return",title:"Retorno ao cliente",sub:"Fim do fluxo",desc:"O cliente recebe o retorno da alteração aprovada."}
    ],
    rules:["Vários títulos podem entrar na mesma solicitação.","Recusada em qualquer aprovação, a solicitação volta ao solicitante.","Aprovada, o retorno vai para o cliente."],
    open:["O que vem depois de “Usuário executa” no caminho Cadastro (anotação parecida com “OK por aviso”)?"]},

   {id:"desconto",area:"CR",icon:"percent",title:"Desconto Comercial",short:"Desconto Comercial",fields:7,
    summary:"Desconto comercial sobre um título, informado em valor (R$) ou em percentual.",
    steps:[
     {type:"form",title:"Formulário",sub:"7 campos",desc:"Dados do título e do desconto pedido.",
      groups:[{label:"Título e cliente",fields:["Título","Cód. Cliente","Valor original","Regional"]},
              {label:"Desconto",fields:["Valor do desconto (R$) ou % de desconto","Motivo","Justificativa"]}]},
     {type:"approval",title:"Gerente",sub:"1ª aprovação",desc:"O gerente avalia o desconto.",reject:"volta ao solicitante"},
     {type:"approval",title:"Financeiro",sub:"2ª aprovação",desc:"O Financeiro faz a validação final.",reject:"volta ao solicitante"},
     {type:"exec",title:"Usuário executa",sub:"Equipe de CR",desc:"O desconto aprovado é aplicado no título.",done:true}
    ],
    rules:["O desconto é informado em R$ ou em percentual."],
    open:[]},

   {id:"credito",area:"CR",icon:"banknote",title:"Crédito",short:"Crédito",fields:2,
    summary:"Pedido de crédito para o cliente. Não passa por aprovação: o usuário analisa e responde.",
    steps:[
     {type:"form",title:"Formulário",sub:"2 campos",desc:"Identificação do cliente e descrição do pedido.",groups:[{label:"Campos",fields:["Cód. Cliente","Descrição"]}]},
     {type:"exec",icon:"search",title:"Usuário analisa",sub:"Sem aprovação",desc:"O pedido vai direto para a equipe, sem alçada de aprovação."},
     {type:"return",icon:"reply",title:"Resposta ao solicitante",sub:"Fim do fluxo",desc:"O solicitante recebe a resposta da análise."}
    ],
    rules:["Não passa por aprovação."],open:[]},

   {id:"reembolso",area:"CP",icon:"plane",title:"Reembolso Viagem",short:"Reembolso Viagem",fields:null,
    summary:"Reembolso das despesas de uma viagem, lançadas uma a uma com o comprovante anexado.",
    steps:[
     {type:"form",icon:"plane",title:"Dados da viagem",sub:"4 campos",desc:"Informações gerais da viagem.",groups:[{label:"Campos",fields:["Data da viagem","Origem","Destino","Motivo"]}]},
     {type:"form",icon:"receipt",title:"Despesas",sub:"Uma a uma, com comprovante",desc:"Cada despesa é lançada separadamente, com o comprovante anexado.",
      groups:[{label:"Tipos de despesa",fields:["Refeição: descrição e valor (R$)","Hospedagem: descrição e valor (R$)","Passagem","Deslocamento: Uber/Táxi ou quilometragem"]}]},
     {type:"form",icon:"card",title:"Dados de pagamento",sub:"Conta do reembolso",desc:"Para onde o valor do reembolso será pago.",groups:[{label:"Opções",fields:["PIX","Conta corrente"]}]},
     {type:"approval",title:"Gestor imediato",sub:"1ª aprovação",desc:"O gestor imediato de quem viajou avalia as despesas.",reject:"volta ao solicitante"},
     {type:"approval",title:"Financeiro",sub:"2ª aprovação",desc:"O Financeiro faz a validação final.",reject:"volta ao solicitante"},
     {type:"exec",title:"Usuário executa",sub:"Equipe de CP",desc:"O reembolso aprovado é pago.",done:true}
    ],
    rules:["Cada despesa é lançada separadamente, com o comprovante anexado.","Deslocamento pode ser por Uber/Táxi ou por quilometragem.","A solicitação pode ser cancelada antes da conclusão."],
    open:[]},

   {id:"pagamento",area:"CP",icon:"truck",title:"Pagamento Complementar de Frete",short:"Pagto Complementar de Frete",fields:8,
    summary:"Pagamento complementar de frete a fornecedor, com aprovação do gestor.",
    steps:[
     {type:"form",title:"Formulário",sub:"8 campos",desc:"Dados do fornecedor, do frete e do pagamento.",
      groups:[{label:"Fornecedor e pedido",fields:["Cód. Fornecedor","Tipo (lista)","Motivo (lista)","Descrição"]},
              {label:"Frete e pagamento",fields:["Ficha de viagem","CTe","Região","Dados de pagamento"]}]},
     {type:"approval",title:"Gestor",sub:"Aprovação única",desc:"O gestor avalia o pagamento.",reject:"volta ao solicitante"},
     {type:"exec",title:"Usuário executa",sub:"Equipe de CP",desc:"O pagamento aprovado é feito.",done:true}
    ],
    rules:[],open:[]},

   {id:"cancelamento",area:"CP",icon:"filex",title:"Cancelamento RPA",short:"Cancelamento RPA",fields:5,
    summary:"Cancelamento de Recibo de Pagamento a Autônomo, com aprovação da região.",
    steps:[
     {type:"form",title:"Formulário",sub:"5 campos",desc:"Motivo do cancelamento e dados da viagem.",groups:[{label:"Campos",fields:["Motivo","Descrição","Ficha de viagem","CTe","Região"]}]},
     {type:"approval",title:"Região",sub:"Aprovação única",desc:"O responsável pela região avalia o cancelamento.",reject:"volta ao solicitante"},
     {type:"exec",title:"Usuário executa",sub:"Equipe de CP",desc:"O RPA é cancelado.",done:true}
    ],
    rules:[],open:[]},

   {id:"envio-nf",area:"FI",icon:"form",title:"Envio NF",short:"Envio NF",fields:null,status:"Em desenvolvimento",
    summary:"Envio de Nota Fiscal pela área Fiscal. O processo ainda está em desenvolvimento.",
    steps:[{type:"dev",title:"Em definição",sub:"Em desenvolvimento",desc:"Os campos e as aprovações do Envio NF ainda serão definidos."}],
    rules:[],open:[]}
  ]
};
