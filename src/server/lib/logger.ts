/**
 * Created by serioga on 17.09.16.
 */

import * as winston from 'winston';
import {LoggerInstance} from "winston";

export let logger = new (winston.Logger)({
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      json: true
    })
  ],
  exitOnError: false
});
