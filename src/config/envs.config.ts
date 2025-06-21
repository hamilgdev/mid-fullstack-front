
interface EnvClientConfig {
  VITE_API_URL: string;
}

export const envsClient: EnvClientConfig = {
  VITE_API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
};