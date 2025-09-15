// routes/auth.js
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registro
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'patient'
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      token
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
