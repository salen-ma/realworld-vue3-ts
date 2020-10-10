import { defineComponent } from 'vue';
import { Router, RouterLink, useRouter } from 'vue-router'
import { Ref, toRefs, reactive, ref } from 'vue'
import { register, login } from '../../api/user'
import { Store, useStore } from 'vuex'

const useSubmit = (isLogin: Ref<boolean>, store: Store<any>, router: Router) => {
  const user = reactive({
    username: '',
    email: '',
    password: ''
  })
  const errors = ref<{
    [prop: string]: string
  }>({})
  const disabledSign = ref<boolean>(false) 

  const submit = async (e: Event) => {
    e.preventDefault()
    disabledSign.value = true
    try {
      const { data } = isLogin.value ?
        await login({ user: user }) :
        await register({ user: user })

      store.commit('setUser', data.user)
      router.push('/')
    } catch (err) {
      console.log(err, 'err')
      errors.value = err.response.data.errors
    }
    disabledSign.value = false
  }

  return {
    user,
    errors,
    disabledSign,
    submit
  }
}

export default defineComponent({
  name: 'Login',
  props: {
    isLogin: Boolean
  },
  setup(props) {
    const { isLogin } = toRefs(props)
    const store = useStore()
    const router = useRouter()
    const { user, errors, disabledSign,  submit } = useSubmit(isLogin, store, router)
    
    return () => (
      <div class="auth-page">
        <div class="container page">
          <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">{ isLogin.value ? 'Sign in' : 'Sign up' }</h1>
              <p class="text-xs-center">
                {
                  isLogin.value ?
                  <RouterLink to="/register">Need an account?</RouterLink> :
                  <RouterLink to="/login">Have an account?</RouterLink>
                }
              </p>

              <ul class="error-messages">
                {
                  Object.keys(errors.value).map((field, index) => (
                    <li key={index}>{field} { errors.value[field] }</li>
                  ))
                }
              </ul>

              <form>
                {!isLogin.value &&
                  <fieldset
                    class="form-group">
                    <input value={user.username}
                      onChange={(e: InputEvent) => {user.username = (e.target as HTMLInputElement).value}}
                      class="form-control form-control-lg" type="text" placeholder="Your Name" />
                  </fieldset>
                }
                <fieldset class="form-group">
                  <input value={user.email}
                    onChange={(e: InputEvent) => {user.email = (e.target as HTMLInputElement).value}}
                    class="form-control form-control-lg" type="text" placeholder="Email" />
                </fieldset>
                <fieldset class="form-group">
                  <input value={user.password}
                    onChange={(e: InputEvent) => {user.password = (e.target as HTMLInputElement).value}}
                    class="form-control form-control-lg" type="password" placeholder="Password" />
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right"
                  disabled={ disabledSign.value }
                  onClick={submit}>
                  { isLogin.value ? 'Sign in' : 'Sign up' }
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }
})
