// we need to import this module from node(it comes with node)
const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry : {
        vendor : "./src/vendor.js",
        main :"./src/index.js"
    },
    module: {
        rules: [
          {
            test: /\.html$/i,
            use: ['html-loader']
          },
          {
            test: /\.(svg|png|jpg|gif)$/i,
            use:{
                loader : 'file-loader',
                options : {
                    name :'[name].[hash].[ext]',
                    outputPath : 'imgs'
                }
            }
          }
        ]
    },
    plugins : [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
          })
    ]
}
// we need to tell webpack to use this configuration
// its done through first object
// in order to do this we need to append our config in package.json file
// --config and name of the file after webpack
// check out package.json
// ****************************
// if you set your devtool property to none its not gonna use eval.(which it does by default)
// ****************************
// next module is to load our css
// css loader convert css codes into valid javascript code but it does not apply the code
// style loader take the code (which is css) and inject it to the DOM
// the tricky part is that the order they should be called is reversed, so first style-loader and then css-loader 
// ****************************
// third module is about sass
// order does matter
// 1) sass-loader converts scss into css
// 2) css-loader turns css into common js
// 3) style-loader injects style into DOM




    // module: {
    //     rules: [
    //       {
    //         test: /\.css$/i,
    //         use: ['style-loader','css-loader'],
    //       },
    //     ],
    // }



    // devtool : "none",

