import Vuex from 'vuex'
import Audio from './audio'
import Config from './config'

export default new Vuex.Store({
    modules: {
        Audio,
        Config
    }
})