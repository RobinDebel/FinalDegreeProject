import dotenv from 'dotenv';

dotenv.config();

const config = {

    server: {
        port: process.env.PORT || 5000
    },
    session: {
        secret: process.env.SESSION_SECRET ||'ThisisNotAGoodSecret'
    }
    

};

export default config;