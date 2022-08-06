import api from './../api/api'

export default {
    namespaced: true,
    actions: {
        getConfig(context) {
            api.getConfig().then(res => {
                if (res && res.data.Status === 'OK') {
                    context.commit('setConfig', res.data.Return);
                }
            });
        }
    },
    mutations: {
        setConfig(state, value) {
            state.autoClean = value.autoClean;
            state.retainDays = value.retainDays;
        }
    },
    state: {
        autoClean: null,
        retainDays: null,
    },
    getters: {},
}