import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { TextEncoder, TextDecoder as NodeTextDecoder } from "util";


global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = NodeTextDecoder;

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);