<template>
  <AudioUpload/>
  <AudioList/>
  <AudioPlayer/>
</template>

<script>
import AudioList from "./components/AudioList";
import AudioUpload from "./components/AudioUpload";
import AudioPlayer from "./components/AudioPlayer";

export default {
  name: 'App',
  components: {AudioList, AudioUpload, AudioPlayer}
}
</script>

<style>
</style>
