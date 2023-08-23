# mobile_vue3

## 项目简介

本项目为仿美团页面的移动端项目

## 技术构架

### 前端构架

基础框架 vue3+vite+typescript
ui 组件库 Vant 4

### node 构架

koa2

## 项目亮点

### 1、使用 commitlint+husky+lint-staged 保证前端 git 提交化

### 2、使用 postCssPxToRem 实现移动端页面响应式

### 3、使用 transition 实现页面进入动画

### 4、封装简易轮播图，实现输入框组件，提示文本的轮播效果

### 5、封装防抖节流，用于搜索组件的防抖效果

### 6、持久化保存搜索历史记录，完成当搜索记录超长的省略、展开页面逻辑

### 7、封装 DOM 元素滚动监听 hook，能监听滚动参数，与触底提示效果。用于实现页面滑动翻页的滚动逻辑、用于实现列表页加载的无限滚动

### 8、封装倒计时 hook，使用 requestAnimationFrame 实现，可用于控制倒计时的开始、暂停、重置

### 9、封装 vue3 插件 plugin，通过 IntersectionObserver ，实现图片懒加载的配置

### 10、封装请求异步事件的轮询 hook，保证下次轮询是基与上次轮询完成

### 11、使用 koa2，实现登录，与 token 的生成返回

### 12、通过 pinia 与 localstorage 持久化保存 token，并在路由守卫中鉴权 token，保证部分路由需要登录作为前提

### 13、封装请求与响应拦截器，规范请求 token 的携带与返回内容中 code 码与内容的规范化处理

### 14、配置 webSocket ，实现简单的即时聊天，主要是信息的发送、接收与链接的心跳检测功能

## 开发环境搭建

### 安装运行前端依赖

```sh
npm install
npm run dev
```

### 安装运行 node 依赖

```sh
cd mockServer
npm install
npm run server
```

### 测试账号

```sh
  {
    "id": 666,
    "name": "测试账号01",
    "phone": 12345678901,
    "password": 123
  },
  {
    "id": 333,
    "name": "测试账号02",
    "phone": 10000000001,
    "password": 919
  }
```
