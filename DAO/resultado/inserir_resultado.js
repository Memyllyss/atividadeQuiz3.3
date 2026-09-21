import { conexao } from '../conexao.js'

// Insere o resultado de uma partida do quiz na tbl_resultado
async function inserirResultado({ nome, princesa, pontos }) {
    const sql = `INSERT INTO tbl_resultado
        (nome_jogador, princesa, pts_elsa, pts_moana, pts_tiana, pts_merida, pts_rapunzel, pts_ariel)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

    const valores = [
        nome, princesa,
        pontos.elsa, pontos.moana, pontos.tiana,
        pontos.merida, pontos.rapunzel, pontos.ariel
    ]

    const conn = await conexao()
    try {
        const [results] = await conn.query(sql, valores)
        return results
    } finally {
        await conn.end()
    }
}

export { inserirResultado }
