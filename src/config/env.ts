import dotenv from 'dotenv';

dotenv.config();
const {env = {}} = typeof process === 'undefined' ? {} : process;

export {env};
