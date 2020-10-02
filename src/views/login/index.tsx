import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'Login',
  props: {
    isLogin: Boolean
  },
  setup({isLogin}) {
    console.log(isLogin, 'isLogin')
    return () => (
      <div class="auth-page">
        <div class="container page">
          <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">{ isLogin ? 'Sign in' : 'Sign up' }</h1>
              <p class="text-xs-center">
                {
                  isLogin ?
                  <RouterLink to="/register">Need an account?</RouterLink> :
                  <RouterLink to="/login">Have an account?</RouterLink>
                }
              </p>

              {/* <ul class="error-messages">
                <li>That email is already taken</li>
              </ul> */}

              <form>
                {!isLogin &&
                  <fieldset
                    class="form-group">
                    <input class="form-control form-control-lg" type="text" placeholder="Your Name" />
                  </fieldset>
                }
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Email" />
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password" />
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  { isLogin ? 'Sign in' : 'Sign up' }
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }
})
