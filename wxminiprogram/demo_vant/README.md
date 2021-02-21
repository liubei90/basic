# 引入vant

## 引入步骤
1. ```npm i @vant/weapp -S --production```
2. 开发者工具中**详情**->**本地设置**勾选**使用npm模块**
3. 菜单**工具**->**构建npm**在miniprogram_npm文件夹生成vant的目标文件
4. ```"usingComponents": { "van-button": "@vant/weapp/button" }```引入需要的组件
5. wxml中使用```<van-button>hi</van-button>```

**NOTE:**
1. 构建npm这一步可能会报```node_modules/@types/wechat-miniprogram/index.js：未找到npm包入口文件```的提示，是vant在**package.json**中将** @types/wechat-miniprogram** 声明为**dependencies**，可以忽略该提示。

## 包大小
- 原生 4k
- vant 401k

## 原理
node_modules目录不会参与编译、上传和打包。小程序通过```require(packName)```导入包时，会在miniprogram_npm目录下搜索，miniprogram_npm目录会被全部打包到小程序包中。所以引入vant后，整个包大小为401k。

由于小程序的默认行为和nodejs的默认不同，开发时会增加额外的心智负担。小程序提供了```packageNpmRelationList```配置，用来指定**node_modules**和**miniprogram_npm**的位置。

## 总结
1. vant包有400k,项目比较大时，需要考虑拆包，或者自己删减vant，达到按需引入的目的
2. 建议使用```packageNpmRelationList```配置，将**node_modules**目录排除，这样可以直观的看出小程序包打包了什么目录和文件。
