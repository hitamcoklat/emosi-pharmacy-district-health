module.exports = {
  productionSourceMap: false,
  "transpileDependencies": [
    "vuetify",
    'vue-echarts',
    'resize-detector'    
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/'  
}