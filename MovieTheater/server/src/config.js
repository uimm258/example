require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://axiao@localhost/axiao',
  API_TOKEN: process.env.API_TOKEN || '143891f9-9ace-49d9-9a4a-5123d3809ff3',
  JWT_SECRET: process.env.JWT_SECRET || 'jwt-secret'
};
