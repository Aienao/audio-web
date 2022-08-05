import Vuex from 'vuex'
import Audio from './audio'
import AudioUpload from "./audio-upload";

export default new Vuex.Store({
    modules: {
        Audio,
        AudioUpload,
    }
})