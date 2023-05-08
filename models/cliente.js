const DataTypes = require("sequelize");
const db = require("../config/dbconnection")

const cliente = db.define('cliente', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cep:{
        type: DataTypes.STRING,
        allowNull: false,
    }
});

(async () => {
    try {
        await cliente.sync(); //{ force: true }
        console.log('Tabela de cliente criada com sucesso.');

    } catch (error) { 
        console.error('Não foi possível conectar-se ao banco de dados:', error);
    }
})();

module.exports = cliente