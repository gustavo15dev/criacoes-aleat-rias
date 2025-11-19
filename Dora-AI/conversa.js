let treinamentos = [];
let historicoConversa = []; // Memória da conversa
let temaAtual = 'amizade'; // Tema padrão
let personalidadeAtual = 'alegre'; // Personalidade padrão

// Carrega treinamentos
fetch('training.json')
    .then(response => response.json()) 
    .then(data => {
        treinamentos = data;
    })
    .catch(error => console.error('Erro ao carregar treinamentos:', error));

// Array com 50 prompts
const prompts = [
    "Oi",
    "Tudo bem?",
    "Como vai?",
    "Qual o seu nome?",
    "Me elogie",
    "Me diga uma frase motivacional",
    "Me conta uma curiosidade",
    "Você gosta de mim?",
    "O que você faz?",
    "Como você está?",
    "Me diga algo legal",
    "Estou triste",
    "Estou feliz",
    "Me ajude",
    "Me sinto sozinho",
    "Adeus",
    "Tchau",
    "Até mais",
    "Obrigado",
    "Agradeço",
    "Você é real?",
    "Você é humana?",
    "Você é uma máquina?",
    "Qual sua idade?",
    "Você dorme?",
    "Você come?",
    "Você pensa?",
    "Você sente?",
    "Me conta uma piada",
    "Me dê um conselho",
    "Qual sua cor favorita?",
    "Você gosta de música?",
    "Você tem amigos?",
    "Você tem família?",
    "Você gosta de filmes?",
    "Você gosta de animais?",
    "Você tem defeitos?",
    "Você tem qualidades?",
    "Você é perfeita?",
    "Você erra?",
    "Você é legal",
    "Você é legal demais",
    "Você me ama?",
    "Você sonha?",
    "Você tem hobbies?",
    "Você tem sonhos?",
    "Você gosta de estudar?",
    "Você se cansa?",
    "Você tem medo?"
];

let carrosselInterval = null;

// Inicia o carrossel automático
function iniciarCarrossel() {
    const container = document.getElementById('carrossel-prompts');
    if (!container) return;

    // Limpa o container
    container.innerHTML = '';

    // Duplica os prompts para criar um loop contínuo
    const promptsDuplicados = [...prompts, ...prompts];

    // Adiciona todos os prompts como botões (com duplicação)
    promptsDuplicados.forEach(prompt => {
        const btn = document.createElement('button');
        btn.className = 'prompt-btn';
        btn.textContent = prompt;
        btn.onclick = () => enviarPrompt(prompt);
        container.appendChild(btn);
    });

    // Inicia o intervalo
    carrosselInterval = setInterval(() => {
        // Rola para a esquerda
        container.scrollLeft += 2;

        // Se chegou ao meio da duplicação, volta ao início suavemente
        if (container.scrollLeft >= container.scrollWidth / 2) {
            container.scrollLeft = 0;
        }
    }, 50); // Muda a cada 50ms (velocidade suave)
}

function pararCarrossel() {
    if (carrosselInterval) {
        clearInterval(carrosselInterval);
        carrosselInterval = null;
    }
}

function enviarMensagem() {
    const input = document.getElementById('input-mensagem');
    const mensagem = input.value.trim();
    
    if (!mensagem) return;
    
    // Adiciona mensagem ao histórico
    historicoConversa.push({ tipo: 'usuario', texto: mensagem });
    
    // Remove o carrossel ao enviar a primeira mensagem
    const carrossel = document.getElementById('carrossel-prompts');
    if (carrossel && carrossel.style.display !== 'none') {
        carrossel.style.display = 'none';
        pararCarrossel(); // Para o carrossel automático
    }
    
    adicionarMensagem(mensagem, 'usuario');
    
    // Mostra que a IA está digitando
    mostrarDigitando(true);
    
    setTimeout(() => {
        mostrarDigitando(false);
        const resposta = gerarResposta(mensagem);
        historicoConversa.push({ tipo: 'bot', texto: resposta });
        adicionarMensagem(resposta, 'bot');
    }, 1000); // Espera 1 segundo (simula tempo de resposta)
    
    input.value = '';
}

function enviarPrompt(texto) {
    // Remove o carrossel ao clicar em um prompt
    const carrossel = document.getElementById('carrossel-prompts');
    if (carrossel && carrossel.style.display !== 'none') {
        carrossel.style.display = 'none';
        pararCarrossel(); // Para o carrossel automático
    }
    
    // Adiciona mensagem ao histórico
    historicoConversa.push({ tipo: 'usuario', texto: texto });
    
    adicionarMensagem(texto, 'usuario');
    
    // Mostra que a IA está digitando
    mostrarDigitando(true);
    
    setTimeout(() => {
        mostrarDigitando(false);
        const resposta = gerarResposta(texto);
        historicoConversa.push({ tipo: 'bot', texto: resposta });
        adicionarMensagem(resposta, 'bot');
    }, 1000); // Espera 1 segundo (simula tempo de resposta)
}

