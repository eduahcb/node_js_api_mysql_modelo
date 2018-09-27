module.exports = (app) => {

    const produto = require('../controllers/ProdutoController');

    app.get('/produtos', (req, res) => produto.get(req, res));

    app.get('/produtos/:id', (req, res) => produto.getId(req, res));

    app.post('/produtos', (req, res) => produto.post(req, res));

    app.delete('/produtos/:id', (req, res) => produto.delete(req, res));

    app.put('/produtos/:id', (req, res) => produto.put(req,res));
}