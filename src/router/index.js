import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import SignUp from '@/components/SignUp';
import ActivitySets from '@/components/ActivitySets';
import ViewActivity from '@/components/ViewActivity';
import ActivitySetOverview from '@/components/ActivitySetOverview';
import ViewActivityUser from '@/components/ViewActivityUser';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
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
