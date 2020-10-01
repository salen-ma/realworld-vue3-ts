import { defineComponent } from 'vue';
import { RouterView, RouterLink } from 'vue-router';

export default defineComponent({
  name: 'Layout',
  setup() {
    return () => (
      <>
        <nav class="navbar navbar-light">
          <div class="container">
            <RouterLink to="/" class="navbar-brand">conduit</RouterLink>
            <ul class="nav navbar-nav pull-xs-right">
              <li class="nav-item">
                <RouterLink to="/" class="nav-link active">Home</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/editor">
                  <i class="ion-compose"></i>&nbsp;New Post
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/settings">
                  <i class="ion-gear-a"></i>&nbsp;Settings
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/login">Sign up</RouterLink>
              </li>
            </ul>
          </div>
        </nav>

        <RouterView />

        <footer>
          <div class="container">
            <a href="/" class="logo-font">conduit</a>
            <span class="attribution">
              An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
            </span>
          </div>
        </footer>
      </>
    )
  }
})
