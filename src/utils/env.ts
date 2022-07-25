/* eslint-disable no-process-env */

export const NODE_ENV = process.env.NODE_ENV;
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export const isDevelopment = Boolean(NODE_ENV === 'development');
export const isProduction = Boolean(NODE_ENV === 'production');
