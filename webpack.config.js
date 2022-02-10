const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    output: { 
        path: path.join(__dirname, "build"), 
        filename: "index.bundle.js",
        sourceMapFilename: "[name].js.map"
    },
    mode: process.env.NODE_ENV,
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    devServer: { 
        static: path.join(__dirname, "build")
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        }),
    ],
};