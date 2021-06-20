// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// module.exports = {
//   presets: ["@vue/cli-plugin-babel/preset"],
//   configureWebpack: {
//     optimization: {
//       minimizer: [
//         new UglifyJsPlugin({
//           uglifyOptions: {
//             compress: {
//               warnings: false,
//               drop_console: true, //console
//               drop_debugger: false,
//               pure_funcs: ["console.log"], // removal console
//             },
//           },
//         }),
//       ],
//     },
//   },
// };

const plugins = ["@vue/babel-plugin-transform-vue-jsx"];
// remove the console production environment
if (process.env.NODE_ENV === "production") {
  plugins.push("transform-remove-console");
}
module.exports = {
  plugins: plugins,
  presets: [
    [
      "@vue/app",
      {
        modules: false,
        targets: {
          browsers: [
            "> 1%",
            "last 2 versions",
            "not ie <= 8",
            "Android >= 4",
            "iOS >= 8",
          ],
        },
        useBuiltIns: "entry",
      },
    ],
  ],
};
