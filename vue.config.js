const {defineConfig} = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: config => {
        config.module
            .rule('images')
            .set('parser', {
                dataUrlCondition: {
                    maxSize: 4 * 1024 // 4KiB
                }
            })
    },
    // css: {
    //   loaderOptions: {
    //     css: {
    //       modules: {
    //         localIdentName: '[name]-[hash]',
    //         exportLocalsConvention: 'camelCaseOnly'
    //       }
    //     }
    //   }
    // }
})
