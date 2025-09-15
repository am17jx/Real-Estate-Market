const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routers/userroutes');
const propertyRoutes = require('./routers/Propertyroutes');
const categoryRoutes = require('./routers/categoriesroute')
const tagRoutes = require('./routers/tagrouter')
const app = express();

app.use(bodyParser.json());
app.use('/api/v1', userRoutes);
app.use('/api/v1', propertyRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', tagRoutes);


app.use((req, res) => {
  res.status(404).send({
    message: 'The requested URL could not be found.',
    statusCode: 404,
  });
});

app.use((err, req, res, next) => {
  console.error(' Error:', err.message);
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message,
  });
});

module.exports = app;
