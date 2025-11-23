let treinamentos = [];
let historicoConversa = []; // Memória da conversa
let temaAtual = 'amizade'; // Tema padrão
let personalidadeAtual = 'alegre'; // Personalidade padrão

// Banco de imagens com palavras-chave
const bancoImagens = {
    // --- Ambientes Naturais e Geografia ---
    'praia.png': ['praia', 'areia', 'litoral', 'verão', 'onda', 'baixada santista', 'msc', 'coqueiro', 'maré'],
    'mar.png': ['mar', 'oceano', 'água', 'azul', 'navegação', 'profundeza', 'salgado', 'atlântico'],
    'natureza.png': ['natureza', 'meio ambiente', 'ecossistema', 'biodiversidade', 'fauna', 'flora', 'bioma'],
    'floresta.png': ['floresta', 'mata', 'selva', 'árvore', 'amazônia', 'vegetação', 'desmatamento', 'madeira'],
    'clima.png': ['clima', 'tempo', 'meteorologia', 'chuva', 'tempestade', 'nuvem', 'furacão', 'aquecimento global', 'efeito estufa'],
    'universo.png': ['universo', 'espaço', 'galáxia', 'estrela', 'planeta', 'buraco negro', 'big bang', 'cosmo', 'astronomia'],
    'sol.png': ['sol', 'luz', 'calor', 'raio', 'nascer do sol', 'pôr do sol', 'dia'],
    'lua.png': ['lua', 'noite', 'fase', 'minguante', 'crescente', 'cheia', 'eclipse'],

    // --- Vida Urbana e Sociedade ---
    'cidade.png': ['cidade', 'urbano', 'metrópole', 'prédio', 'edifício', 'bairro', 'centro', 'asfalto'],
    'transito.png': ['trânsito', 'rua', 'avenida', 'semáforo', 'engarrafamento', 'transporte', 'mobilidade'],
    'carro.png': ['carro', 'automóvel', 'veículo', 'motor', 'rodas', 'combustível', 'estrada', 'dirigir'],
    'casa.png': ['casa', 'lar', 'moradia', 'abrigo', 'residência', 'quarto', 'sala', 'conforto', 'teto'],
    'escola.png': ['escola', 'sala de aula', 'ensino', 'educação', 'colégio', 'universidade', 'faculdade', 'curso', 'aluno'],

    // --- Humanas e Sociais (História, Política, Filosofia) ---
    'historia.png': ['história', 'passado', 'antiguidade', 'idade média', 'século', 'memória', 'civilização', 'museu'],
    'guerra.png': ['guerra', 'batalha', 'conflito', 'revolução', 'soldado', 'armas', 'exército', 'trincheira'],
    'politica.png': ['política', 'governo', 'estado', 'democracia', 'voto', 'eleição', 'presidente', 'poder', 'cidadão'],
    'direito.png': ['lei', 'justiça', 'direito', 'constituição', 'juiz', 'advogado', 'regra', 'norma', 'crime'],
    'filosofia.png': ['filosofia', 'pensamento', 'razão', 'ética', 'moral', 'sabedoria', 'sócrates', 'platão', 'ideia'],
    'religiao.png': ['religião', 'fé', 'deus', 'igreja', 'espiritualidade', 'sagrado', 'crença', 'oração', 'bíblia'],

    // --- Ciências Exatas (Matemática, Física, Química) ---
    'matematica.png': ['matemática', 'número', 'cálculo', 'soma', 'divisão', 'lógica', 'equação', 'álgebra'],
    'geometria.png': ['geometria', 'triângulo', 'círculo', 'quadrado', 'ângulo', 'forma', 'polígono', 'pitágoras'],
    'fisica.png': ['física', 'energia', 'força', 'velocidade', 'inércia', 'movimento', 'newton', 'einstein', 'gravidade'],
    'quimica.png': ['química', 'reação', 'substância', 'mistura', 'tabela periódica', 'elemento', 'ácido', 'laboratório'],
    'atomo.png': ['átomo', 'molécula', 'elétron', 'próton', 'nêutron', 'partícula', 'nuclear', 'radioatividade'],

    // --- Biologia e Saúde (Especificado conforme treinamento) ---
    'dna.png': ['dna', 'genética', 'gene', 'hereditariedade', 'cromossomo', 'clone', 'mutação'],
    'celula.png': ['célula', 'microscópio', 'núcleo', 'membrana', 'mitocôndria', 'biologia'],
    'anatomia.png': ['anatomia', 'corpo humano', 'órgão', 'ossos', 'esqueleto', 'pele', 'músculo', 'sangue'],
    'cerebro.png': ['cérebro', 'mente', 'neurônio', 'pensar', 'inteligência', 'memória', 'raciocínio', 'cabeça'],
    'coracao.png': ['coração', 'cardíaco', 'pulsação', 'veia', 'artéria', 'circulação', 'amor'],
    'virus.png': ['vírus', 'bactéria', 'microrganismo', 'infecção', 'gripe', 'contágio', 'epidemia', 'parasita'],
    'hospital.png': ['hospital', 'médico', 'enfermeira', 'clínica', 'cirurgia', 'uti', 'emergência', 'ambulância'],
    'remedio.png': ['remédio', 'medicamento', 'vacina', 'comprimido', 'farmácia', 'cura', 'tratamento', 'terapia'],

    // --- Tecnologia e Programação ---
    'robo.png': ['robô', 'ia', 'inteligência artificial', 'bot', 'automação', 'futuro', 'máquina', 'ciborgue'],
    'computador.png': ['computador', 'pc', 'notebook', 'hardware', 'processador', 'mouse', 'teclado', 'tela'],
    'codigo.png': ['código', 'programação', 'software', 'algoritmo', 'python', 'java', 'dev', 'script', 'bug'],
    'internet.png': ['internet', 'rede', 'wifi', 'web', 'online', 'conexão', 'site', 'navegador', 'nuvem'],
    'celular.png': ['celular', 'smartphone', 'aplicativo', 'app', 'mensagem', 'notificação', 'touch'],
    'seguranca.png': ['segurança', 'hacker', 'senha', 'proteção', 'firewall', 'vírus de computador', 'cibersegurança'],

    // --- Economia e Negócios ---
    'dinheiro.png': ['dinheiro', 'moeda', 'dólar', 'real', 'nota', 'banco', 'pagamento', 'pix', 'caixa'],
    'grafico.png': ['gráfico', 'estatística', 'porcentagem', 'crescimento', 'lucro', 'prejuízo', 'dados', 'análise'],
    'mercado.png': ['mercado', 'bolsa de valores', 'ações', 'investimento', 'empresa', 'negócio', 'comércio', 'venda'],
    'bitcoin.png': ['bitcoin', 'criptomoeda', 'blockchain', 'digital', 'token', 'nft', 'carteira digital'],
    'trabalho.png': ['trabalho', 'emprego', 'profissão', 'carreira', 'escritório', 'chefe', 'funcionário', 'rh'],

    // --- Cultura, Lazer e Identidade ---
    'livro.png': ['livro', 'leitura', 'página', 'capítulo', 'texto', 'escrita', 'autor', 'biblioteca', 'literatura'],
    'musica.png': ['música', 'canção', 'som', 'ritmo', 'melodia', 'instrumento', 'cantor', 'banda', 'show'],
    'arte.png': ['arte', 'pintura', 'quadro', 'escultura', 'desenho', 'artista', 'cor', 'criatividade'],
    'filme.png': ['filme', 'cinema', 'vídeo', 'série', 'ator', 'atriz', 'hollywood', 'pipoca', 'tela'],
    'comida.png': ['comida', 'alimento', 'refeição', 'jantar', 'almoço', 'lanche', 'nutrição', 'fome', 'sabor'],
    'esporte.png': ['esporte', 'futebol', 'jogo', 'atleta', 'bola', 'competição', 'time', 'ginástica'],
    'emocao.png': ['feliz', 'triste', 'choro', 'riso', 'raiva', 'sentimento', 'emoção', 'ansiedade', 'depressão'],
    'dora.png': ['dora ai', 'amiga virtual', 'sou uma ia', 'ajudante', 'assistente', 'chatbot']
};

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

