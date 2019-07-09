import KityMinder from './vueKityminder.vue'

const components = [
    KityMinder
]

function install(Vue, opts = {}) {
    components.map(component => {
      Vue.component(component.name, component)
    })
  }


if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    KityMinder
}