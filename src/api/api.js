import axios from 'axios';

const api = {
    audioList() {
        return axios.post('/api/rest/audio/list', {});
    },
    audioConvert(params) {
        return axios.post('/api/binary/audio/convert', params);
    },
    audioDownload(params) {
        return axios.post('/api/binary/audio/download/' + params, {}, {
            responseType: 'blob'
        });
    },
    audioPackDownload(params) {
        return axios.post('/api/binary/audio/pack/download', params, {
            responseType: 'blob'
        });
    },
    audioDelete(params) {
        return axios.post('/api/rest/audio/delete', params);
    },
    getConfig() {
        return axios.post('/api/rest/config/get', {});
    }
}

export default api;