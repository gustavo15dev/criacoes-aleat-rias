let treinamentos = [];

// Carrega treinamentos
fetch('training.json')
    .then(response => response.json())
    .then(data => {
        treinamentos = data;
    })
    .catch(error => console.error('Erro ao carregar treinamentos:', error));

function enviarMensagem() {
    const input = document.getElementById('input-mensagem');
    const mensagem = input.value.trim();
    
    if (!mensagem) return;
    
    adicionarMensagem(mensagem, 'usuario');
    
    // Mostra que a IA está digitando
    mostrarDigitando(true);
    
    setTimeout(() => {
        mostrarDigitando(false);
        const resposta = gerarResposta(mensagem);
        adicionarMensagem(resposta, 'bot');
    }, 1000); // Espera 1 segundo (simula tempo de resposta)
    
    input.value = '';
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
        return formatarResposta(melhorResposta);
    } else {
        return "Desculpe, não entendi. Você pode tentar perguntar de outra forma?";
    }
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
    div.innerHTML = texto;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}