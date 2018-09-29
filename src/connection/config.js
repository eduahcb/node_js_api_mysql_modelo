let config;

if(process.env.DATABASE == 'production'){

    config = {
        host: 'localhost',
        user: 'root',
        password : 'edu123',
        database : 'mysql_teste'
    }
}

module.exports = () => global.config = config;