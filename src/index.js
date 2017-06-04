import pagination from './pagination.vue'



function plugin (Vue) {
    Vue.component({pagination})
}



if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
}

export default plugin

export {pagination}