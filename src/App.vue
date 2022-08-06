<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <SitHeader/>
      </el-header>
      <el-main>
        <AudioUpload/>
        <el-divider><span>音频列表 {{ getRetainDaysTip() }}</span></el-divider>
        <AudioList/>
        <AudioPlayer/>
      </el-main>
      <el-footer style="text-align: center;font-size: 14px;"><span><a
          href="https://github.com/Aienao" target="_blank">Powered by Aienao</a></span></el-footer>
    </el-container>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import SitHeader from "./components/SitHeader";
import AudioList from "./components/AudioList";
import AudioUpload from "./components/AudioUpload";
import AudioPlayer from "./components/AudioPlayer";

export default {
  name: 'App',
  components: {SitHeader, AudioList, AudioUpload, AudioPlayer},
  computed: {
    ...mapState('Config', ['autoClean', 'retainDays']),
  },
  methods: {
    ...mapActions('Audio', ['getAudioList']),
    ...mapActions('Config', ['getConfig']),
    getRetainDaysTip() {
      if (this.autoClean) {
        return "（文件将保留" + this.retainDays + "天，请及时下载！）";
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
