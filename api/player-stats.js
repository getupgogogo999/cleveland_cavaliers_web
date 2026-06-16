import { apiHandler } from '../server/api-utils.js';
import { getPlayerStats } from '../server/shared.js';

export default apiHandler(getPlayerStats);
