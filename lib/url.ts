import { JSON_SERVER } from './constants';

export const getUrl = (path: string) => new URL(path, JSON_SERVER).href;
