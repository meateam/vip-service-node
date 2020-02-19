const mongoHost : string = process.env.VIP_MONGO_HOST || 'localhost';
const dbName : string = process.env.VIP_DB_NAME || 'vipDB';

export const mongoConnectionString : string =
  process.env.VIP_CONN_STRING || `mongodb://${mongoHost}:27017/${dbName}`;

export const port: number = +(process.env.PORT || 8080);
export const connectionRetries: number = +(process.env.CONN_RETRIES || 5);
export const reconnectTimeout: number = +(process.env.RETRY_TIMEOUT || 100);
