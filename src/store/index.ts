import { createStore, MutationTree, StoreOptions } from 'vuex'
import Cookie from 'js-cookie'
import { User } from '../api/user'

interface RootState {
  user: User
}

const mutations: MutationTree<RootState> = {
  setUser (state: RootState, payload: User) {
    state.user = payload
    Cookie.set('user', payload)
  }
}

const store: StoreOptions<RootState> = {
  state: {
    user: null
  },
  mutations
}

export default createStore(store);