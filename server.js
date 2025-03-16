const express = require('express');
const path = require('path');
const app = express();
const EventEmitter = require('events');
const emitirEvento = new EventEmitter();


//Para cargar imagenes
app.use(express.static(path.join(__dirname, 'public')));

//Para poder recibir datos JSON
app.use(express.json());

//Ruteo de la app
app.get('/', (req, res) => {
    emitirEvento.emit('routeAccessed', '/');
    res.sendFile(path.join(__dirname, 'pages', 'home.html'));
});

app.get('/home', (req, res) => {
    emitirEvento.emit('routeAccessed', '/home');
    res.sendFile(path.join(__dirname, 'pages', 'home.html'));
});

app.get('/notas', (req, res) => {
    emitirEvento.emit('routeAccessed', '/notas');
    res.sendFile(path.join(__dirname, 'pages', 'notas.html'));
});

//Test del emisor de eventos
const rutaActual = (route) => {
    console.log(`El usuario ha accedido a: ${route}`);
};
emitirEvento.on('routeAccessed', rutaActual);

//Funciones de la app

// Ruta para obtener los datos guardados
app.get('/datos', (req, res) => {
    res.json({ notas, ponderaciones });
  });
  
  // Ruta para reiniciar los datos
  app.post('/reiniciar', (req, res) => {
    notas = [];
    ponderaciones = [];
    res.send('Datos reiniciados');
  });
  
  // Ruta para guardar los datos
  app.post('/guardar', (req, res) => {
    const { nota, ponderacion } = req.body;
    notas.push(parseFloat(nota));
    ponderaciones.push(parseFloat(ponderacion));
    res.send('Datos guardados');
  });
  
  // Ruta para calcular la nota final
  app.get('/calcular', (req, res) => {
    let sumaPonderada = 0;
    let sumaPonderaciones = 0;
  
    for (let i = 0; i < notas.length; i++) {
      sumaPonderada += notas[i] * ponderaciones[i];
      sumaPonderaciones += ponderaciones[i];
    }
  
    const notaFinal = sumaPonderada / sumaPonderaciones;
    res.json({ notaFinal });
  });

//Servir en el puerto 3000
const server = app.listen(3000, () => {
    console.log(`El servidor esta corriendo en el puerto ${server.address().port}`);
});