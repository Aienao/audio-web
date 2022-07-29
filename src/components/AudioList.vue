<template>
  <table>
    <thead>
    <tr>
      <th>名称</th>
      <th>专辑</th>
      <th>作者</th>
      <th>时长</th>
      <th>发行日期</th>
      <th>大小</th>
      <th>比特率</th>
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
    </tr>
    </tbody>
  </table>

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
      api.audioList({}).then(response => {
        if (response && response.data.Status == 'OK') {
          this.audioList = response.data.Return;
        }
      });
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
