module.exports={
  chainWebpack:config=>{
    config.plugins.delete("prefetch")
  },
  // devServer:{
  //   proxy:{
  //     '/api':{
  //       target:'http://127.0.0.1:3000',
  //       changeOrigin:true,
  //       pathRewrite:{
  //         '^/api':''
  //       }
  //     }
  //   }
  // }
}