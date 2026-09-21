import { conexao } from '../conexao.js'

// Lista os resultados salvos (usado para conferir se gravou)
async function buscarResultados() {
    const conn = await conexao()
    try {
        const [rows] = await conn.query(`SELECT * FROM tbl_resultado ORDER BY id DESC`)
        return rows
    } finally {
        await conn.end()
    }
}

export { buscarResultados }
