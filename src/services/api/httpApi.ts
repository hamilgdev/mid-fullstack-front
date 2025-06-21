import { FetchHttpAdapter } from "@/services/adapters/fetchHttp.adapter";

import { envsClient } from "@/config/envs.config";

export const httpApi = new FetchHttpAdapter(envsClient.VITE_API_URL);
