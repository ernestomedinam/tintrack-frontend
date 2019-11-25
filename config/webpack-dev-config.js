const HtmlWebpackPlugin = require("html-webpack-plugin");
const PrettierPlugin = require("prettier-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const paths = require("./paths.js");

module.exports = {
    entry: [
        paths.appIndexJs
    ],
    mode: "development",
    devtool: "source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            Popper: 'popper.js',
            jQuery: 'jquery',
            // In case you imported plugins individually, you must also require them here:
            Util: "exports-loader?Util!bootstrap/js/dist/util",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
        }),
        new HtmlWebpackPlugin({
            favicon: './src/assets/img/favicon.ico',
            template: paths.appHtml
        }),
        new PrettierPlugin({
            parser: "babel",
            printWidth: 80,             // Specify the length of line that the printer will wrap on.
            tabWidth: 4,                // Specify the number of spaces per indentation-level.
            useTabs: true,              // Indent lines with tabs instead of spaces.
            bracketSpacing: true,
            extensions: [ ".js", ".jsx" ],
            jsxBracketSameLine: true,
            semi: true,                 // Print semicolons at the ends of statements.
            encoding: 'utf-8'
        })
    ],
    module: {
        rules: [
            {
                // look for js, jsx files
                test: /\.(js|jsx)$/,
                // in the src directory
                include: path.resolve(paths.appSrcJs),
                // exclude node_modules
                exclude: /(node_modules)/,
                use: {
                    // babel for transpiling js files
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ]
                    }
                }
            },
            {
                // look for css, scss files
                test: /\.(css|scss)$/,
                // in the src directory
                include: path.resolve(paths.appStyles),
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[local]"
                            },
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                // look for css, scss files
                test: /\.(css|scss)$/,
                // in the src directory
                include: path.resolve(paths.bootstrapModule),
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[local]"
                            },
                            importLoaders: 0
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[path][name].[ext]'
                        }
                    }
                ],
            }
        ]
    },
    resolve: {
        // file extensions
        extensions: [".js", ".jsx"],
        modules: ["node_modules"],
        // aliases to shorten paths
        alias: {
            Components: path.resolve(paths.appSrcJs, "components"),
            Utils: path.resolve(paths.appSrcJs, "utils"),
            Views: path.resolve(paths.appSrcJs, "views"),
            Store: path.resolve(paths.appSrcJs, "store")
        }
    },
};