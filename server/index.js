import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {
  getTeam,
  getSchedule,
  getStandings,
  getRoster,
  getPlayerStats,
  getVideos,
  getNews,
} from './shared.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.NODE_ENV === 'production' ? false : true }));
app.use(express.json());

app.get('/api/team', async (_req, res) => {
  try {
    res.json(await getTeam());
  } catch {
    res.status(500).json({ error: 'Service temporarily unavailable' });
  }
});

app.get('/api/schedule', async (_req, res) => {
  try {
    res.json(await getSchedule());
  } catch {
    res.status(500).json({ error: 'Service temporarily unavailable' });
  }
});

app.get('/api/standings', async (_req, res) => {
  try {
    res.json(await getStandings());
  } catch {
    res.status(500).json({ error: 'Service temporarily unavailable' });
  }
});

app.get('/api/roster', async (_req, res) => {
  try {
    res.json(await getRoster());
  } catch {
    res.status(500).json({ error: 'Service temporarily unavailable' });
  }
});

app.get('/api/player-stats', async (_req, res) => {
  try {
    res.json(await getPlayerStats());
  } catch {
    res.status(500).json({ error: 'Service temporarily unavailable' });
  }
});

app.get('/api/videos', async (_req, res) => {
  try {
    res.json(await getVideos());
  } catch {
    res.status(500).json({ error: 'Service temporarily unavailable' });
  }
});

app.get('/api/news', async (_req, res) => {
  try {
    res.json(await getNews());
  } catch {
    res.status(500).json({ error: 'Service temporarily unavailable' });
  }
});

const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(
    express.static(distPath, {
      maxAge: '1d',
      setHeaders(res, filePath) {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache');
        }
      },
    })
  );
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Cavs Nation server running at http://0.0.0.0:${PORT}`);
});
