const express = require('express');
const bodyParser = require('body-parser');
const screenshotRoutes = require('./routes/screenshot');

const app = express();
app.use(bodyParser.json());

app.use('/', screenshotRoutes);

const PORT = 5050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
