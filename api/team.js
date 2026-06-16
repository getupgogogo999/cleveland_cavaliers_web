import { apiHandler } from '../server/api-utils.js';
import { getTeam } from '../server/shared.js';

export default apiHandler(getTeam);
