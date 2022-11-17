import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "home" }
    },
    {
      path: "/home",
      name: "home",
      component: () => import('../views/Home.vue')
    },
    {
      path: "/reservation",
      name: "reservation",
      component: () => import('../views/Reservation.vue')
    },
    {
      path: "/reservation/:id",
      name: "details",
      component: () => import('../views/Details.vue')
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import('../views/Dashboard.vue')
    },
    //Category dashboard//
    {
      path: "/categories",
      name: "categoriesList",
      component: () => import('../views/Category/CategoryList.vue')
    },

    //Mesa dashboard//
    {
      path: "/mesas",
      name: "mesasList",
      component: () => import('../views/Mesa/MesaList.vue')
    },
  ]
})

export default router