const router = require('express').Router();
const Appointment = require('../models/Appointment');
const auth = require('../middlewares/auth');
const getWeather = require('../utils/weather');

// Listar agendamentos do usuário com alerta de clima
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id }).populate('patient', 'name email');

    const appointmentsWithWeather = await Promise.all(
      appointments.map(async (appt) => {
        if (appt.address) {
          const city = appt.address.split(',').pop().trim(); // pega cidade do endereço
          const weatherInfo = await getWeather(city);
          return { ...appt.toObject(), weatherInfo };
        }
        return appt;
      })
    );

    res.json(appointmentsWithWeather);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar agendamentos' });
  }
});

// Criar novo agendamento
router.post('/', auth, async (req, res) => {
  try {
    const { date, time, address, notes } = req.body;

    // Verificar conflito de horário
    const conflict = await Appointment.findOne({ date, time });
    if (conflict) return res.status(400).json({ message: 'Horário já ocupado' });

    const newAppointment = new Appointment({
      patient: req.user.id,
      date,
      time,
      address,
      notes
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Agendamento criado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar agendamento' });
  }
});

module.exports = router;
