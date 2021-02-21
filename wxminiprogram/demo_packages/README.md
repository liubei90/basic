# 小程序分包
小程序单个包大小不能超过2M，所有分包大小不能超过20M。对小程序分包，可以优化首次启动时间，不同模块可以给不同团队维护。

## 分包方式

官方提供的分包策略是在**app.json**配置**subpackages**，用来指定子包的目录、页面。子包能使用app（主包）的js文件、template、资源，子包无法访问其他子包的js文件、template、资源。可以将公共的组件库放到主包，子包放其他模块的业务逻辑。

分包注意事项：
1. subpackages目录外的文件将会打包到app（主包）中
2. subpackage目录内不能包含另一个subpackage的子目录，也就是分包的目录结构是平行的
3. tabBar 页面必须在 app（主包）内

我的例子中包含**首页**、**分类**、**我的**3个模块，按照分包策略，把**首页**放到app（主包）中，**分类**和**我的**拆分到对应的子包，配置如下

```
"pages":[
    "pages/index/index",
    "pages/typelist/typelist",
    "pages/my/my"
  ],
"subpackages": [
    {
      "name": "sub_package_my",
      "root": "sub_package_my",
      "pages": [
        "pages/setting/setting"
      ]
    },
    {
      "name": "sub_package_types",
      "root": "sub_package_types",
      "pages": [
        "pages/typedetail/typedetail"
      ]
    }
  ],
"tabBar": {
    "custom": false,
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页"
      },
      {
        "pagePath": "pages/typelist/typelist",
        "text": "分类"
      },
      {
        "pagePath": "pages/my/my",
        "text": "我的"
      }
    ]
  }
```

按照第3点注意事项，所有tabBar页面必须在app（主包）内，则**分类列表**和**我的**页面也会打包到app（主包）内，**分类详情**和**设置**页面又被拆分到各自的包中。这样就违背了开发中的高内聚目标，**我的**和**设置**应该是在同一个模块下，也应该放在相同包下。**分类列表**和**分类详情**也一样。在网上查到可以通过自定义tabBar解决，思路是使用自定义的tabBar，在tabBar的切换事件中执行跳转动作，加载当前模块的包。每个模块的主页渲染相同的tabBar。

## 实现自定义tabBar
首先引入vant，使用vant提供的tabbar。具体引入方式可以查看[官网](https://vant-contrib.gitee.io/vant-weapp/#/tabbar)

然后实现自己的**tab-bar**组件，在根目录新建**components**目录用来放自定义组件。在**tab-bar**组件中实现跳转功能，如下是核心代码
```
// tab_bar.wxml
<van-tabbar active="{{active}}" bind:change="onChange">
  <van-tabbar-item name="/pages/index/index">首页</van-tabbar-item>
  <van-tabbar-item name="/sub_package_types/pages/typelist/typelist">分类</van-tabbar-item>
  <van-tabbar-item name="/sub_package_my/pages/my/my">我的</van-tabbar-item>
</van-tabbar>

// tab_bar.js
onChange(event) {
  this.setData({ active: event.detail });
  wx.redirectTo({
    url: event.detail,
  });
},
```

## 优化后的分包方式

将**分类列表**和**我的**页面移动到对应的子包目录下的pages页面，修改后的subpackages配置如下
```
"pages":[
  "pages/index/index",
  "pages/noop/noop"
],
"subpackages": [
  {
    "name": "sub_package_my",
    "root": "sub_package_my",
    "pages": [
      "pages/my/my",
      "pages/setting/setting"
    ]
  },
  {
    "name": "sub_package_types",
    "root": "sub_package_types",
    "pages": [
      "pages/typelist/typelist",
      "pages/typedetail/typedetail"
    ]
  }
],
"tabBar": {
  "custom": true,
  "list": [
    {
      "pagePath": "pages/noop/noop",
      "text": "首页"
    },
    {
      "pagePath": "pages/noop/noop",
      "text": "分类"
    },
    {
      "pagePath": "pages/noop/noop",
      "text": "我的"
    }
  ]
},
```

在**我的**和**分类列表**页面引入**tab-bar**组件

使用自定义tabBar时，需要**tabBar**配置```custom: true```，**list**字段也要正常配置，用来标识哪些页面是tab页面，也为了兼容不支持自定义tabBar的旧版本。我使用了一个空白页**noop**替换真正的tab页面。

优化后的页面虽然可以将模块代码都拆分到对应的子包内，但在切换tab时，新页面会存在进入动画，导致同时会显示两个tabBar组件，使用体验不佳。而且进入子包时，页面的左上角会有个**主页**按钮，也影响使用体验。

## 结论
- 最终存在3个包，主包400k、sub_package_types包0.5k，sub_package_my包0.6k。达到了拆包的目的。
- 使用自定义组件解决tabBar的问题，体验上会有问题，需要进一步找到更好的解决方法，可以尝试禁用子包页面的加载动画，隐藏子包左上角按钮。或者将子包的首页代码放在子包目录中，在app（主包）内引用。
