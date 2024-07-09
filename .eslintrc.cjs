/*
 * @Description: file content
 * @Author: 朱晨光
 * @Date: 2023-09-16 17:48:08
 * @LastEditors: 朱晨光
 * @LastEditTime: 2024-07-09 10:06:07
 */
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {  
  root: true,  
  env: {  
    node: true,  
    browser: true,  
    es2021: true,  
  },  
  extends: [  
    'eslint:recommended',  
    'plugin:vue/vue3-essential',  
    'plugin:prettier/recommended', // 引入prettier规则  
    'plugin:@typescript-eslint/recommended'  
  ],  
  parserOptions: {  
    parser: 'vue-eslint-parser',  
    ecmaVersion: 2021,  
    sourceType: 'module',  
    // 如果使用TypeScript，还需要配置parser: '@typescript-eslint/parser'  
  },  
  plugins: ['vue', 'prettier'], // 引入prettier插件  
  rules: {  
    // 自定义规则  
    'prettier/prettier': 'off', // 关闭prettier的eslint规则，由prettier插件管理  
    // 关闭名称校验
    'vue/multi-word-component-names': 'off'
  },  
};