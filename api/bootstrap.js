import { apiHandler } from '../server/api-utils.js';
import { getBootstrap } from '../server/shared.js';

export default apiHandler(getBootstrap);
