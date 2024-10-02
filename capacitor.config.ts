import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'calton-recorder',
  webDir: 'www',
  server: {
    hostname: 'localhost',
    cleartext: true, // Enable HTTP for dev environment
  },
  android: {
    allowMixedContent: true
  },
};

export default config;
