<template>
  <div>
    <el-row v-if="audioList.length > 0">
      <el-button color="#626aef" @click="playAllAudio()">
        播放全部
      </el-button>
      <el-button type="primary" @click="downloadAudioPack()">
        批量下载
      </el-button>
      <el-button type="danger" @click="deleteAudioList()">
        批量删除
      </el-button>
      <el-button type="success" plain @click="getAudioList()">
        刷新
      </el-button>
    </el-row>

    <el-table
        :data="audioList"
        style="width: 100%"
        v-if="audioList.length > 0"
        @selection-change="updateCheckedAudioList"
        row-key="fileName"
    >
      <el-table-column type="selection" width="55"/>
      <!--      暂不显示封面-->
      <!--      <el-table-column property="cover">-->
      <!--        <template #default="scope">-->
      <!--          <el-image :src="scope.row.cover"></el-image>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column property="title" label="名称"/>
      <el-table-column property="album" label="专辑"/>
      <el-table-column property="artist" label="作者"/>
      <el-table-column property="duration" label="时长"/>
      <el-table-column property="date" label="发行日期"/>
      <el-table-column property="bitRate" label="比特率" :formatter="formatAudioBitRate"/>
      <el-table-column property="size" label="大小" :formatter="formatAudioSize"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button color="#626aef" circle @click="switchAudio(scope.row.fileName)">
            <el-icon style="vertical-align: middle">
              <Headset/>
            </el-icon>
          </el-button>
          <el-button type="primary" circle @click="downloadAudio(scope.row.fileName)">
            <el-icon style="vertical-align: middle">
              <Download/>
            </el-icon>
          </el-button>
          <el-button type="danger" circle @click="deleteSingleAudio(scope.row.fileName)">
            <el-icon style="vertical-align: middle">
              <Delete/>
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import api from './../api/api';
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: 'AudioList',
  data() {
    return {}
  },
  computed: {
    ...mapState('Audio', ['audioList', 'checkedAudioList']),
  },
  methods: {
    ...mapActions('Audio', ['getAudioList', 'deleteAudio']),
    ...mapMutations('Audio', ['updateCheckedAudioList', 'playAllAudio', 'switchAudio']),
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
    downloadAudioPack() {
      if (this.checkedAudioList.length === 0) {
        this.$message({
          showClose: true,
          message: '请勾选下载目标',
          type: 'error',
          duration: 1000
        });
        return;
      }
      api.audioPackDownload({"nameList": this.checkedAudioList}).then(res => {
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
      });
    },
    deleteSingleAudio(audioName) {
      let list = [];
      list.push(audioName);
      this.deleteAudio(list);
    },
    deleteAudioList() {
      if (this.checkedAudioList.length === 0) {
        this.$message({
          showClose: true,
          message: '请勾选删除目标',
          type: 'error',
          duration: 1000
        });
        return;
      }
      this.deleteAudio(this.checkedAudioList);
    },
    formatAudioBitRate(row, column, value) {
      return value + "Kbs";
    },
    formatAudioSize(row, column, value) {
      return Math.floor(value / 1024 / 1024) + 'MB';
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
