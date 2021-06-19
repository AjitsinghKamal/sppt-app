/**
 * reference all required env variable
 *
 * We are exporting env variable explicitely here
 * since, `import.meta` causes issues jest
 *
 * To support it directly in our modules would mean
 * switching jest to `ESM` which is still experimental
 * and does not support proper module mocking
 */
export const API_HOST = import.meta.env.VITE_API_HOST;
