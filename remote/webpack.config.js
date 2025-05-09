const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

const publicPath =
  process.env.NODE_ENV === "production"
    ? "https://micro-frontend-project-three.vercel.app/"
    : "http://localhost:3001/";

module.exports = {
  entry: "./src/index.tsx",
  mode: process.env.NODE_ENV || "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: publicPath,
  },
  devServer: {
    port: 3001,
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-typescript", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/components/Button",
        "./TodoList": "./src/components/TodoList",
        "./Counter": "./src/components/Counter",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^18.2.0",
          eager: true,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^18.2.0",
          eager: true,
        },
        "react-i18next": {
          singleton: true,
          requiredVersion: "^12.2.2",
          eager: true,
        },
        i18next: {
          singleton: true,
          requiredVersion: "^22.4.15",
          eager: true,
        },
        "i18next-http-backend": {
          singleton: true,
          requiredVersion: "^2.2.0",
          eager: true,
        },
        "i18next-browser-languagedetector": {
          singleton: true,
          requiredVersion: "^7.0.1",
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
