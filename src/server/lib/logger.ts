/**
 * Created by serioga on 17.09.16.
 */

import winston = require('winston');
import {LoggerInstance} from "winston";

export = (function ():LoggerInstance {
    var logger = new (winston.Logger)({
        transports: [
            new winston.transports.Console({
                handleExceptions: true,
                json: true
            })
        ],
        exitOnError: false
    });


    return logger;
})();