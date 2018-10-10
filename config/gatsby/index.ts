import dotenv from 'dotenv';
import metadata from '../../package.json';

dotenv.config();
const {env} = process;

export {env, metadata};
export {writeGraphQLSchema} from './graphql';
