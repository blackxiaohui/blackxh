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
            main: ["./src/index.tsx"], // 通过文件名解决文件的输出路径问题
            vendor: ["react", "react-dom"],
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
            openPage: `http://localhost:${LOCAL_PORT}`,
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
                    test: /\.(gif|png|jpe?g)$/i,
                    use: [{
                        // 用 url-loader 处理图片
                        loader: "url-loader", // url-loader 依赖于  file-loader 要使用url-loader必须安装file-loader
                        options: {
                            name: "[name].[hash:16].[ext]", // 文件名.hash.文件扩展名 默认格式为[hash].[ext]，没有文件名
                            limit: 1024 * 16, // 将小于8KB的图片转换成base64的格式
                            outputPath: "assets/imgs", // 为你的文件配置自定义 output 输出目录 ; 用来处理图片路径问题
                            publicPath: "assets/imgs", // 为你的文件配置自定义 public 发布目录 ; 用来处理图片路径问题
                        },
                    }, ],
                },
            ],
        },
        plugins: [
            new WebpackBar(),

            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(ENV),
                "process.env.npm_package_version": JSON.stringify(
                    process.env.npm_package_version
                ),
                "process.env.APP_ENV": JSON.stringify(process.env.APP_ENV || "boe"),
            }),

            new HtmlWebpackPlugin({
                filename: "index.html",
                template: path.resolve(PUBLIC_PATH, "index.html"),
                favicon: path.resolve(PUBLIC_PATH, 'favicon.ico'),
                chunks: ["main", "vendor"],
            }),

            new webpack.HotModuleReplacementPlugin(),

            new BundleAnalyzerPlugin({
                analyzerMode: ANALYZE_BUNDLE ? "server" : "disabled",
            }),

        ],
    }
}