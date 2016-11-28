'use strict';
require('dotenv').config();
require('ts-node').register({ /* options */ });
let app =  require('./src/server/index');

app.listen(3000, function(){
    console.log("Demo Express server listening on port %d in %s mode", 3000, app.settings.env);
});