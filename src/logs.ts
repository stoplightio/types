export const enum LogLevel {
  Trace = 10,
  Debug = 20,
  Info = 30,
  Warn = 40,
  Error = 50,
  Fatal = 60,
}

export const enum LogLevelLabel {
  Trace = 'trace',
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
  Fatal = 'fatal',
}

// TODO: more formal logging system, a couple of options to do the heavy lifting? something like this?
// https://github.com/pinojs/pino
// export interface ILog<T = any> {
//   level: LogLevel;
//   msg: string;
//   time: number;
//   source?: string;
//   data?: T;
// }
