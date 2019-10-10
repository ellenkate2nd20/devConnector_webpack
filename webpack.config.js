const path = require('path');
const webpack = require('webpack');

const htmlPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const VENDOR =
[
	// server
	// 'express',
	// 'body-parser',
	// 'bcryptjs',
	// 'firebase',
	// 'gravatar',
	// 'jsonwebtoken',
	// 'passport',
	// 'passport-jwt',
	
	// client
	'react',
	'react-dom',
	'react-router-dom',
	'react-moment',
	'redux',
	'react-redux',
	'redux-thunk',

	'axios',
	'classnames',
	'moment',
	'jwt-decode'
]

module.exports = 
{
	entry:
	{
		bundle: 
		[
			'@babel/polyfill',
			'./client/src/client.js'
		],
		vendor: VENDOR
	},
	output:
	{
		filename: './js/[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	resolve:
	{
		extensions: ['.jsx', '.js']
	},
	// mode: 'production',
	mode: 'development',
	module:
	{
		rules:
		[
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: '/node_modules/',
				query:
				{
					presets: ['@babel/preset-env', '@babel/preset-react']
				}
			},
			{
				test: /\.css$/,
				use: 
				[
					{
						loader: miniCssExtractPlugin.loader,
						options:
						{
							publicPath: '../'
						}
					}, 
					'css-loader'
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg|ico|woff|woff2|eot|ttf|wav|mp3)$/,
				loader: 'file-loader',
				options:
				{
					name: './img/[name].[ext]'
				}
			}
		]
	},
	optimization:
	{
		minimize: true,
		splitChunks:
		{
			cacheGroups:
			{
				default: false,
				commons:
				{
					chunks: 'all',
					name: 'vendor',
					test: /[\\/]node_modules[\\/]/
				}
			}
		}
	},
	plugins:
	[
		new htmlPlugin(
		{
			template: 'client/views/index.html'
		}),
		// new bundleAnalyzerPlugin(),
		new miniCssExtractPlugin(
		{
			filename: './css/global.css'
		})
	]
}