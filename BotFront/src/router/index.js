import { createRouter, createWebHashHistory } from 'vue-router'
import WeatherDetail from "@/components/Weather/WeatherView.vue";
import AtisDetail from "@/components/Atis/AtisView.vue";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/WeatherDetail/:id',
            name: 'weatherDetail',
            component: WeatherDetail
        },

        {
            path: '/AtisDetail/:id',
            name: 'AtisDetail',
            component: AtisDetail
        },
        {
            path:'/RouteDetail/:dep/:app',
            name: 'RouteDetail',
            component:()=>import('@/components/Route/RouteView.vue')
        },
    ]
})

export default router
