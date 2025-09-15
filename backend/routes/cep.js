const router = require('express').Router();
const axios = require('axios');

// Buscar endereço via CEP
router.get('/:cep', async (req, res) => {
  const { cep } = req.params;

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    
    if (response.data.erro) {
      return res.status(404).json({ message: 'CEP não encontrado' });
    }

    res.json(response.data); // retorna logradouro, bairro, cidade, uf...
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao consultar CEP' });
  }
});

module.exports = router;
