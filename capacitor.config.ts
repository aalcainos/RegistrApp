import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cl.registrapp.app',
  appName: 'RegistrApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
