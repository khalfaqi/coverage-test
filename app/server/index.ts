import express from 'express';
import path from 'path';
import authController from '../controller/Login_with_username_and_password/authController.js';

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

app.use(express.json());
app.use('/api', authController);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

if (process.env.NODE_ENV === 'production') {
  const clientDist = path.resolve('client', 'dist');
  app.use(express.static(clientDist));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[server] Running on http://localhost:${PORT}`);
  console.log(`[server] Mock DB: ${process.env.USE_MOCK_DB ?? 'true'}`);
});

export default app;
