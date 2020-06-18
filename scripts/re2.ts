import { init } from './init';

export const RE2 = (regex: string, flag?: string): RE2 => init(regex, flag);
