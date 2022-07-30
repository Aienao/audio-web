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
    }
  },
  methods: {
    fileListChange(file, fileList) {
      this.fileList = fileList;
    },
    uploadFileList() {
      let formData = new FormData();
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