const WebpackDevServer = require("webpack-dev-server");
const webpack = require('webpack');
const paths = require("./paths.js");
const config = require("./webpack-dev-config.js");

const Port = 3000;
const Host = "0.0.0.0";

const options = {
    host: Host,
    port: Port,
    hot: true,
    open: true,
    contentBase: paths.appAssets,
    watchContentBase: true,
    disableHostCheck: true,
    historyApiFallback: true,
    after() {
        console.log(`Hey! Dev server running on: https://${Host}:${Port}`);
    }
};

WebpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, options)

server.listen(Port, Host, () => {});