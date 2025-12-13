import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Check maintenance status function
  const checkMaintenance = useCallback(async () => {
    try {
      const res = await fetch('/api/maintenance');
      const data = await res.json();
      setMaintenanceMode(data.maintenanceMode);
    } catch {
      setMaintenanceMode(false);
    }
    setIsLoading(false);
  }, []);

  // Initial check and live polling every 5 seconds
  useEffect(() => {
    checkMaintenance();

    // Poll every 5 seconds for live updates
    const interval = setInterval(checkMaintenance, 5000);

    return () => clearInterval(interval);
  }, [checkMaintenance]);

  // GA tracking
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Allowed pages during maintenance
  const allowedPaths = ['/admin', '/maintenance'];
  const isAllowedPath = allowedPaths.includes(router.pathname);

  // Redirect to maintenance if needed
  useEffect(() => {
    if (!isLoading && maintenanceMode && !isAllowedPath) {
      router.push('/maintenance');
    }
  }, [isLoading, maintenanceMode, isAllowedPath, router]);

  // Show loading briefly on first load only
  if (isLoading) {
    return (
      <div className="min-h-screen dark-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If maintenance mode and not on allowed page, show nothing (will redirect)
  if (maintenanceMode && !isAllowedPath) {
    return null;
  }

  return (
    <>
      <Component {...pageProps} />
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <script defer src="https://umami-m084wo8o0k0skog4cswwo0co.codesec.me/script.js" data-website-id="e334b626-f7dc-49f2-88f0-954337adfa5b"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

export default MyApp;
