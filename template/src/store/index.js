import { createStore } from '@mpxjs/core'
import getters from './getters'
import user from './modules/user'


const store = createStore({
  modules: {
    user
  },
  getters
})

export default store