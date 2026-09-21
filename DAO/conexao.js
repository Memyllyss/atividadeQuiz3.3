import mysql from "mysql2/promise"

// Ajuste os dados abaixo para o seu MySQL (ou use variáveis de ambiente)
async function conexao() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || "127.0.0.1",
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "1234",
        database: process.env.DB_NAME || "db_quiz"
    })
    return pool
}

async function closeConexao(pool) {
    if (pool) {
        console.log("Fechando a conexão com o banco de dados")
        await pool.end()
    } else {
        console.log("Conexão já fechada")
    }
}

async function testarConexao() {
    try {
        const pool = await conexao()
        const conn = await pool.getConnection()
        await conn.ping()
        console.log("✅ Conexão com o MySQL bem-sucedida!")
        conn.release()
        await pool.end()
    } catch (erro) {
        console.error("❌ Falha ao conectar com o MySQL:", erro.message)
    }
}

export { conexao, closeConexao, testarConexao }
