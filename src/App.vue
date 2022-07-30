<template>
  <AudioUpload/>
  <AudioList/>
</template>

<script>
import AudioList from "./components/AudioList";
import AudioUpload from "./components/AudioUpload";

export default {
  name: 'App',
  components: {AudioList, AudioUpload}
}
</script>

<style>
</style>
