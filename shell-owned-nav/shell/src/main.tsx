import './styles.css';

// Bootstrap: eagerly load MFE route registrations before rendering
// so the nav is fully populated on first paint — no flicker
async function bootstrap() {
  const [
    { registerRoutes: registerDashboard },
    { registerRoutes: registerProfile },
  ] = await Promise.all([
    import('mfe_dashboard/register'),
    import('mfe_profile/register'),
  ]);

  registerDashboard();
  registerProfile();

  const { createRoot } = await import('react-dom/client');
  const { default: App } = await import('./App');

  createRoot(document.getElementById('root')!).render(<App />);
}

bootstrap();
