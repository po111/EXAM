import mongoose from 'mongoose';


async function initDatabase() {
    const dbUrl = `mongodb://localhost:27017`;
    const dbName = 'ride_db';

    try {
        await mongoose.connect(dbUrl, {dbName});

        console.log('Db connected successfulllly');
    } catch(err) {
        console.log('Db connection failed!');
        console.log(err.message);
    }
}

export default initDatabase;