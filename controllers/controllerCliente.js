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
    try {
      const clienteId = req.params.id;
  
      const clientex = await cliente.findByPk(clienteId);
  
      if (!clientex) {
        return res.status(404).json({ message: 'Cliente não encontrado.' });
      }
  
      res.status(200).json(clientex);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocorreu um erro ao buscar o cliente.' });
    }
  };

controller.buscarPorCidade = async (req, res) => {
  const { cidade } = req.query;
  try {
    const clientes = await cliente.findAll({ where: { cidade } });
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar os clientes' });
  }
}

controller.criar =  async (req, res) => {
    try {
      const { nome, email, cidade, estado, cep } = req.body;
  
      const novoCliente = await cliente.create({
        nome,
        email,
        cidade,
        estado,
        cep
      });
  
      res.status(201).json(novoCliente);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
};

controller.atualizar = async (req, res) => {
  try {
    const clienteId = req.params.id;

    const { nome, email, cidade, estado, cep } = req.body;

    const [rowsUpdated] = await cliente.update(
      {
        nome,
        email,
        cidade,
        estado,
        cep
      },
      {
        where: { id: clienteId }
      }
    );

    if (rowsUpdated === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    res.status(200).json({ message: 'Cliente atualizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao atualizar o cliente.' });
  }
};

controller.excluir = async (req, res) => {
  try {
    const clienteId = req.params.id;

    const clienteDelete = await cliente.findByPk(clienteId);

    if (!clienteDelete) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    await cliente.destroy({
      where: { id: clienteId }
    });

    res.status(200).json({ message: 'Cliente excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao excluir o cliente.' });
  }
};

module.exports = controller