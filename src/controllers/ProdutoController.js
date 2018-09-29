const produto = require('../models/ProdutoRepository');

exports.get = async (req, res) => {

    try {
        const result = await produto.get();
        res.status(200).json(result);
    }
    catch (error) {
        console.log(`Ocorreu um erro: ${error}`);
        res.status(500).json(error);
    }
}

exports.getId = async (req, res) => {

    try {
        const id = req.params.id;

        const result = await produto.getId(id);

        res.status(200).json({
            produto: result,
            links: [
                {
                    href: `http:localhost:3000/produtos/${id}`,
                    rel: 'alterar',
                    method: 'PUT'
                },
                {
                    href: `http:localhost:3000/produtos/${id}`,
                    rel: 'deletar',
                    method: 'DELETE'
                }]
        });
    }
    catch (error) {
        console.log(`Ocorreu um erro: ${error}`);
        res.status(500).json(error);
    }
}

exports.post = async (req, res) => {

    try {

        req.check('nome', 'campo obrigatório').isLength({ min: 1 });
        req.check('descricao', 'campo obrigatório').isLength({ min: 1 });

        const err = req.validationErrors();

        if (err) {
            res.status(400).json(err);
            return;
        }

        const dados = req.body;

        const result = await produto.post(dados);

        const id = result.insertId;
        
        res.status(201).json({
            msg: "produto cadastrado",
            links: [
                {
                    href: `http:localhost:3000/produtos/${id}`,
                    rel: 'alterar',
                    method: 'PUT'
                },
                {
                    href: `http:localhost:3000/produtos/${id}`,
                    rel: 'deletar',
                    method: 'DELETE'
                }]
        });
    }
    catch (error) {
        console.log(`Ocorreu um erro: ${error}`);
        res.status(500).json(error);
    }
}

exports.delete = async (req, res) => {

    try {

        const id = req.params.id;

        const result = await produto.delete(id);

        if (result.affectedRows == 0) {
            res.status(404).json({
                msg: "produto não encontrado"
            });
            return;
        }

        res.status(200).json({
            msg: "excluido com sucesso"
        });
    }
    catch (error) {
        console.log(`Ocorreu um erro: ${error}`);
        res.status(500).json(error);
    }
}

exports.put = async (req, res) => {

    try {

        const id = req.params.id;
        const dados = req.body;

        dados.id = id;

        const result = await produto.put(dados);

        if (result.affectedRows == 0) {
            res.status(404).json({
                msg: "produto não encontrado"
            });
            return;
        }

        res.status(200).json({
            msg: "alterado com sucesso",
            produto: dados
        });
    }
    catch (error) {
        console.log(`Ocorreu um erro: ${error}`);
        res.status(500).json({ error });
    }
}