<template>
  <div>
    <el-upload
        ref="uploadRef"
        class="upload-demo"
        :auto-upload="false"
        :file-list="fileList"
        :on-change="fileListChange"
        drag
        action="none"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        拖拽文件到此区域 或者 <em>点我上传</em>
      </div>
    </el-upload>
    <el-select v-model="audioFormat" placeholder="格式（默认MP3）">
      <el-option label="mp3" value="mp3" />
      <el-option label="flac" value="flac" />
    </el-select>
    <el-select v-model="audioBitRate" placeholder="比特率" v-if="audioFormat === 'mp3'">
      <el-option label="320Kbs" value="320Kbs" />
      <el-option label="256Kbs" value="256Kbs" />
      <el-option label="128Kbs" value="128Kbs" />
    </el-select>
    <el-button class="ml-3" type="success" @click="uploadFileList()">
      开始转换
    </el-button>
  </div>
</template>

<script>
import api from './../api/api';
export default {
  name: "AudioUpload",
  data() {
    return {
      fileList: [],
      audioFormat:'',
      audioBitRate:'',
    }
  },
  methods: {
    fileListChange(file, fileList) {
      this.fileList = fileList;
    },
    uploadFileList() {
      let formData = new FormData();
      formData.append("format",this.audioFormat);
      formData.append("birRate",this.audioBitRate);
      this.fileList.forEach(item => {
        formData.append("files", item.raw);
      });
      api.audioConvert(formData);
    }
  }
}
</script>

<style scoped>

</style>