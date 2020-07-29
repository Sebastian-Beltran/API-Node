const express = require('express');
const app = express();
const morgan = require('morgan');

//Config

app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)


// middleware

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Rutas

app.use(require('./routes/index'));


app.listen(3000, () => {
    console.log(`Servidor en puerto ${app.get('port')}`);
})