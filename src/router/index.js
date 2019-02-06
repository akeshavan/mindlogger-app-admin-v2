import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import SignUp from '@/components/SignUp';
import ActivitySets from '@/components/ActivitySets';
import ViewActivity from '@/components/ViewActivity';
import ActivitySetOverview from '@/components/ActivitySetOverview';
import ViewActivityUser from '@/components/ViewActivityUser';
import ForgotPassword from '@/components/ForgotPassword';
import EditActivitySet from '@/components/EditActivitySet';
import EditActivity from '@/components/EditActivity';
import EditActivitySetParentRoute from '@/components/EditActivitySetParentRoute';
import Manage from '@/components/Manage';

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
