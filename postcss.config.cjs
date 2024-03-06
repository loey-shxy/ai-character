module.exports = {
  plugins: [
    require('postcss-pxtorem')({
      rootValue: 75, // 指定跟字号的大小，根据设计稿来，如果设计稿是750px，就制定75
      propList: ['*'], // 需要转换的属性列表，所有属性
      selectorBlackList: ['pc', 'maw-w-1280'],
    }),
    require('postcss-px-to-viewport-8-plugin')({
      // options
      unitToConvert: 'px', // (String) 需要转换的单位，默认为"px"
      viewportWidth: 1920, // (Number) 设计稿的视口宽度，一般是750
      unitPrecision: 3, //  (Number) 单位转换后保留的精度（很多时候无法整除）
      viewportUnit: 'vw', // (String) 希望使用的视口单位
      selectorBlackList: ['ignore', 'hairlines', 'mobile', 'maw-w-1280'],
      minPixelValue: 1, // (Number) 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
      mediaQuery: false, // (Boolean) 媒体查询里的单位是否需要转换单位
      landscapeUnit: 'vw', // (String) 横屏时使用的单位
      landscapeWidth: 750, // (Number) 横屏时使用的视口宽度
    }),
  ],
}
