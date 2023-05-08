const cliente = require('../models/cliente');
const controller = {}

controller.listarTodos = async (req, res) => {
    try{
        let clientes = await cliente.findAll()
        res.status(200).json(clientes)
    }catch(error){
        res.status(500).json(error)
    }
}

controller.buscarPorId = async (req, res) => {
    try{
        const clienteX = await cliente.findAll({
            where:{
                descricao:req.params.palavra
            }
        })
        res.status(200).json(clienteX)
    }catch(error){ 
        res.status(422).json("Ocorreu um erro ao buscar o item. " + error)
    }
}

controller.buscarPorCidade = async (req, res) => {
    const { cidade } = req.query;
  
    try {
      const clientes = await cliente.findAll({ where: { cidade } });
      if (clientes.length > 0) {
        res.status(200).json(clientes);
      } else {
        res.status(404).json({ message: 'Nenhum cliente encontrado para esta cidade.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocorreu um erro ao buscar os clientes.' });
    }
  };

controller.criar = async (req, res) => {
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

controller.atualizar = async (req, res) => {
    try{
        let cliente = await cliente.findByPk(req.params.id)
        cliente.descricao = req.body.descricao
        await cliente.save()
        res.status(200).redirect("/")
    }catch (error){
        res.status(422).send("Ocorreu um erro ao atualizar o item. " + error)
    }
}

controller.excluir = (req,res)=>{
    lista.splice(req.params.id-1,1)
    res.status(200).send("Deletado")
    
}

module.exports = controller