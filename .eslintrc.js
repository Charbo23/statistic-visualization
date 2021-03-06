module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-unused-vars': ['off', {
      // 允许声明未使用变量
      "vars": "local",
      // 参数不检查
      "args": "none"
    }],
    'no-useless-escape': 0,
    // 关闭语句强制分号结尾
    "semi": [0],
    "no-undef": 0,
    "vue/no-unused-components": "off",
    "no-extra-semi": "off"
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