// Função para mostrar o anúncio do Dora AI 1.3
function mostrarAnuncio() {
    const overlay = document.createElement('div');
    overlay.id = 'anuncio-overlay';
    overlay.className = 'anuncio-overlay';
    
    overlay.innerHTML = `
        <div class="anuncio-container">
            <h2>Apresentamos o Dora AI 1.3</h2>
            <video src="img-IA/anuncio.mp4" autoplay muted playsinline loop class="anuncio-video"></video>
            <div class="anuncio-texto">
            <ul>
                    <li>Gera imagens junto com as respostas</li>
                    <li>Mil novos treinamentos</li>
                    <li>Design claro, e mais suave</li>
                    <li>Nas atualizações futuras, o Dora AI ficará ainda mais inteligente!</li>
                </ul>

            </div>
            <div class="anuncio-botoes">
                <button onclick="fecharAnuncio()">Fechar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

// Função para fechar o anúncio
function fecharAnuncio() {
    const overlay = document.getElementById('anuncio-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Função para testar o Dora AI 1.3
function testarDoraAI() {
    fecharAnuncio();
    // Inicia o jogo normalmente
    setTimeout(mostrarBoasVindas, 500); // Espera 500ms para aparecer suavemente
    iniciarCarrossel(); // Inicia o carrossel automático
}


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
        const imagemAssociada = encontrarImagem(mensagem);
        
        historicoConversa.push({ tipo: 'bot', texto: resposta });
        
        adicionarMensagem(resposta, 'bot', imagemAssociada); // ✅ Agora chama a função correta
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
        const imagemAssociada = encontrarImagem(texto);
        historicoConversa.push({ tipo: 'bot', texto: resposta });
        
        adicionarMensagem(resposta, 'bot', imagemAssociada); // ✅ Agora chama a função correta
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
    // Rolagem automática para a última mensagem
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
        return `Desculpe, meu dono não me treinou para esse tipo de pergunta 😬 Estou sempre aprendendo algo novo, até o momento fui treinado com mais de **${numeroTreinamentos}** treinamentos. Daqui a uma semana, estarei com mais de **2 mil** treinamentos novos, e provavelmente a sua pergunta estará lá 😎 No que mais posso te ajudar? 😁`;
    }
}

function encontrarImagem(mensagemUsuario) {
    mensagemUsuario = mensagemUsuario.toLowerCase();
    
    // Separa palavras-chave da mensagem
    const palavrasUsuario = mensagemUsuario.split(/\W+/).filter(Boolean);
    
    // Procura imagem com base nas palavras-chave
    for (let imagem in bancoImagens) {
        const tags = bancoImagens[imagem];
        
        for (let palavra of palavrasUsuario) {
            if (tags.includes(palavra)) {
                return imagem; // Retorna a primeira imagem encontrada
            }
        }
    }
    
    return null; // Nenhuma imagem encontrada
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

function adicionarMensagem(texto, tipo, imagemNome = null) {
    const chatBox = document.getElementById('chat-box');
    const div = document.createElement('div');
    div.className = `mensagem ${tipo}`;
    
    if (tipo === 'bot') {
        // Remove formatação HTML para o texto puro
        const textoSemHTML = texto.replace(/<[^>]*>/g, '');
        
        let htmlCompleto = texto;
        
        // Se tiver imagem, adiciona com animação de carregamento
        if (imagemNome) {
            htmlCompleto += `<br><div class="imagem-container">
                <div class="carregando-imagem">
                    <div class="spinner"></div>
                    <span class="texto-carregamento">Gerando imagem...</span>
                </div>
            </div>`;
            
            // Após 1.5 segundos, mostra a imagem
            setTimeout(() => {
                const imagemContainer = div.querySelector('.imagem-container');
                if (imagemContainer) {
                    imagemContainer.innerHTML = `
                        <img src="img-IA/${imagemNome}" alt="Imagem relacionada" class="imagem-resposta" id="img-${Date.now()}">
                    `;
                }
            }, 1500); // 1.5 segundos
        }
        
        // Botões de copiar e baixar
        htmlCompleto += '<div class="botoes-mensagem">';
        htmlCompleto += `<button class="copiar-btn" onclick="copiarTexto('${textoSemHTML.replace(/'/g, "\\'")}')">Copiar</button>`;
        
        if (imagemNome) {
            htmlCompleto += `<button class="baixar-btn" onclick="baixarImagem('img-IA/${imagemNome}')">Baixar Imagem</button>`;
        }
        
        htmlCompleto += '</div>';
        div.innerHTML = htmlCompleto;
    } else {
        div.innerHTML = texto;
    }
    
    chatBox.appendChild(div);
    // Rolagem automática para a última mensagem
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Função para baixar imagem com marca d'água
function baixarImagem(srcImagem) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.crossOrigin = 'Anonymous';
    img.src = srcImagem;
    
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Desenha a imagem original
        ctx.drawImage(img, 0, 0);
        
        // Desenha a marca d'água no canto inferior direito
        const marca = new Image();
        marca.src = 'img-IA/marca-dagua.png';
        
        marca.onload = function() {
            const larguraMarca = 50; // Tamanho da marca d'água
            const alturaMarca = 50 * (marca.height / marca.width); // Proporcional
            
            ctx.globalAlpha = 0.7; // Transparência
            ctx.drawImage(marca, canvas.width - larguraMarca - 10, canvas.height - alturaMarca - 10, larguraMarca, alturaMarca);
            ctx.globalAlpha = 1.0; // Volta à opacidade normal
            
            // Baixa a imagem
            const link = document.createElement('a');
            link.download = 'gerado-por-IA.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        };
    };
}

function copiarTexto(texto) {
    const textoCompleto = texto + '\n\nRESPOSTA GERADA POR IA - RESPOSTA GERADA PELA DORA AI - NÃO USAR ESSA RESPOSTA EM TRABALHOS - DIREITOS AUTORAIS';
    
    navigator.clipboard.writeText(textoCompleto).then(() => {
        alert('Resposta copiada com aviso de direitos autorais!');
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
    // Rolagem automática para a última mensagem
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Carrega treinamentos
fetch('training.json')
    .then(response => response.json()) 
    .then(data => {
        treinamentos = data;
    })
    .catch(error => console.error('Erro ao carregar treinamentos:', error));

// Inicia o jogo
window.addEventListener('load', () => {
    mostrarAnuncio(); // Mostra o anúncio do Dora AI 1.3
});