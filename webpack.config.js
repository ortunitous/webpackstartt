const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production', // O 'development', dependiendo del entorno que desees

    output: {
        clean: true,  // Limpia la carpeta 'dist' antes de cada build
        filename: 'main.[contenthash].js',  // Utiliza un hash único para los archivos JS para evitar problemas de caché
    },

    optimization: {
        minimize: true,  // Habilita la minimización
        minimizer: [
            new CssMinimizerPlugin(),  // Minimiza los archivos CSS
            new TerserPlugin(),  // Minimiza los archivos JS
        ],
    },

    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false,
                },
            },
            {
                test: /\.css$/i,
                exclude: /style.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /style.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource', // Maneja imágenes como recursos
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',  // Nombre del archivo CSS con hash para evitar problemas de caché
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' },  // Copia los assets a la carpeta de salida
            ],
        }),
    ],
};
