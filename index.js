const express = require('express');
const app = express();
const ipc = require('./ipcModule');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('appName', 'Inflation calculator');
app.set('port', '3000');

// Middlewares
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

//Routes
app.post('/api', (req, res) => {
    const datos = req.body;

    if (ipc.validateData(datos)) {
        const datosRes = { precio: ipc.calculatePrice(datos) };
        res.status(200).json(datosRes);
    } else
        res.status(400).send({
            message: 'This is an error!',
        });
});

app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log('Server on port', app.get('port'));
});
