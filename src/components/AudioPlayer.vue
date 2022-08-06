<template>
  <div>
    <div id="aplayer"/>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import 'aplayer/dist/APlayer.min.css';

export default {
  name: "AudioPlayer",
  data() {
    return {}
  },
  methods: {
    ...mapMutations('Audio', ["getAudioPlayerEl"]),
  },
  mounted() {
    this.getAudioPlayerEl(document.getElementById('aplayer'));
  }
}
</script>
<style scoped>
</style>