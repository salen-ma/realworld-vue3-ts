import { onBeforeMount, defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import Cookie from 'js-cookie'
import { User } from './api/user'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    const userString = Cookie.get('user')
    let user: User = null
    try {
      user = JSON.parse(userString as string)
    } catch (err) {}

    if (user) {
      store.commit('setUser', user)
    }

    return () => (
      <div>
        <RouterView />
      </div>
    )
  }
})