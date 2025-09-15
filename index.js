const app = require('./app');
const sequelize = require('./db'); 

const port = 5000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); 
    console.log('✅ DB connected');

    app.listen(port, () => {
      console.log('🚀 Server started and listening on port ' + port);
    });

  } catch (error) {
    console.error('❌ DB connection error:', error.message);
  }
})();
