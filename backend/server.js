// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas
const authRoutes = require('./routes/auth');
const cepRoutes = require('./routes/cep');
const appointmentRoutes = require('./routes/appointments');

app.use('/api/auth', authRoutes);
app.use('/api/cep', cepRoutes);
app.use('/api/appointments', appointmentRoutes);

// Conexão MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sistema_clinica';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('❌ Erro ao conectar MongoDB:', err.message));

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend rodando em http://localhost:${PORT}`));
