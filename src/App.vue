<template>
  <AudioUpload/>
  <AudioList/>
  <AudioPlayer/>
</template>

<script>
import {mapActions} from 'vuex'
import AudioList from "./components/AudioList";
import AudioUpload from "./components/AudioUpload";
import AudioPlayer from "./components/AudioPlayer";

export default {
  name: 'App',
  components: {AudioList, AudioUpload, AudioPlayer},
  methods: {
    ...mapActions('Audio', ['getAudioList']),
    ...mapActions('Config', ['getConfig']),
  },
  mounted() {
    this.getConfig();
    this.getAudioList();
  }
}
</script>

<style>
</style>
