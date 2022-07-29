import axios from 'axios';

const api = {
    audioList(params) {
        return axios.post('/api/rest/audio/list', params);
    },
    audioConvert(params) {
        return axios.post('/api/binary/audio/convert', params);
    },
    audioDownload(params) {
        return axios.post('/api/binary/audio/download', params, {
            responseType: 'blob'
        });
    },
    audioPackDownload(params) {
        return axios.post('/api/binary/audio/pack/download', params);
    },
    audioDelete(params) {
        return axios.post('/api/rest/audio/delete', params);
    },
}

export default api;