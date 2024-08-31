import * as dotenv from "dotenv"

dotenv.config()

const config = {
    app: {
      port: process.env.DEV_PORT || '3000',
    },
    db: {
      database: process.env.DEV_DATABASE || '',
      dialect: process.env.DEV_DIALECT as any || 'postgres', // Specify the dialect type
      username: process.env.DEV_USERNAME || '',
      password: process.env.DEV_PASSWORD || '',
      host: process.env.DEV_HOST || 'localhost',
      port: parseInt(process.env.DEV_DB_PORT || '5432', 10), // Ensure port is a number
    },
  };
  
  export default config;
  