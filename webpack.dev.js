const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(common,{
    mode : "development",
    output :{
        filename : "[name].bundle.js",
        path : path.resolve(__dirname,"dist")
    },
    module :{
        rules:[
            {
            test: /\.scss$/i,
            use: ['style-loader','css-loader','sass-loader']
        }
    ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : "./src/template.html"
        })
    ]
});



// with common variable now we have the functionality of webpack.common.js in webpack.dev.js
// we need to use webpack merge so we require it with merge variable
// then we use merge function and pass common and our object into it

