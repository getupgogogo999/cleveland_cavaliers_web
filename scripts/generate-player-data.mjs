import { refreshPlayerDataFile } from '../server/shared.js';

try {
  const players = await refreshPlayerDataFile();
  console.log(`Updated players.json (${players.length} players)`);
} catch (err) {
  console.warn('Player data refresh skipped:', err.message);
}
