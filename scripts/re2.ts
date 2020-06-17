import { init } from './init';

const RE2 = async (regex: string, flag?: string): Promise<RE2> => {
  return await init(regex, flag);
};

export default RE2;
