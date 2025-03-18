
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.listo.joy.keeper',
  appName: 'Listo Joy Keeper',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    buildOptions: {
      gradleArgs: ['-PcdvMinSdkVersion=22']
    }
  }
};

export default config;
