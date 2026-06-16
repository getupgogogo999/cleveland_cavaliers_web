import { apiHandler } from '../server/api-utils.js';
import { getNews } from '../server/shared.js';

export default apiHandler(getNews);
