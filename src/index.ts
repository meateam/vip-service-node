import { Server } from './server';
import * as mongoose from 'mongoose';
import { mongoConnectionString } from './config';

process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err.stack);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection', err);
    process.exit(1);
});

process.on('SIGINT', async () => {
    console.log('User Termination');
    process.exit(0);
});

(async () => {
    console.log('Starting server');
    const server: Server = new Server();
    await initMongo();

    server.app.on('close', () => {
        console.log('Server closed');
    });
})();

async function initMongo() {
    const db = mongoose.connection;
    console.log(`connecting to ${mongoConnectionString}`);

    await mongoose.connect(
        mongoConnectionString,
        { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true },
        async (err) => {
            if (err) {
                console.log('error wile connecting to mongo!');
                console.log(err);
            } else {
                console.log('connect success!');
            }
        });

    db.on('connected', () => {
        console.log('connected!');
    });
    db.on('error', (err) => {
        console.log('error!');
        console.log(err);
    });
    db.on('disconnected', () => {
        console.log('disconnected!');
    });
}
