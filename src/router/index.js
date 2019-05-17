import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@bit/akeshavan.mindlogger-web.login';
import SignUp from '@bit/akeshavan.mindlogger-web.sign-up';
import AllApplets from '@/components/AllApplets';
import ViewApplet from '@/components/ViewApplet';
import AppletOverview from '@/components/AppletOverview';
import ViewAppletUser from '@/components/ViewAppletForUser';
import Manage from '@/components/Manage';
import Guide from '@/components/UserGuide';
import config from '@/config';


Vue.use(Router);

export default new Router({
  // mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/guide',
      name: 'Guide',
      component: Guide,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props: {
        apiHost: config.apiHost,
        signupLink: { name: 'SignUp' },
      },
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      props: {
        apiHost: config.apiHost,
        signupLink: { name: 'SignUp' },
      },
    },
    {
      path: '/manage/:appletId',
      name: 'Manage',
      component: Manage,
    },
    {
      path: '/allApplets',
      name: 'AllApplets',
      component: AllApplets,
    },
    {
      path: '/review/:appletId',
      component: ViewApplet,
      redirect: '/review/:appletId/overview',
      children: [
        {
          name: 'overview',
          path: 'overview',
          component: AppletOverview,
        },
        {
          name: 'view_user',
          path: 'view_user/:userId',
          component: ViewAppletUser,
        },
      ],
    },
  ],
});
