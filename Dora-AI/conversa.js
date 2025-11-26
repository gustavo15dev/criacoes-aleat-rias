let treinamentos = [];
let historicoConversa = [];
let temaAtual = 'amizade';
let personalidadeAtual = 'alegre';
let redacoesData = []; // Nova variável para armazenar os dados de redacoes.json
let modoRedacaoAtivo = false; // Estado para controlar o botão visualmente

const bancoImagens = {
    'praia.png': ['praia', 'areia', 'litoral', 'verão', 'onda', 'baixada santista', 'msc', 'coqueiro', 'maré'],
    'mar.png': ['mar', 'oceano', 'água', 'azul', 'navegação', 'profundeza', 'salgado', 'atlântico'],
    'natureza.png': ['natureza', 'meio ambiente', 'ecossistema', 'biodiversidade', 'fauna', 'flora', 'bioma'],
    'floresta.png': ['floresta', 'mata', 'selva', 'árvore', 'amazônia', 'vegetação', 'desmatamento', 'madeira'],
    'clima.png': ['clima', 'tempo', 'meteorologia', 'chuva', 'tempestade', 'nuvem', 'furacão', 'aquecimento global', 'efeito estufa'],
    'universo.png': ['universo', 'espaço', 'galáxia', 'estrela', 'planeta', 'buraco negro', 'big bang', 'cosmo', 'astronomia'],
    'sol.png': ['sol', 'luz', 'calor', 'raio', 'nascer do sol', 'pôr do sol', 'dia'],
    'lua.png': ['lua', 'noite', 'fase', 'minguante', 'crescente', 'cheia', 'eclipse'],
    'cidade.png': ['cidade', 'urbano', 'metrópole', 'prédio', 'edifício', 'bairro', 'centro', 'asfalto'],
    'transito.png': ['trânsito', 'rua', 'avenida', 'semáforo', 'engarrafamento', 'transporte', 'mobilidade'],
    'carro.png': ['carro', 'automóvel', 'veículo', 'motor', 'rodas', 'combustível', 'estrada', 'dirigir'],
    'casa.png': ['casa', 'lar', 'moradia', 'abrigo', 'residência', 'quarto', 'sala', 'conforto', 'teto'],
    'escola.png': ['escola', 'sala de aula', 'ensino', 'educação', 'colégio', 'universidade', 'faculdade', 'curso', 'aluno'],
    'historia.png': ['história', 'passado', 'antiguidade', 'idade média', 'século', 'memória', 'civilização', 'museu'],
    'guerra.png': ['guerra', 'batalha', 'conflito', 'revolução', 'soldado', 'armas', 'exército', 'trincheira'],
    'politica.png': ['política', 'governo', 'estado', 'democracia', 'voto', 'eleição', 'presidente', 'poder', 'cidadão'],
    'direito.png': ['lei', 'justiça', 'direito', 'constituição', 'juiz', 'advogado', 'regra', 'norma', 'crime'],
    'filosofia.png': ['filosofia', 'pensamento', 'razão', 'ética', 'moral', 'sabedoria', 'sócrates', 'platão', 'ideia'],
    'religiao.png': ['religião', 'fé', 'deus', 'igreja', 'espiritualidade', 'sagrado', 'crença', 'oração', 'bíblia'],
    'matematica.png': ['matemática', 'número', 'cálculo', 'soma', 'divisão', 'lógica', 'equação', 'álgebra'],
    'geometria.png': ['geometria', 'triângulo', 'círculo', 'quadrado', 'ângulo', 'forma', 'polígono', 'pitágoras'],
    'fisica.png': ['física', 'energia', 'força', 'velocidade', 'inércia', 'movimento', 'newton', 'einstein', 'gravidade'],
    'quimica.png': ['química', 'reação', 'substância', 'mistura', 'tabela periódica', 'elemento', 'ácido', 'laboratório'],
    'atomo.png': ['átomo', 'molécula', 'elétron', 'próton', 'nêutron', 'partícula', 'nuclear', 'radioatividade'],
    'dna.png': ['dna', 'genética', 'gene', 'hereditariedade', 'cromossomo', 'clone', 'mutação'],
    'celula.png': ['célula', 'microscópio', 'núcleo', 'membrana', 'mitocôndria', 'biologia'],
    'anatomia.png': ['anatomia', 'corpo humano', 'órgão', 'ossos', 'esqueleto', 'pele', 'músculo', 'sangue'],
    'cerebro.png': ['cérebro', 'mente', 'neurônio', 'pensar', 'inteligência', 'memória', 'raciocínio', 'cabeça'],
    'coracao.png': ['coração', 'cardíaco', 'pulsação', 'veia', 'artéria', 'circulação', 'amor'],
    'virus.png': ['vírus', 'bactéria', 'microrganismo', 'infecção', 'gripe', 'contágio', 'epidemia', 'parasita'],
    'hospital.png': ['hospital', 'médico', 'enfermeira', 'clínica', 'cirurgia', 'uti', 'emergência', 'ambulância'],
    'remedio.png': ['remédio', 'medicamento', 'vacina', 'comprimido', 'farmácia', 'cura', 'tratamento', 'terapia'],
    'robo.png': ['robô', 'ia', 'inteligência artificial', 'bot', 'automação', 'futuro', 'máquina', 'ciborgue'],
    'computador.png': ['computador', 'pc', 'notebook', 'hardware', 'processador', 'mouse', 'teclado', 'tela'],
    'codigo.png': ['código', 'programação', 'software', 'algoritmo', 'python', 'java', 'dev', 'script', 'bug'],
    'internet.png': ['internet', 'rede', 'wifi', 'web', 'online', 'conexão', 'site', 'navegador', 'nuvem'],
    'celular.png': ['celular', 'smartphone', 'aplicativo', 'app', 'mensagem', 'notificação', 'touch'],
    'seguranca.png': ['segurança', 'hacker', 'senha', 'proteção', 'firewall', 'vírus de computador', 'cibersegurança'],
    'dinheiro.png': ['dinheiro', 'moeda', 'dólar', 'real', 'nota', 'banco', 'pagamento', 'pix', 'caixa'],
    'grafico.png': ['gráfico', 'estatística', 'porcentagem', 'crescimento', 'lucro', 'prejuízo', 'dados', 'análise'],
    'mercado.png': ['mercado', 'bolsa de valores', 'ações', 'investimento', 'empresa', 'negócio', 'comércio', 'venda'],
    'bitcoin.png': ['bitcoin', 'criptomoeda', 'blockchain', 'digital', 'token', 'nft', 'carteira digital'],
    'trabalho.png': ['trabalho', 'emprego', 'profissão', 'carreira', 'escritório', 'chefe', 'funcionário', 'rh'],
    'livro.png': ['livro', 'leitura', 'página', 'capítulo', 'texto', 'escrita', 'autor', 'biblioteca', 'literatura'],
    'musica.png': ['música', 'canção', 'som', 'ritmo', 'melodia', 'instrumento', 'cantor', 'banda', 'show'],
    'arte.png': ['arte', 'pintura', 'quadro', 'escultura', 'desenho', 'artista', 'cor', 'criatividade'],
    'filme.png': ['filme', 'cinema', 'vídeo', 'série', 'ator', 'atriz', 'hollywood', 'pipoca', 'tela'],
    'comida.png': ['comida', 'alimento', 'refeição', 'jantar', 'almoço', 'lanche', 'nutrição', 'fome', 'sabor'],
    'esporte.png': ['esporte', 'futebol', 'jogo', 'atleta', 'bola', 'competição', 'time', 'ginástica'],
    'emocao.png': ['feliz', 'triste', 'choro', 'riso', 'raiva', 'sentimento', 'emoção', 'ansiedade', 'depressão'],
    'dora.png': ['dora ai', 'amiga virtual', 'sou uma ia', 'ajudante', 'assistente', 'chatbot']
};

