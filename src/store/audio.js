import api from './../api/api'

export default {
    namespaced: true,
    actions: {
        getAudioList(context) {
            api.audioList({}).then(res => {
                if (res && res.data.Status === 'OK') {
                    context.commit('setAudioList', res.data.Return);
                }
            });
        }
    },
    mutations: {
        setAudioList(state, value) {
            state.audioList = value;
        },
        updateCheckedAudioList(state, value) {
            state.checkedAudioList = [];
            value.forEach(item => {
                state.checkedAudioList.push(item.name);
            });
        }
    },
    state: {
        audioList: [],
        checkedAudioList: [],
    },
    getters: {},
}