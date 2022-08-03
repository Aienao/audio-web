<template>
  <div>
    <el-row v-if="audioList.length > 0">
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
        @selection-change="getSelections"
        row-key="name"
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
          <el-button type="success" circle @click="downloadAudio(scope.row.name)">
            <el-icon style="vertical-align: middle">
              <Download/>
            </el-icon>
          </el-button>
          <el-button type="danger" circle @click="deleteSingleAudio(scope.row.name)">
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

export default {
  name: 'AudioList',
  data() {
    return {
      audioList: [],
      checkedAudioList: [],
    }
  },
  methods: {
    getAudioList() {
      api.audioList({}).then(res => {
        if (res && res.data.Status === 'OK') {
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
    // 获取列表选中的文件名称并赋值给checkedAudioList
    getSelections(items) {
      items.forEach(item => {
        this.checkedAudioList.push(item.name);
      });
    },
    downloadAudioPack() {
      if (this.checkedAudioList.length > 0) {
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
        })
      }
    },
    deleteAudio(audioList) {
      if (audioList && audioList.length > 0) {
        api.audioDelete({"nameList": audioList}).then(res => {
          if (res.data.Status === 'OK') {
            this.getAudioList();
          }
        });
      }
    },
    deleteSingleAudio(audioName) {
      let list = [];
      list.push(audioName);
      this.deleteAudio(list);
    },
    deleteAudioList() {
      this.deleteAudio(this.checkedAudioList);
    },
    formatAudioBitRate(row, column, value) {
      return value + "Kbs";
    },
    formatAudioSize(row, column, value) {
      return Math.floor(value / 1024 / 1024) + 'MB';
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
