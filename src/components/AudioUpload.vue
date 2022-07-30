<template>
  <div>
    <el-upload
        ref="uploadRef"
        class="upload-demo"
        :auto-upload="false"
        :file-list="fileList"
        :on-change="fileListChange"
    >
      <template #trigger>
        <el-button type="primary">select file</el-button>
      </template>

      <el-button class="ml-3" type="success" @click="uploadFileList()">
        upload to server
      </el-button>

    </el-upload>
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