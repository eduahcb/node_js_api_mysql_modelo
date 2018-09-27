app = require('./config/server')();

app.listen(process.env.PORT, (req, res) => {
    console.log('servidor rodando na porta 3000');
});