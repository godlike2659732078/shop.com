<template>
  <div>
    <div class="emp_head">
      <el-button type="primary" @click="dialogFormVisible=true" icon="el-icon-plus"></el-button>
      <div class="enter-select">
        <el-select v-model="value" placeholder="——请选择——">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
        <el-input v-model="input" class="emp_search" placeholder="请输入姓名"></el-input>
        <el-button type="primary" @click="empSearch" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <el-table
      :data="showList"
      border
      style="width: 100%"
      :header-cell-style="{background:'rgb(242, 242, 242)'}"
    >
      <el-table-column property="ImageUrl" align="center" label="照片">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="'https://fuss10.elemecdn.com/'+scope.row.ImageUrl"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" align="center" style="width: 10%;"></el-table-column>
      <el-table-column prop="gender" label="性别" align="center" style="width: 10%;"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center" style="width: 10%;"></el-table-column>
      <el-table-column prop="national" label="民族" align="center" style="width: 10%;"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center" style="width: 10%;"></el-table-column>
      <el-table-column prop="department" label="部门" align="center" style="width: 10%;"></el-table-column>
      <el-table-column prop="position" label="职位" align="center" style="width: 10%;"></el-table-column>

      <el-table-column prop="operation" label="操作" align="center" width="210px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-search"
            @click="CheckClick(scope.$index,scope.row)"
          ></el-button>

          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="ModifyClick(scope.$index,scope.row)"
          ></el-button>

          <el-button
            type="primary"
            icon="el-icon-delete"
            size="mini"
            @click.native.prevent="deleteRow(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加员工 -->
    <el-dialog title="添加员工" width="500px" class="emp_dialog" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="照片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="身份证号" :label-width="formLabelWidth">
          <el-input v-model="form.Id_number" autocomplete="off" placeholder="请输入身份证号"></el-input>
        </el-form-item>

        <el-form-item label="民族" :label-width="formLabelWidth">
          <el-input v-model="form.national" autocomplete="off" placeholder="请输入民族"></el-input>
        </el-form-item>

        <el-form-item label="学历" :label-width="formLabelWidth">
          <el-select v-model="form.education" placeholder="请选择学历">
            <el-option label="初中" value="初中"></el-option>
            <el-option label="高中" value="高中"></el-option>
            <el-option label="专科" value="专科"></el-option>
            <el-option label="本科" value="本科"></el-option>
            <el-option label="研究生" value="研究生"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off" placeholder="请输入电话"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="form.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off" placeholder="请输入年龄"></el-input>
        </el-form-item>

        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off" placeholder="请输入地址"></el-input>
        </el-form-item>

        <el-form-item label="所属部门" :label-width="formLabelWidth">
          <el-select v-model="form.department" placeholder="请选择部门">
            <el-option label="销售" value="销售"></el-option>
            <el-option label="人资" value="人资"></el-option>
            <el-option label="前端工程师" value="前端工程师"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属职位" :label-width="formLabelWidth">
          <el-select v-model="form.position" placeholder="请选择职位">
            <el-option label="经理" value="经理"></el-option>
            <el-option label="员工" value="员工"></el-option>
            <el-option label="总经理" value="总经理"></el-option>
            <el-option label="董事长" value="董事长"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属用户组" :label-width="formLabelWidth">
          <el-select v-model="form.position" placeholder="请选择用户组">
            <el-option label="boss" value="boss"></el-option>
            <el-option label="人资员工" value="人资员工"></el-option>
            <el-option label="人资经理" value="人资经理"></el-option>
            <el-option label="销售员工" value="销售员工"></el-option>
            <el-option label="销售经理" value="销售经理"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item :label-width="formLabelWidth">
