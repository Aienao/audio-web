<template>
  <div>
    <table v-if="audioList">
      <thead>
      <tr>
        <th>名称</th>
        <th>专辑</th>
        <th>作者</th>
        <th>时长</th>
        <th>发行日期</th>
        <th>大小</th>
        <th>比特率</th>
        <th>下载</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(audio,index) of audioList" :key="index">
        <td>{{ audio.name }}</td>
        <td>{{ audio.album }}</td>
        <td>{{ audio.artist }}</td>
        <td>{{ audio.duration }}</td>
        <td>{{ audio.date }}</td>
        <td>{{ formatAudioSize(audio.size) }}</td>
        <td>{{ formatAudioBitRate(audio.bitRate) }}</td>
        <td>
          <button @click="downloadAudio(audio.name)">下载</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import api from './../api/api'

export default {
  name: 'AudioList',
  data() {
    return {
      audioList: []
    }
  },
  methods: {
    getAudioList() {
      api.audioList({}).then(res => {
        if (res && res.data.Status == 'OK') {
          this.audioList = res.data.Return;
        }
      });
    },
    downloadAudio(audioName) {
      api.audioDownload({"name": audioName}).then(res => {
        let data = res.data;
        if (!data) {
          return;
        }
        let contentDisposition = decodeURI(res.headers['content-disposition']);
        let filePath = '';
        filePath = contentDisposition.indexOf('filename=') > -1 ? contentDisposition.split('filename=')[1] : contentDisposition.split('fileName=')[1];
        let fileName = filePath.substring(1, filePath.length - 1);
        let url = window.URL.createObjectURL(new Blob([data]));
        let a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
      })
    },
    formatAudioBitRate(bitRate) {
      return Math.floor(bitRate / 1000) + "Kbs";
    },
    formatAudioSize(size) {
      return Math.floor(size / 1024 / 1024) + 'MB';
    }
  },
  mounted() {
    this.getAudioList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
