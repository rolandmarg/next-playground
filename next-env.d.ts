/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SITE_URL: string;
      DATABASE_URL: string;
      SESSION_SECRET: string;
      JWT_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
    }
  }
}

export {};
