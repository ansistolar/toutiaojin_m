/**
 * PostCSS 配置文件
 */

module.exports = {
    // 配置要使用的 PostCSS 插件
    plugins: {
        // 配置使用 autoprefixer 插件
        // 作用：生成浏览器 CSS 样式规则前缀
        // VueCLI 内部已经配置了 autoprefixer 插件
        // 所以又配置了一次，所以产生冲突了
        // 'autoprefixer': { // autoprefixer 插件的配置
        //   // 配置要兼容到的环境信息
        //   browsers: ['Android >= 4.0', 'iOS >= 8']
        // },

        // 配置使用 postcss-pxtorem 插件
        // 作用：把 px 转为 rem
        'postcss-pxtorem': {
            rootValue({ file }) {
                // lib-flexible 的 REM 适配方案：把一行分为10份，每份就是十分之一
                // 所以 rootValue 应该设置为你的设计稿宽度的十分之一
                // iphoneSE是750，所以应该设置为75
                // 但是Vant建议设置为37.5，因为Vant是基于375设计的
                // 所以必须设置为37.5，这样的缺点是我们设计稿的尺寸还得除二
                // 解决方法：
                // 如果是Vant的样式，就按照37.5来转换
                // 如果是我们自己的样式，就按照 75 来转换
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            // 配置要转换的CSS属性
            propList: ['*']
        }
    }
}