import { Server } from './server';
import * as mongoose from 'mongoose';
import { mongoConnectionString, connectionRetries, reconnectTimeout } from './config';

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

async function initMongo() {
    const db = mongoose.connection;
    console.log(`connecting to ${mongoConnectionString}`);
    startConnectionAttempts();

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

async function startConnectionAttempts() {
    console.log(`connecting to ${mongoConnectionString}`);

    for (let i = 1; i <= connectionRetries; i++) {
        let connectionRes: { success: boolean, error: Error } = await connect();
        if (!connectionRes.success) {
            console.log(`mongo connection retry (${i}/${connectionRetries})`);
            await sleep(reconnectTimeout);
            connectionRes = await connect();
        } else {
            console.log(`connected to ${mongoConnectionString}`);
            break;
        }
    }

}

async function connect(): Promise<{ success: boolean, error: Error }> {
    let success: boolean = false;
    let error: Error = new Error();
    await mongoose.connect(
        mongoConnectionString,
        { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true },
        async (err) => {
            if (!err) {
                success = true;
            } else {
                success = false;
                error = err;
            }
        });
    return { success, error };
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// *******************************************************************************************//
// ************************************** main function **************************************//
// *******************************************************************************************//
(async () => {
    console.log('Starting server');
    const server: Server = new Server();
    await initMongo();

    server.app.on('close', () => {
        console.log('Server closed');
    });
})();
