import { apiHandler } from '../server/api-utils.js';
import { getVideos } from '../server/shared.js';

export default apiHandler(getVideos);
