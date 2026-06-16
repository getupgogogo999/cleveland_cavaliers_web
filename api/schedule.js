import { apiHandler } from '../server/api-utils.js';
import { getSchedule } from '../server/shared.js';

export default apiHandler(getSchedule);
