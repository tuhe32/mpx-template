'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  'process.env': {
    NODE_ENV: '"development"',
    BASE_API: '"http://localhost:9110/"'
  }
})
