<template>
  <div>
    <div class="mine_box">
      <h4 class="mine_title">设置个人资料</h4>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上传照片">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input class="mine_text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input class="mine_text" v-model="form.sex"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input class="mine_text" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input class="mine_text" v-model="form.sfz"></el-input>
        </el-form-item>
        <el-form-item label="民族">
          <el-input class="mine_text" v-model="form.nation"></el-input>
        </el-form-item>
        <el-form-item label="学历">
          <el-select class="mine_text" v-model="form.education" placeholder="——请选择——">
            <el-option label="研究生" value="研究生"></el-option>
            <el-option label="博士" value="博士"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input class="mine_text" v-model="form.part"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input class="mine_text" v-model="form.position"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input class="mine_text" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input class="mine_text" v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 100px">
          <el-button type="primary" @click="onSubmit">修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      getHeaders: {
        Accept: "application/json"
      },
      form: {
        imageUrl: "",
        name: "",
        sex: "",
        age: "",
        afz: "",
        nation: "",
        education: "",
        part: "",
        position: "",
        phone: "",
        address: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      //上传前的函数
      //上传前对图片类型和大小进行判断
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      //校验成功上传文件
      if (isJPG && isLt2M == true) {
        console.log(file);

        //将文件转化为formdata数据上传
        let fd = new FormData();
        fd.append("file", file);
        console.log(fd);

        // post上传图片

      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style scoped>
.mine_box {
  width: 100%;
  background: #fff;
  padding-bottom: 20px;
  height: auto;
  padding-left: 20px;
}
.mine_title {
  height: 50px;
  line-height: 50px;
  color: #7a7a7a;
  border-bottom: 1px solid #dfdfdf;
  margin-bottom: 20px;
}
.avatar-uploader-icon[data-v-4a6811ed] {
  border: 1px dashed #a1a1a1;
}
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
.mine_text {
  width: 400px;
}
</style>