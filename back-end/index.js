const express = require('express');
const usersControllers = require('./controllers/usersControllers');
// const loginControllers = require('./controllers/loginControllers');

const app = express();
app.use(express.json());

const PORT = 3000;

app.use('/users', usersControllers);
// app.use('/login', loginControllers);

app.listen(PORT, () => console.log(`Servidor online na porta ${PORT}`));
