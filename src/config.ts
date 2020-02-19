const mongoHost : string = process.env.VIP_MONGO_HOST || 'localhost';
const dbName : string = process.env.VIP_DB_NAME || 'vipDB';

export const mongoConnectionString : string =
  process.env.VIP_CONN_STRING || `mongodb://${mongoHost}:27017/${dbName}`;

export const port = process.env.VIP_PROT || '8080';
