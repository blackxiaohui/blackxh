const path = require("path");
const tsImportPluginFactory = require("ts-import-plugin");

const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, "src");
const PUBLIC_PATH = path.resolve(ROOT_PATH, "public");
const DIST_PATH = path.resolve(__dirname, "dist");
const NODE_MODULES_PATH = path.resolve(ROOT_PATH, "node_modules");
const LOCAL_PORT = 3030;

const ANALYZE_BUNDLE = process.env.ANALYZE_BUNDLE;


module.exports = (env) => {
    const ENV =
        process.env.NODE_ENV ||
        env.NODE_ENV ||
        (env.production && "production") ||
        "development";

    const isDev = ENV === "development";

    return {
        entry: {
            "main": ["./src/index.tsx"], // 通过文件名解决文件的输出路径问题
            "main-canvas": ["./src/index-canvas.tsx"], // 通过文件名解决文件的输出路径问题
            "vendor": ["react", "react-dom"],
        },
        output: {
            path: DIST_PATH,
            filename: isDev ? "[name].js" : "[name].js", // [name].[contenthash:8].js
            publicPath: isDev ? "/" : "./"
        },
        devServer: {
            contentBase: DIST_PATH,
            hot: true,
            inline: true,
            port: LOCAL_PORT,
            open: true,
            openPage: `http://localhost:${LOCAL_PORT}/canvas.html`,
            historyApiFallback: true,
        },

        mode: isDev ? "development" : "production",

        resolve: {
            extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".less", ".css"],
            alias: {
                "@": SRC_PATH,
            }
        },


        module: {
            rules: [{
                    test: /\.(ts|tsx)$/,
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,

                        getCustomTransformers: () => ({
                            before: [
                                tsImportPluginFactory({
                                    libraryDirectory: "es",
                                    libraryName: "antd",
                                    style: "css",
                                }),
                            ],
                        }),
                    },
                },
                {
                    test: /\.less$/,
                    use: ["style-loader", "css-loader", "less-loader"],
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|jpe?g|gif|webp)$/,
                    type: "asset",
                    parser: {
                        dataUrlCondition: {
                            maxSize: 10 * 1024, // 小于10k的图片会被base64处理
                        },
                    },
                    generator: {
                        // 生成资源名称
                        filename: 'images/[name][hash:8][ext]',
                    },
                },
            ],
        },
        plugins: [
            new WebpackBar(),

            // new webpack.DefinePlugin({
            //     "process.env.NODE_ENV": JSON.stringify(ENV),
            //     "process.env.npm_package_version": JSON.stringify(
            //         process.env.npm_package_version
            //     ),
            //     "process.env.APP_ENV": JSON.stringify(process.env.APP_ENV || "boe"),
            // }),

            new HtmlWebpackPlugin({
                filename: "index.html",
                template: path.resolve(PUBLIC_PATH, "index.html"),
                favicon: path.resolve(PUBLIC_PATH, 'favicon.ico'),
                chunks: ["main", "vendor"],
            }),

            new HtmlWebpackPlugin({
                filename: "canvas.html",
                template: path.resolve(PUBLIC_PATH, "index.html"),
                favicon: path.resolve(PUBLIC_PATH, 'favicon.ico'),
                chunks: ["main-canvas"],
            }),

            new webpack.HotModuleReplacementPlugin(),

            new BundleAnalyzerPlugin({
                analyzerMode: ANALYZE_BUNDLE ? "server" : "disabled",
            }),

        ],
    }
}