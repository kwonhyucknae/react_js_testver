/*
var webpack = require('webpack'); //require로 불러옴 웹팩 불러오기

module.exports = {           //이 객체를 모듈로 내보내기 다른코드에서 이 객체를 require로 불러올수있음
    entry: './src/index.js',  //필요한 것을 재귀적으로 불러옴? 여러파일을 불러올수있다

    output: {                 //합친 파일들을 public 폴더에 bundle.js로 저장한다
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: {         //개발서버 설정
        hot: true,        //파일 수정될때마다 리로드
        inline: true,     // hot 리로드에 필요한 파일을 bundle에 같이 넣어줌
        host: '0.0.0.0',  //서버 호스트
        port: 4000,
        contentBase: __dirname + '/public/', //index 파일의 위치
    },

    module: {           //로더를 통하여 es2015와 react를 일반 자바스크립트로 변경
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot-loader/webpack','babel-loader?' + JSON.stringify({
                cacheDirectory: true,
                presets: ['es2015', 'react']
  })],
  exclude: /node_modules/
}]
  },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
*/

var webpack = require('webpack'); //require로 불러옴 웹팩 불러오기

module.exports = {
    entry: ['react-hot-loader/patch', './src/index.js'] ,

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: {
        hot: true,
        inline: true,
        host: '0.0.0.0',
        port: 4000,
        contentBase: __dirname + '/public/',
    },

    module:{
        loaders: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015','stage-0' ,'react'],
                    plugins: ["react-hot-loader/babel"]
                }
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