<el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">添 加</el-button>
         </el-form-item>
      </el-form>
     
    </el-dialog>

    <!-- 查看员工信息 -->
    <el-dialog
      title="员工信息"
      width="500px"
      class="emp_dialog"
      :visible.sync="dialogFormVisible2"
      :index="index"
    >
      <el-form :model="checkfrom">
        <el-form-item label="照片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="checkfrom.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="checkfrom.gender" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="checkfrom.age" autocomplete="off" placeholder="请输入年龄"></el-input>
        </el-form-item>

        <el-form-item label="身份证号" :label-width="formLabelWidth">
          <el-input v-model="checkfrom.Id_number" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="民族" :label-width="formLabelWidth">
          <el-input v-model="checkfrom.national" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="学历" :label-width="formLabelWidth">
          <el-input v-model="checkfrom.education" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="checkfrom.address" autocomplete="off" placeholder="请输入地址"></el-input>
        </el-form-item>

        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="checkfrom.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="所属部门" :label-width="formLabelWidth">
          <el-input v-model="checkfrom.department" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="checkfrom.position" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" style="margin-left:200px">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 修改员工信息 -->
    <el-dialog
      title="员工信息"
      width="500px"
      class="emp_dialog"
      :visible.sync="dialogFormVisible3"
      :index="index"
    >
      <el-form :model="editform">
        <!-- <el-form-item label="照片" :label-width="formLabelWidth">
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>-->
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="editform.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="editform.gender" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="editform.age" autocomplete="off" placeholder="请输入年龄"></el-input>
        </el-form-item>

        <el-form-item label="身份证号" :label-width="formLabelWidth">
          <el-input v-model="editform.Id_number" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="民族" :label-width="formLabelWidth">
          <el-input v-model="editform.national" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="学历" :label-width="formLabelWidth">
          <el-input v-model="editform.education" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="editform.address" autocomplete="off" placeholder="请输入地址"></el-input>
        </el-form-item>

        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="editform.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="所属部门" :label-width="formLabelWidth">
          <el-input v-model="editform.department" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="editform.position" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  :label-width="formLabelWidth">
 <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button @click="Modify(index)">修改</el-button>
        </el-form-item>
      </el-form>
     
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      options: [
        
        {
          value: "选项1",
          label: "销售"
        },
        {
          value: "选项2",
          label: "人资"
        },
        {
          value: "选项3",
          label: "前端工程师"
        }
      ],
      tableData: [
        {
          ImageUrl: "e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "222",
          gender: "男",
          age: "18",
          national: "汉",
          phone: "183177718573",
          department: "人资",
          position: "员工",
          Id_number: "410581199909249050",
          education: "专科",
          address: "河南省"
        },
        {
          ImageUrl: "e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "666",
          gender: "男",
          age: "18",
          national: "汉",
          phone: "183177718573",
          department: "销售",
          position: "员工",
          Id_number: "410581199909249050",
          education: "专科",
          address: "河南省"
        },
        {
          ImageUrl: "e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "111",
          gender: "男",
          age: "18",
          national: "汉",
          phone: "183177718573",
          department: "销售",
          position: "员工",
          Id_number: "410581199909249050",
          education: "本科",
          address: "河南省"
        },
        {
          ImageUrl: "e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "333",
          gender: "男",
          age: "18",
          national: "汉",
          phone: "183177718573",
          department: "前端工程师",
          position: "大老板",
          Id_number: "410581199909249050",
          education: "本科",
          address: "河南省"
        }
      ],
      tableData2: [
        {
          ImageUrl: "e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "111",
          gender: "男",
          age: "18",
          national: "汉",
          phone: "183177718573",
          department: "人资",
          position: "员工",
          Id_number: "410581199909249050",
          education: "专科",
          address: "河南省"
        },
        {
          ImageUrl: "e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "111",
          gender: "男",
          age: "18",
          national: "汉",
          phone: "183177718573",
          department: "人资",
          position: "员工",
          Id_number: "410581199909249050",
          education: "本科",
          address: "河南省"
        }
      ],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      form: {
        imageUrl: "",
        name: "",
        Id_number: "",
        national: "",
        education: "",
        phone: "",
        password: "",
        gender: "",
        age: "",
        address: "",
        department: "",
        position: ""
      },
      checkfrom: {}, //查看
      editform: {}, //修改
      formLabelWidth: "120px",
      index: "",
      value: "",
      input: "",
      showList: []
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //录入员工
    add() {
      this.dialogFormVisible = false;
      this.tableData.push(this.form);
      this.tableData2.push(this.form);
      console.log(this.form);
    },
    // 搜索员工
    empSearch() {
      this.showList = [];
      for (let item of this.tableData) {
        if (this.value == "" && item.name == this.input) {
          this.showList.push(item);
          console.log(this.showList);
        } else if (item.department == this.value && item.name == this.input) {
          this.showList.push(item);
          console.log(this.showList);
        } else if (item.department == this.value && this.input == "") {
          this.showList.push(item);
          console.log(this.showList);
        } else if (this.value == "" && this.input == "") {
         this.showList=this.tableData
        }
      }

      // console.log(this.showList);
      // console.log(this.input);
    }, //查看员工信息
    CheckClick(index, rows) {
      this.dialogFormVisible2 = true;
      this.checkfrom = this.tableData[index];
      this.index = this.index;
    },
    //修改员工信息
    ModifyClick(index, rows) {
      this.dialogFormVisible3 = true;
      this.editform = this.tableData2[index];
      console.log(this.tableData2);
      this.index = index;
    },
    //删除
    deleteRow(index, rows) {
      console.log(index, rows);
      this.tableData.splice(index, 1);
    },
    //修改
    Modify(index) {
      this.dialogFormVisible3 = false;
      this.index = index;
      this.tableData.splice(index, 1, this.editform); //修改
      console.log(this.tableData);
    }
  },
  created() {
    this.showList = this.tableData;
    
  }
};
</script>
<style lang="less" >
.emp_head {
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  margin-top: 20px;
}
.el-form-item__label {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.emp_search {
  width: 200px;
}
.emp_dialog {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
  .el-dialog {
    margin: 20 auto !important;
    height: 70%;
    overflow: hidden;
    .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0;
      right: 0;
      padding: 0px 20px;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
    }
  }
}
</style>