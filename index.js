const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello from users api!')
})

app.listen(port, () => {
    console.log(`Users api listening on port ${port}`)
})