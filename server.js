// server.js
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 3000;

// Configuração do banco de dados Neon
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Middleware
app.use(express.json());
app.use(express.static('.')); // Serve arquivos estáticos (HTML, CSS, JS)

// Função para inicializar a tabela
async function initTable() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                senha VARCHAR(255) NOT NULL,
                contagem INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    } catch (error) {
        console.error('Erro ao inicializar a tabela:', error);
    }
}

// Inicializa a tabela ao iniciar o servidor
initTable();

// Rota para login/criar conta/matar mosquito
app.post('/api/contar-mosquitos', async (req, res) => {
    const { email, senha, acao } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    try {
        if (acao === 'login') {
            const result = await pool.query(
                'SELECT email, contagem FROM usuarios WHERE email = $1 AND senha = $2',
                [email, senha]
            );

            if (result.rows.length > 0) {
                return res.status(200).json(result.rows[0]);
            } else {
                return res.status(401).json({ error: 'Email ou senha incorretos' });
            }
        } else if (acao === 'criarConta') {
            const result = await pool.query(
                'INSERT INTO usuarios (email, senha, contagem) VALUES ($1, $2, 0) RETURNING email, contagem',
                [email, senha]
            );

            return res.status(200).json(result.rows[0]);
        } else if (acao === 'matarMosquito') {
            const result = await pool.query(
                'UPDATE usuarios SET contagem = contagem + 1 WHERE email = $1 RETURNING email, contagem',
                [email]
            );

            if (result.rows.length > 0) {
                return res.status(200).json(result.rows[0]);
            } else {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
        } else if (acao === 'getContador') {
            const result = await pool.query(
                'SELECT contagem FROM usuarios WHERE email = $1',
                [email]
            );

            if (result.rows.length > 0) {
                return res.status(200).json(result.rows[0]);
            } else {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
        }

        return res.status(400).json({ error: 'Ação inválida' });
    } catch (error) {
        console.error('Erro na API:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});