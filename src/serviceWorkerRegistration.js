import { Workbox } from 'workbox-window';

export function register() {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/service-worker.js');

    wb.addEventListener('activated', (event) => {
      if (!event.isUpdate) {
        // App is newly installed or running in a new version
        console.log('Service worker activated for the first time!');
      } else {
        console.log('Service worker activated with update!');
      }
    });

    wb.register();
  }
}
