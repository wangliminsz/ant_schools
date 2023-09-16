import Vue from 'vue'
import VueRouter from 'vue-router'

import homePg from "./components/homePg.vue"

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

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
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
            redirect: '/contacts',
            component: homePg,
            meta: { requiresAuth: true }
        },
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
    ]
});

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