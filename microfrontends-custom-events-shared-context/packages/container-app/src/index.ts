import express from 'express';
import path from 'path';
import { AppContext } from 'shared-types';

const app = express();
const PORT = 4000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve microfrontend bundles
app.use('/mf-product', express.static(path.join(__dirname, '../../microfrontend-product/dist')));
app.use('/mf-cart', express.static(path.join(__dirname, '../../microfrontend-cart/dist')));

// API endpoint for shared context
app.get('/api/context', (_req, res) => {
  const context: AppContext = {
    user: {
      isLoggedIn: true,
      name: 'Jane Doe'
    }
  };
  res.json(context);
});

app.listen(PORT, () => {
  console.log(`Container app running on http://localhost:${PORT}`);
});