function mostrarAnuncio() {
    const overlay = document.createElement('div');
    overlay.id = 'anuncio-overlay';
    overlay.className = 'anuncio-overlay';
    overlay.innerHTML = `
        <div class="anuncio-container">
            <h2>Dora AI 1.3</h2>
            <video src="img-IA/anuncio.mp4" autoplay muted playsinline loop class="anuncio-video"></video>
            <div class="anuncio-texto">
            <ul>
                    <li>Gera imagens junto com as respostas</li>
                    <li>Mil novos treinamentos</li>
                    <li>Design claro, e mais suave</li>
                    <li>Interface renovada estilo Studio</li>
                </ul>
            </div>
            <div class="anuncio-botoes">
                <button onclick="fecharAnuncio()">Testar Dora AI</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function fecharAnuncio() {
    const overlay = document.getElementById('anuncio-overlay');
    if (overlay) overlay.remove();
}

// --- Função Nova para o botão de "Redação" (Toggle Ligar/Desligar) ---
function alternarModoRedacao() {
    const input = document.getElementById('input-mensagem');
    const btnRedacao = document.getElementById('btn-redacao');
    const textoPrefixo = "Pode me ajudar a escrever uma redação sobre ";
    
    // Verifica se já está ativo para DESLIGAR
    if (modoRedacaoAtivo) {
        modoRedacaoAtivo = false;
        btnRedacao.classList.remove('active');

        // Remove o texto do input apenas se ele começar com o prefixo
        if (input.value.startsWith(textoPrefixo)) {
            // Remove o prefixo
            input.value = input.value.replace(textoPrefixo, '');
        }
    } 
    // Se não estiver ativo, LIGAR
    else {
        modoRedacaoAtivo = true;
        btnRedacao.classList.add('active');
        
        // Insere o texto se ainda não estiver lá
        if (!input.value.startsWith(textoPrefixo)) {
            input.value = textoPrefixo + input.value;
        }
        
        input.focus();
        // Move o cursor para o final
        const val = input.value;
        input.value = '';
        input.value = val;
    }
}

function enviarMensagem() {
    const input = document.getElementById('input-mensagem');
    const btnEnviar = document.getElementById('btn-enviar');
    const btnRedacao = document.getElementById('btn-redacao'); // Pegamos o botão de redação
    const mensagem = input.value.trim();
    
    if (!mensagem) return;
    
    // Desativa UI
    input.disabled = true;
    if(btnEnviar) btnEnviar.disabled = true;

    // Reseta o estado visual do botão de redação ao enviar
    if (modoRedacaoAtivo) {
        modoRedacaoAtivo = false;
        btnRedacao.classList.remove('active');
    }

    historicoConversa.push({ tipo: 'usuario', texto: mensagem });
    adicionarMensagem(mensagem, 'usuario');
    input.value = '';
    
    mostrarDigitando(true);
    
    setTimeout(() => {
        mostrarDigitando(false);
        const resposta = gerarResposta(mensagem);
        const imagemAssociada = encontrarImagem(mensagem);
        
        historicoConversa.push({ tipo: 'bot', texto: resposta });
        adicionarMensagem(resposta, 'bot', imagemAssociada);
        
        // Reativa UI
        input.disabled = false;
        input.focus();
        if(btnEnviar) btnEnviar.disabled = false;
    }, 1500); // Tempo de resposta ligeiramente maior para apreciar o design
}

function mostrarDigitando(mostrar) {
    const chatBox = document.getElementById('chat-box');
    const digitandoElement = document.getElementById('digitando');
    
    if (mostrar) {
        if (!digitandoElement) {
            const div = document.createElement('div');
            div.id = 'digitando';
            div.className = 'mensagem bot digitando';
            // Estrutura simplificada para o "digitando"
            div.innerHTML = '<div class="message-content">Dora AI está pensando...</div>';
            chatBox.appendChild(div);
        }
    } else {
        if (digitandoElement) digitandoElement.remove();
    }
    scrollParaBaixo();
}

function gerarResposta(mensagemUsuario) {
    mensagemUsuario = mensagemUsuario.toLowerCase();
    const sentimento = detectarSentimento(mensagemUsuario);
    const palavrasUsuario = mensagemUsuario.split(/\W+/).filter(Boolean);

    let melhorResposta = null;
    const textoPrefixoRedacao = "pode me ajudar a escrever uma redação sobre ";

    // --- Lógica para Redação (se o modo estiver ativo) ---
    if (modoRedacaoAtivo || mensagemUsuario.startsWith(textoPrefixoRedacao)) {
        // Extrai o tema, independentemente de como a mensagem foi formatada
        const temaSolicitado = mensagemUsuario.startsWith(textoPrefixoRedacao)
            ? mensagemUsuario.substring(textoPrefixoRedacao.length).trim()
            : mensagemUsuario.trim();

        const redacaoEncontrada = redacoesData.find(r => r.tema.toLowerCase() === temaSolicitado.toLowerCase());

        if (redacaoEncontrada) {
            let respostaRedacao = `Com certeza! Aqui está uma redação sobre **${redacaoEncontrada.tema.toUpperCase()}**:\n\n`;
            
            respostaRedacao += `**Introdução:**\n`;
            redacaoEncontrada.estrutura.introducao.forEach(frase => {
                respostaRedacao += `${frase}\n`;
            });
            respostaRedacao += `\n**Desenvolvimento:**\n`;
            redacaoEncontrada.estrutura.desenvolvimento.forEach(frase => {
                respostaRedacao += `${frase}\n`;
            });
            respostaRedacao += `\n**Conclusão:**\n`;
            redacaoEncontrada.estrutura.conclusao.forEach(frase => {
                respostaRedacao += `${frase}\n`;
            });
            
            return formatarResposta(respostaRedacao);
        } else {
            const temasDisponiveis = redacoesData.map(r => r.tema).join(', ');
            return `Desculpe, não encontrei uma redação sobre **${temaSolicitado}**. Os temas que eu conheço são: ${temasDisponiveis}.`;
        }
    }
    // --- Fim da Lógica para Redação ---

    let maiorNumeroDePalavrasComuns = 0;

    treinamentos.forEach(t => {
        const palavrasTreinamento = t.pergunta.toLowerCase().split(/\W+/).filter(Boolean);
        const palavrasComuns = palavrasUsuario.filter(p => palavrasTreinamento.includes(p)).length;

        if (palavrasComuns > maiorNumeroDePalavrasComuns) {
            maiorNumeroDePalavrasComuns = palavrasComuns;
            melhorResposta = t.resposta;
        }
    });

    if (melhorResposta) {
        melhorResposta = adicionarTomPersonalidade(melhorResposta, sentimento);
        return formatarResposta(melhorResposta);
    } else {
        const numeroTreinamentos = treinamentos.length;
        return `Desculpe, ainda não fui treinada para isso 😬 Atualmente conheço mais de **${numeroTreinamentos}** tópicos. Tente me perguntar de outra forma! 😁 Você também pode clicar no botão "Redação" para me pedir ajuda com temas específicos.`;
    }
}

function encontrarImagem(mensagemUsuario) {
    mensagemUsuario = mensagemUsuario.toLowerCase();
    const palavrasUsuario = mensagemUsuario.split(/\W+/).filter(Boolean);
    
    for (let imagem in bancoImagens) {
        const tags = bancoImagens[imagem];
        for (let palavra of palavrasUsuario) {
            if (tags.includes(palavra)) return imagem;
        }
    }
    return null;
}

function detectarSentimento(mensagem) {
    const palavrasTristes = ['triste', 'chateado', 'deprimido', 'mal', 'sozinho', 'cansado', 'chorar'];
    const palavrasFelizes = ['feliz', 'contente', 'animado', 'bem', 'ótimo', 'maravilhoso', 'alegre'];
    
    for (let p of palavrasTristes) if (mensagem.includes(p)) return 'triste';
    for (let p of palavrasFelizes) if (mensagem.includes(p)) return 'feliz';
    return 'neutro';
}

function adicionarTomPersonalidade(resposta, sentimento) {
    if (personalidadeAtual === 'alegre' && sentimento === 'triste') return resposta + ' 😊 Vai ficar tudo bem!';
    if (personalidadeAtual === 'seria' && sentimento === 'feliz') return resposta + ' 😌 Fico contente.';
    if (personalidadeAtual === 'engracada' && sentimento === 'neutro') return resposta + ' 😄';
    return resposta;
}

function formatarResposta(texto) {
    texto = texto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    texto = texto.replace(/\n/g, '<br>'); // Converte quebras de linha em <br> para a formatação correta
    return texto;
}

// --- FUNÇÃO PRINCIPAL DE ADICIONAR MENSAGEM (REDESIGN TOTAL) ---
function adicionarMensagem(texto, tipo, imagemNome = null) {
    const chatBox = document.getElementById('chat-box');
    const divMensagem = document.createElement('div');
    divMensagem.className = `mensagem ${tipo}`;
    
    // Cria o container do conteúdo da mensagem (a bolha)
    const divContent = document.createElement('div');
    divContent.className = 'message-content';

    if (tipo === 'bot') {
        const textoSemHTML = texto.replace(/<[^>]*>/g, '');
        
        // 1. Adiciona o Texto
        divContent.innerHTML = texto;
        
        // 2. Se tiver imagem, adiciona o Skeleton Loader (Efeito Premium)
        if (imagemNome) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'imagem-container-premium';
            imgContainer.innerHTML = '<div class="skeleton-loader"></div>'; // O efeito de brilho
            divContent.appendChild(imgContainer);
            
            // Carrega a imagem real em segundo plano
            const img = new Image();
            img.src = `img-IA/${imagemNome}`;
            img.className = 'imagem-resposta-premium';
            img.alt = "Imagem gerada por IA";
            
            img.onload = () => {
                // Quando carregar, substitui o skeleton pela imagem com fade-in
                 setTimeout(() => {
                    imgContainer.innerHTML = ''; // Limpa o skeleton
                    imgContainer.appendChild(img);
                    scrollParaBaixo();
                 }, 1000); // Pequeno delay dramático para o efeito skeleton aparecer
            };
             img.onerror = () => {
                 imgContainer.innerHTML = '<span style="font-size:12px; color:#999;">Erro ao gerar imagem.</span>';
             };
        }

        // 3. Adiciona a bolha de conteúdo ao container principal da mensagem
        divMensagem.appendChild(divContent);

        // 4. Cria o container de Ações (Ícones abaixo da bolha)
        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'message-actions-container';

        // Botão Copiar (Ícone)
        const btnCopy = document.createElement('button');
        btnCopy.className = 'action-icon-btn';
        btnCopy.title = "Copiar resposta";
        btnCopy.innerHTML = '<span class="material-symbols-rounded">content_copy</span>';
        btnCopy.onclick = () => copiarTexto(textoSemHTML);
        actionsContainer.appendChild(btnCopy);

        // Botão Baixar (Ícone) - Só se tiver imagem
        if (imagemNome) {
            const btnDownload = document.createElement('button');
            btnDownload.className = 'action-icon-btn';
            btnDownload.title = "Baixar imagem";
            btnDownload.innerHTML = '<span class="material-symbols-rounded">download</span>';
            btnDownload.onclick = () => baixarImagem(`img-IA/${imagemNome}`);
            actionsContainer.appendChild(btnDownload);
        }

        divMensagem.appendChild(actionsContainer);

    } else {
        // Mensagem do usuário (simples)
        divContent.innerHTML = texto;
        divMensagem.appendChild(divContent);
    }
    
    chatBox.appendChild(divMensagem);
    scrollParaBaixo();
}

function scrollParaBaixo() {
     const chatBoxContainer = document.getElementById('chat-box-container');
     chatBoxContainer.scrollTo({
        top: chatBoxContainer.scrollHeight,
        behavior: 'smooth'
    });
}


// Funções auxiliares (Baixar/Copiar) mantidas, apenas sem os alertas nativos feios
function baixarImagem(srcImagem) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = srcImagem;
    
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const marca = new Image();
        marca.src = 'img-IA/marca-dagua.png';
        
        marca.onload = function() {
            // Lógica da marca d'água (mantida)
            const larguraMarca = Math.min(100, canvas.width * 0.2); // Máximo 100px ou 20% da largura
            const alturaMarca = larguraMarca * (marca.height / marca.width);
            ctx.globalAlpha = 0.6;
            ctx.drawImage(marca, canvas.width - larguraMarca - 20, canvas.height - alturaMarca - 20, larguraMarca, alturaMarca);
            
            const link = document.createElement('a');
            link.download = `DoraAI-Gerado-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        };
        marca.onerror = function() {
             // Se não tiver marca d'água, baixa sem
             const link = document.createElement('a');
             link.download = `DoraAI-Gerado-${Date.now()}.png`;
             link.href = canvas.toDataURL('image/png');
             link.click();
        }
    };
}

function copiarTexto(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        // Feedback sutil poderia ser implementado aqui, tipo um "toast"
        console.log('Texto copiado'); 
    }).catch(console.error);
}

fetch('training.json')
    .then(response => response.json()) 
    .then(data => treinamentos = data)
    .catch(error => console.error('Erro ao carregar treinamentos:', error));

// Carrega o redacoes.json
fetch('redacoes.json')
    .then(response => response.json())
    .then(data => redacoesData = data)
    .catch(error => console.error('Erro ao carregar redações:', error));
window.addEventListener('load', () => {
    mostrarAnuncio();
});