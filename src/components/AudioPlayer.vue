<template>
  <div>
    <div id="aplayer"/>
  </div>
</template>

<script>
import api from './../api/api';
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';

export default {
  name: "AudioPlayer",
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
          this.audioList.forEach(item => {
            item.url = window.location.origin + "/api/binary/audio/download?name=" + encodeURI(item.name);
          })

          new APlayer({
            container: document.getElementById('aplayer'),
            mini: true,
            fixed: true,
            autoplay: false,
            theme: '#FADFA3',
            loop: 'all',
            order: 'random',
            preload: 'auto',
            volume: 0.7,
            mutex: true,
            listFolded: false,
            audio: this.audioList
          });
        }
      });
    },
  },
  mounted() {
    this.getAudioList();
  }
}
</script>
<style scoped>
</style>