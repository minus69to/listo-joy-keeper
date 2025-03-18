
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.000dc8f97fbe4de98a0aaa42a7f1909e',
  appName: 'listo-joy-keeper',
  webDir: 'dist',
  server: {
    url: 'https://000dc8f9-7fbe-4de9-8a0a-aa42a7f1909e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      gradleArgs: ['-PcdvMinSdkVersion=22']
    }
  }
};

export default config;
