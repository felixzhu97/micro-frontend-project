const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

const remoteUrl =
  process.env.NODE_ENV === "production"
    ? "https://micro-frontend-project-three.vercel.app/remoteEntry.js"
    : "http://localhost:3001/remoteEntry.js";

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  output: {
    publicPath: "auto",
  },
  devServer: {
    port: 3000,
    open: true,
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
      name: "host",
      remotes: {
        remote: `remote@${remoteUrl}`,
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
