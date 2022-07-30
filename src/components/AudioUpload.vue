<template>
  <div>
    <el-upload
        :auto-upload="false"
        :file-list="fileList"
        :on-change="fileListChange"
        drag
        action="none"
        :show-file-list="false"
    >
      <el-icon class="el-icon--upload">
        <upload-filled/>
      </el-icon>
      <div class="el-upload__text">
        拖拽文件到此区域 或者 <em>点我上传</em>
      </div>
    </el-upload>
    <el-select v-model="audioFormat" placeholder="格式（默认MP3）">
      <el-option label="mp3" value="mp3"/>
      <el-option label="flac" value="flac"/>
    </el-select>
    <el-select v-model="audioBitRate" placeholder="比特率" v-if="audioFormat === 'mp3'">
      <el-option label="320Kbs" value="320Kbs"/>
      <el-option label="256Kbs" value="256Kbs"/>
      <el-option label="128Kbs" value="128Kbs"/>
    </el-select>
    <el-button type="primary" @click="uploadFileList()">
      开始转换
    </el-button>
    <el-button type="danger" @click="clearFileList()">
      清空
    </el-button>
  </div>
  <div>
    <el-table
        :data="fileList"
        style="width: 100%"
        v-if="fileList.length > 0"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column property="name" label="名称"/>
      <el-table-column property="size" label="大小" :formatter="formatAudioSize"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="danger" circle @click="deleteFile(scope.row.name)">
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
  name: "AudioUpload",
  data() {
    return {
      fileList: [],
      audioFormat: '',
      audioBitRate: '',
    }
  },
  methods: {
    fileListChange(file, fileList) {
      this.fileList = fileList;
    },
    uploadFileList() {
      let formData = new FormData();
      formData.append("format", this.audioFormat);
      formData.append("birRate", this.audioBitRate);
      this.fileList.forEach(item => {
        formData.append("files", item.raw);
      });
      // todo 回调刷新列表
      api.audioConvert(formData);
    },
    deleteFile(fileName) {
      this.fileList.splice(this.fileList.indexOf(this.fileList.find(element => element.name === fileName)), 1);
    },
    clearFileList() {
      this.fileList = [];
    },
    formatAudioSize(row, column, value) {
      return Math.floor(value / 1024 / 1024) + 'MB';
    }
  }
}
</script>

<style scoped>

</style>