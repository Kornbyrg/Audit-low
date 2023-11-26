const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/saveNetworkInfo', (req, res) => {
  const networkInfo = req.body;
  // Отримайте інформацію про мережу та збережіть її на сервері
  console.log('Отримано дані про мережу:', networkInfo);
  // Тут ви можете зберігати дані у базі даних або файлі
  res.status(200).json({ message: 'Дані успішно отримано та збережено.' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});

app.get('/getPublicIP', (req, res) => {
    // Logic to get public IP
    const publicIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.json({ ip: publicIP });
  });
  