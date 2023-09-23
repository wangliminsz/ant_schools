import { createRouter, createWebHistory } from 'vue-router'

// Import your route components
// import Home from './views/HomePg.vue'
// import About from './views/AboutPg.vue'

// import Detail from './views/DetailPg.vue'

import homePg from "./components/homePg.vue"

// MichelinTable.vue
import MichelinTable from "./views/MichelinTable.vue"
import MichelinImgs from "./views/MichelinImgs.vue"
import MichelinHtml from "./views/MichelinHtml.vue"

import SchoolTable from "./views/SchoolTable.vue"
import SchoolEdit from "./views/SchoolEdit.vue"
import SchoolImgs from "./views/SchoolImgs.vue"
import SchoolHtml from "./views/SchoolHtml.vue"

import ContactManager from "./views/ContactManager.vue"
import AddContact from "./views/AddContact.vue"
import EditContact from "./views/EditContact.vue"
import ViewContact from "./views/ViewContact.vue"

import PageNotFound from "./views/PageNotFound.vue"

import LoginView from "./views/LoginView.vue"
// import myLogin from "./views/myLogin.vue"
import SignupView from "./views/SignupView.vue"
import ResetView from "./views/ResetView.vue"
import ResetView01 from "./views/ResetView01.vue"

import { supabase } from '@/clients/supabase'

let localUser;

const router = createRouter({
  history: createWebHistory(),
  routes: [

    // ------------------------------------------------------------------
    {
      path: '/login',
      name: 'Login',
      component: LoginView
      // component: myLogin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignupView
      // component: myLogin
    },
    {
      path: '/resetpassword',
      name: 'Resetpassword',
      component: ResetView
      // component: myLogin
    },
    {
      path: '/resetpassword01',
      name: 'Resetpassword01',
      component: ResetView01
      // component: myLogin
    },
    // ------------------------------------------------------------------

    {
      path: '/',
      name: 'homePage',
      redirect: '/schooltable',
      component: homePg,
      meta: { requiresAuth: true }
    },

    {
      path: '/mtable',
      name: 'MichelinTable',
      component: MichelinTable,
      meta: { requiresAuth: true }
    },

    // /michelinimgs/add/${id_2}
    {
      path: '/michelinhtml/:contactId',
      name: 'MichelinHtml',
      component: MichelinHtml,
      meta: { requiresAuth: true }
    },
    {
      path: '/michelinimgs/add/:contactId',
      name: 'MichelinImgs',
      component: MichelinImgs,
      meta: { requiresAuth: true }
    },

    // ~~~~~~~~~~~~~~~~~~

    {
      path: '/schooltable',
      name: 'SchoolTable',
      component: SchoolTable,
      meta: { requiresAuth: true }
    },
    // schoolhtml/${id_1}
    {
      path: '/schoolhtml/:contactId',
      name: 'SchoolHtml',
      component: SchoolHtml,
      meta: { requiresAuth: true }
    },
    {
      path: '/schoolimgs/add/:contactId',
      name: 'SchoolImgs',
      component: SchoolImgs,
      meta: { requiresAuth: true }
    },
    {
      path: '/schooltable/edit/:contactId',
      name: 'SchoolEdit',
      component: SchoolEdit,
      meta: { requiresAuth: true }
    },

    // ------------------------------------------------------------------

    {
      path: '/contacts',
      name: 'ContactManager',
      component: ContactManager,
      meta: { requiresAuth: true }
    },
    {
      path: '/contacts/add',
      name: 'AddContact',
      component: AddContact,
      meta: { requiresAuth: true }
    },
    {
      path: '/contacts/edit/:contactId',
      name: 'EditContact',
      component: EditContact,
      meta: { requiresAuth: true }
    },
    {
      path: '/contacts/view/:contactId',
      name: 'ViewContact',
      component: ViewContact,
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'PageNotFound',
      component: PageNotFound
    }


    // {
    //   path: '/detail',
    //   component: Detail
    // },

    // {
    //   path: '/detail/:pId',
    //   component: Detail,
    //   props: true, // This allows passing route params as props to the component
    // },

    // Add more routes as needed
  ],

  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // If a saved position is available (e.g., user clicked the Back button)
      // return savedPosition;
      return { left: 0, top: 0 };
    } else {
      // Scroll to the top of the page
      return { left: 0, top: 0 };
    }
  },

})

// getUser
async function currentUser(next) {
  try {
      localUser = await supabase.auth.getSession();
      if (localUser.data.session) {
          // console.log(localUser)
          console.log('signin-OK')
          // // it'ok
          next();
      } else {
          console.log('not signin')
          next("/login")
      }
  }
  catch (error) {
      console.log(error)
  }
}

// auth Requirement
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
      // console.log('requires Auth')
      currentUser(next);
  } else {
      next();
  }
})

export default router;