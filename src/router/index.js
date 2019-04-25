import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@bit/akeshavan.mindlogger-web.login';
import SignUp from '@bit/akeshavan.mindlogger-web.sign-up';
import ActivitySets from '@/components/ActivitySets';
import ViewActivity from '@/components/ViewActivity';
import ActivitySetOverview from '@/components/ActivitySetOverview';
import ViewActivityUser from '@/components/ViewActivityUser';
import ForgotPassword from '@/components/ForgotPassword';
import EditActivitySet from '@/components/EditActivitySet';
import EditActivity from '@/components/EditActivity';
import EditActivitySetParentRoute from '@/components/EditActivitySetParentRoute';
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
      path: '/forgot',
      name: 'Forgot',
      component: ForgotPassword,
    },
    {
      path: '/manage/:activitySetId',
      name: 'Manage',
      component: Manage,
    },
    {
      path: '/edit_activity_set/:activitySetId',
      name: 'EditActivitySet',
      redirect: '/edit_activity_set/:activitySetId/',
      component: EditActivitySetParentRoute,
      children: [
        {
          name: 'edit_activity_set_overview',
          path: '/',
          component: EditActivitySet,
        },
        {
          path: 'edit_activity/:activityId',
          name: 'EditActivity',
          component: EditActivity,
        },
      ],
    },
    {
      path: '/activitySets',
      name: 'ActivitySets',
      component: ActivitySets,
    },
    {
      path: '/view_activity/:activityId',
      // name: 'ViewActivity',
      component: ViewActivity,
      redirect: '/view_activity/:activityId/overview',
      children: [
        {
          name: 'overview',
          path: 'overview',
          component: ActivitySetOverview,
        },
        {
          name: 'view_user',
          path: 'view_user/:userId',
          component: ViewActivityUser,
        },
      ],
    },
  ],
});
