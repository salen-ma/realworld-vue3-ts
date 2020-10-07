import { defineComponent, InputHTMLAttributes } from 'vue';
import { RouterLink } from 'vue-router'
import { toRefs, reactive } from 'vue'
import { User, register, login } from '../../api/user'

const useSubmit = (isLogin) => {
  const user = reactive({
    username: '',
    email: '',
    password: ''
  })

  const submit = async (e: Event) => {
    e.preventDefault()
    try {
      const { data } = isLogin ?
        await login({ user: user }) :
        await register({ user: user })
    } catch (err) {
      console.log(err)
    }
  }

  return {
    user,
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
    const { user, submit } = useSubmit(isLogin)
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

              {/* <ul class="error-messages">
                <li>That email is already taken</li>
              </ul> */}

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
