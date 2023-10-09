const path = require('path');

module.exports = {
    entry: './client/client.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: 'bundle.js',
    },
    //optional, gives 200ms wait time before running
    watchOptions: {
        aggregateTimeout: 200,
    }
};