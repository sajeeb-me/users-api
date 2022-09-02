const express = require('express')
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello from users api!')
})

app.all('*', (req, res) => {
    res.send('No route found')
})

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Users api listening on port ${port}`)
})

process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    app.close(() => {
        process.exit(1);
    });
});