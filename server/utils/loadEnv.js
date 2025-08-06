// loadEnv.js
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const myEnv = dotenv.config({ path: './.env' });
dotenvExpand.expand(myEnv);
