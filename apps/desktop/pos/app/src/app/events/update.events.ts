import { app, autoUpdater, dialog, MessageBoxOptions } from 'electron';
import { platform, arch } from 'os';
import { updateServerUrl } from '../constants';
import App from '../app';

export default class UpdateEvents {
  // initialize auto update service - most be invoked only in production
  static initAutoUpdateService() {
    const platform_arch =
      platform() === 'win32' ? platform() : platform() + '_' + arch();
    const version = app.getVersion();
    const feed: Electron.FeedURLOptions = {
      url: `${updateServerUrl}/update/${platform_arch}/${version}`,
    };

    if (!App.isDevelopmentMode()) {
      console.log('UpdateEvents: Initializing auto update service...');

      autoUpdater.setFeedURL(feed);
      UpdateEvents.checkForUpdates();
    }
  }

  // check for updates - most be invoked after initAutoUpdateService() and only in production
  static checkForUpdates() {
    if (!App.isDevelopmentMode() && autoUpdater.getFeedURL() !== '') {
      autoUpdater.checkForUpdates();
    }
  }
}

autoUpdater.on(
  'update-downloaded',
  (event, releaseNotes, releaseName, releaseDate) => {
    const dialogOpts: MessageBoxOptions = {
      type: 'info' as const,
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail:
        'A new version has been downloaded. Restart the application to apply the updates.',
    };

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall();
    });
  },
);

autoUpdater.on('checking-for-update', () => {
  console.log('UpdateEvents: Checking for updates...');
});

autoUpdater.on('update-available', () => {
  console.log('UpdateEvents: New update available!');
});

autoUpdater.on('update-not-available', () => {
  console.log('UpdateEvents: Up to date!');
});

autoUpdater.on('before-quit-for-update', () => {
  console.log('UpdateEvents: Application update is about to begin...');
});

autoUpdater.on('error', (message) => {
  console.error('UpdateEvents: There was a problem updating the application', message);
});
