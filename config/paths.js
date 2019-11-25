const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => {
    return path.resolve(appDirectory, relativePath);
};

module.exports = {
    appSrc: resolveApp("src"),
    appStyles: resolveApp("src/styles"),
    appSrcJs: resolveApp("src/js"),
    appAssets: resolveApp("src/assets"),
    appBuild: resolveApp("public"),
    appHtml: resolveApp("index.html"),
    appIndexJs: resolveApp("src/js/index.js"),
    bootstrapModule: resolveApp("node_modules/bootstrap/dist/css")
}