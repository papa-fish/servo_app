require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
app.set('view engine', 'ejs')
app.use(express.static('client'))

const apiRouter = require('./routes/servos')

app.get('/', (req, res) => {
    res.render('home')
})

app.use('/api', apiRouter)

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
});