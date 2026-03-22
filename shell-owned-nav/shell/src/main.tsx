import './styles.css';

// Bootstrap: eagerly load MFE route registrations before rendering
// so the nav is fully populated on first paint — no flicker
async function bootstrap() {
  const results = await Promise.allSettled([
    import('mfe_dashboard/register'),
    import('mfe_profile/register'),
  ]);

  const [dashboardResult, profileResult] = results;

  if (dashboardResult.status === 'fulfilled') {
    dashboardResult.value.registerRoutes();
  } else {
    console.warn('[shell] mfe_dashboard/register failed to load:', dashboardResult.reason);
  }

  if (profileResult.status === 'fulfilled') {
    profileResult.value.registerRoutes();
  } else {
    console.warn('[shell] mfe_profile/register failed to load:', profileResult.reason);
  }

  const { createRoot } = await import('react-dom/client');
  const { default: App } = await import('./App');

  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('#root element not found');
  createRoot(rootElement).render(<App />);
}

bootstrap().catch((err) => {
  console.error('[shell] Fatal bootstrap error:', err);
});
