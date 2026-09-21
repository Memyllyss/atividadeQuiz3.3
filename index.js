import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import { inserirResultado } from './DAO/resultado/inserir_resultado.js'
import { buscarResultados } from './DAO/resultado/buscar_resultado.js'
import { testarConexao } from './DAO/conexao.js'

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Lê o corpo (body) das requisições em JSON
app.use(express.json())

// CORS simples: permite o quiz chamar a API mesmo se aberto por outra porta (ex: Live Server)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    if (req.method === 'OPTIONS') return res.sendStatus(204)
    next()
})

// Serve o quiz em http://localhost:3000
app.use(express.static(path.join(__dirname, 'QuizPricesasVersao1')))

const PRINCESAS = ['elsa', 'moana', 'tiana', 'merida', 'rapunzel', 'ariel']

// CONSULTAR (GET) - ver o que foi salvo
app.get('/resultado', async (req, res) => {
    try {
        res.json(await buscarResultados())
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao listar resultados', detalhes: erro.message })
    }
})

// INCLUSÃO (POST) - salva o resultado do quiz
app.post('/resultado', async (req, res) => {
    try {
        const { nome, princesa, pontos } = req.body

        if (!princesa || !PRINCESAS.includes(princesa)) {
            return res.status(400).json({ erro: 'Princesa vencedora inválida ou ausente.' })
        }
        if (!pontos || typeof pontos !== 'object') {
            return res.status(400).json({ erro: 'O campo pontos é obrigatório.' })
        }

        // Garante números inteiros para todas as princesas (padrão 0)
        const pontosLimpos = {}
        for (const p of PRINCESAS) {
            pontosLimpos[p] = Number.parseInt(pontos[p]) || 0
        }

        const nomeLimpo = (nome || '').toString().trim().slice(0, 100) || 'Anônimo'

        const resultado = await inserirResultado({ nome: nomeLimpo, princesa, pontos: pontosLimpos })
        res.status(201).json({ mensagem: 'Resultado salvo com sucesso!', id: resultado.insertId })
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao salvar resultado', detalhes: erro.message })
    }
})

app.listen(3000, () => {
    console.log('🚀 Server is running on http://localhost:3000')
    testarConexao()
})
