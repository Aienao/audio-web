import api from './../api/api'
import APlayer from "aplayer";

function createAplayer(state) {
    return new APlayer({
        container: state.audioPlayerEl,
        fixed: true,
        autoplay: true,
        preload: 'none',
        audio: state.audioList
    });
}

export default {
    namespaced: true,
    actions: {
        getAudioList(context) {
            api.audioList({}).then(res => {
                if (res && res.data.Status === 'OK') {
                    context.commit('setAudioList', res.data.Return);
                }
            });
        },
        deleteAudio(context, value) {
            if (value && value.length > 0) {
                api.audioDelete({"nameList": value}).then(res => {
                    if (res.data.Status === 'OK') {
                        context.dispatch('getAudioList');
                    }
                });
            }
        }
    },
    mutations: {
        setAudioList(state, value) {
            state.audioList = value;
            state.audioList.forEach(item => {
                item.url = window.location.origin + "/api/binary/audio/download?name=" + encodeURI(item.fileName);
                // eslint-disable-next-line no-prototype-builtins
                if (!item.hasOwnProperty("cover") || !item.cover) {
                    item.cover = 'data:image/png;base64,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';
                }
            });
            // 如果存在播放器，则刷新播放列表
            if (state.aplayer) {
                state.aplayer.list.clear();
                state.aplayer.list.add(state.audioList);
            }
        },
        updateCheckedAudioList(state, value) {
            state.checkedAudioList.splice(0, state.checkedAudioList.length);
            value.forEach(item => {
                state.checkedAudioList.push(item.fileName);
            });
        },
        getAudioPlayerEl(state, value) {
            state.audioPlayerEl = value;
        },
        playAllAudio(state) {
            if (!state.aplayer) {
                state.aplayer = createAplayer(state)
            }
        },
        switchAudio(state, value) {
            if (!state.aplayer) {
                state.aplayer = createAplayer(state)
            }
            let index = state.audioList.findIndex(item => item.fileName === value);
            if (index > -1) {
                state.aplayer.list.switch(index);
            }
        }
    },
    state: {
        audioList: [],
        checkedAudioList: [],
        audioPlayerEl: null,
        aplayer: null,
    },
    getters: {},
}