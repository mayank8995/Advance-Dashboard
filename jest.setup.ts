import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.mock('./src/config/env', () => ({
  getEnv: () => ({
    apiUrl: 'https://json-server-portal.onrender.com/',
  }),
}));

jest.mock('./src/services/http-common-service', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));
