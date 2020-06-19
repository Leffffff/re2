import { init } from './init';

export const re2 = (regex: string, flag?: string): RE2 => init(regex, flag);