function mostrarDigitando(mostrar) {
    const chatBox = document.getElementById('chat-box');
    const digitandoElement = document.getElementById('digitando');
    
    if (mostrar) {
        if (!digitandoElement) {
            const div = document.createElement('div');
            div.id = 'digitando';
            div.className = 'mensagem bot digitando';
            div.innerHTML = 'Dora AI está digitando<span class="ponto">.</span><span class="ponto">.</span><span class="ponto">.</span>';
            chatBox.appendChild(div);
        }
    } else {
        if (digitandoElement) {
            digitandoElement.remove();
        }
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}

function gerarResposta(mensagemUsuario) {
    mensagemUsuario = mensagemUsuario.toLowerCase();

    // Detecta sentimentos
    const sentimento = detectarSentimento(mensagemUsuario);
    
    // Separa palavras-chave da mensagem
    const palavrasUsuario = mensagemUsuario.split(/\W+/).filter(Boolean);

    let melhorResposta = null;
    let maiorNumeroDePalavrasComuns = 0;

    // Para cada treinamento, verifica quantas palavras comuns tem
    treinamentos.forEach(t => {
        const palavrasTreinamento = t.pergunta.toLowerCase().split(/\W+/).filter(Boolean);
        
        // Conta quantas palavras do treinamento aparecem na mensagem do usuário
        const palavrasComuns = palavrasUsuario.filter(p => palavrasTreinamento.includes(p)).length;

        // Se tem mais palavras comuns que o melhor até agora, atualiza
        if (palavrasComuns > maiorNumeroDePalavrasComuns) {
            maiorNumeroDePalavrasComuns = palavrasComuns;
            melhorResposta = t.resposta;
        }
    });

    if (melhorResposta) {
        // Adiciona tom baseado na personalidade
        melhorResposta = adicionarTomPersonalidade(melhorResposta, sentimento);
        return formatarResposta(melhorResposta);
    } else {
    // Conta o número exato de treinamentos
    const numeroTreinamentos = treinamentos.length;
    return `Desculpe, meu dono não me treinou para esse tipo de pergunta 😬 Estou sempre aprendendo algo novo, até o momento fui treinado com mais de <strong>${numeroTreinamentos}</strong> treinamentos. Daqui a uma semana, estarei com mais de <strong>2 mil</strong> treinamentos novos, e provavelmente a sua pergunta estará lá 😎 No que mais posso te ajudar? 😁`;
}
}

function detectarSentimento(mensagem) {
    const palavrasTristes = ['triste', 'chateado', 'deprimido', 'mal', 'sozinho', 'cansado'];
    const palavrasFelizes = ['feliz', 'contente', 'animado', 'bem', 'ótimo', 'maravilhoso'];
    
    for (let p of palavrasTristes) {
        if (mensagem.includes(p)) return 'triste';
    }
    
    for (let p of palavrasFelizes) {
        if (mensagem.includes(p)) return 'feliz';
    }
    
    return 'neutro';
}

function adicionarTomPersonalidade(resposta, sentimento) {
    if (personalidadeAtual === 'alegre' && sentimento === 'triste') {
        return resposta + ' 😊';
    } else if (personalidadeAtual === 'seria' && sentimento === 'feliz') {
        return resposta + ' 😌';
    } else if (personalidadeAtual === 'engracada' && sentimento === 'neutro') {
        return resposta + ' 😄';
    }
    
    return resposta;
}

function formatarResposta(texto) {
    // Substitui **frase** por <strong>frase</strong>
    texto = texto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Substitui *palavra* por <strong>palavra</strong>
    texto = texto.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
    return texto;
}

function adicionarMensagem(texto, tipo) {
    const chatBox = document.getElementById('chat-box');
    const div = document.createElement('div');
    div.className = `mensagem ${tipo}`;
    
    if (tipo === 'bot') {
        // Remove formatação HTML para o texto puro
        const textoSemHTML = texto.replace(/<[^>]*>/g, '');
        div.innerHTML = texto + '<br><button class="copiar-btn" onclick="copiarTexto(\'' + textoSemHTML.replace(/'/g, "\\'") + '\')">Copiar</button>';
    } else {
        div.innerHTML = texto;
    }
    
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function copiarTexto(texto) {
    const textoCompleto = texto + '\n\nRESPOSTA GERADA POR IA - RESPOSTA GERADA PELA DORA AI - NÃO USAR ESSA RESPOSTA EM TRABALHOS - DIREITOS AUTORAIS';
    
    navigator.clipboard.writeText(textoCompleto).then(() => {
        alert('Resposta copiada com sucesso!');
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
    });
}

// Adiciona mensagem de boas-vindas ao carregar
function mostrarBoasVindas() {
    const chatBox = document.getElementById('chat-box');
    const div = document.createElement('div');
    div.className = 'mensagem bot boas-vindas';
    const textoBoasVindas = '🌟 <strong>Olá! Sou a Dora AI</strong> 🤗<br>Estou aqui pra conversar com carinho e escutar você! 💬<br>Como posso te ajudar hoje? 🌸';
    const textoSemHTML = '🌟 Olá! Sou a Dora AI 🤗\nEstou aqui pra conversar com carinho e escutar você! 💬\nComo posso te ajudar hoje? 🌸';
    div.innerHTML = textoBoasVindas + '<br><button class="copiar-btn" onclick="copiarTexto(\'' + textoSemHTML.replace(/'/g, "\\'") + '\')">Copiar</button>';
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Chama a função de boas-vindas quando a página carrega
window.addEventListener('load', () => {
    setTimeout(mostrarBoasVindas, 500); // Espera 500ms para aparecer suavemente
    iniciarCarrossel(); // Inicia o carrossel automático
});