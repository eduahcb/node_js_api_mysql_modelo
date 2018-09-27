const mysql = require('mysql2/promise');

exports.get = async () => {
    const conn = await mysql.createConnection(global.config);
    const [rows] = await conn.execute('select * from produto');
    return rows;
}

exports.getId = async (id) => {
    const conn = await mysql.createConnection(global.config);
    const [rows] = await conn.execute('select * from produto where id = ?', [id]);
    return rows;
}

exports.post = async (produto) => {
    const conn = await mysql.createConnection(global.config);
    const [rows] = await conn.execute(`insert into produto (nome, descricao) values(?,?)`,
        [produto.nome, produto.descricao]);
    return rows;
}

exports.delete = async (id) => {
    const conn = await mysql.createConnection(global.config);
    const [rows] = await conn.execute(`delete from produto where id = ?`, [id]);
    return rows;
}

exports.put = async (produto) => {
    const conn = await mysql.createConnection(global.config);
    const [rows] = await conn.execute(`update produto 
                                        set nome = ?, descricao = ? 
                                        where id = ?`,
        [produto.nome, produto.descricao, produto.id]);
    return rows;
}