<template>
  <div class="common-layout">
    <el-container>
      <!--      <el-header>-->
      <!--        <a href="/" style="text-decoration: none;font-size: 24px;">AudioCoder - Audio converter based on FFmpeg</a>-->
      <!--        <div>-->
      <!--          <a href="https://github.com/Aienao" target="_blank">-->
      <!--            <font-awesome-icon icon="fa-brands fa-github"/>-->
      <!--          </a>-->
      <!--        </div>-->
      <!--      </el-header>-->
      <el-main>
        <AudioUpload/>
        <el-divider v-if="audioList.length > 0"><span style="color: red">{{ getRetainDaysTip() }}</span></el-divider>
        <AudioList/>
        <AudioPlayer/>
      </el-main>
      <el-footer style="text-align: center;font-size: 14px;">
        <span>
          <a href="https://github.com/Aienao/audio" target="_blank">
            Powered by AudioCoder
          </a>
        </span>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import AudioList from "./components/AudioList";
import AudioUpload from "./components/AudioUpload";
import AudioPlayer from "./components/AudioPlayer";

export default {
  name: 'App',
  components: {
    AudioList,
    AudioUpload,
    AudioPlayer
  },
  computed: {
    ...mapState('Config', ['autoClean', 'retainDays']),
    ...mapState('Audio', ['audioList']),
  },
  methods: {
    ...mapActions('Audio', ['getAudioList']),
    ...mapActions('Config', ['getConfig']),
    getRetainDaysTip() {
      if (this.autoClean) {
        return "文件将保留" + this.retainDays + "天，请及时下载！";
      }
    }
  },
  mounted() {
    this.getConfig();
    this.getAudioList();
  }
}
</script>

<style>
</style>
