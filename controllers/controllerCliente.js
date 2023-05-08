const cliente = require('../models/cliente');
const controller = {}

controller.getAll = async (req, res) => {
    try{
        let clientes = await cliente.findAll()
        res.status(200).json(clientes)
    }catch(error){
        res.status(500).json(error)
    }
}

controller.getById = async (req, res) => {
    try{
        const cliente = await cliente.findByPk(req.params.id)
        //const clienteX = await cliente.findAll({
        //    where:{
        //        descricao:req.params.palavra
        //    }
        //})
        res.status(200).json()
    }catch(error){ 
        res.status(422).json("Ocorreu um erro ao buscar o item. " + error)
    }
}

controller.create = async (req, res) => {
    let reqcliente = req.body

    try{
        const newcliente = await cliente.create({
            descricao: reqcliente.descricao,
            preco: reqcliente.preco,
            cores: reqcliente.cores
        })
        res.status(200).redirect("/")
    }catch(error){ 
        res.status(422).send("Ocorreu um erro ao cadastrar o item. " + error)
    }

}

controller.update = async (req, res) => {
    try{
        let cliente = await cliente.findByPk(req.params.id)
        cliente.descricao = req.body.descricao
        await cliente.save()
        res.status(200).redirect("/")
    }catch (error){
        res.status(422).send("Ocorreu um erro ao atualizar o item. " + error)
    }
}

controller.delete = async (req, res) => {
    
}

module.exports = controller