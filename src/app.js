const fs = require('fs');
const path = require('path');
const express = require('express');

const DB_PATH = path.join(__dirname, 'db', 'database.db');
if (!fs.existsSync(DB_PATH)) {
  console.error('Database not found. Run "npm run init-db" first.');
  process.exit(1);
}

const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', employeeRoutes);

app.use((req, res) => res.status(404).render('not-found', { message: 'Page not found.' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal server error');
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
