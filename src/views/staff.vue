<template>
  <div class="isadmin">
    <!-- 信息 -->
    <!-- 搜索 -->
    <div>
      <el-input
        placeholder="请输入要搜索的员工姓名"
        size="small"
        style="width: 200px"
        v-model="isname"
        @clear="searchUser"
        clearable
      ></el-input>
      <el-button @click="searchUser" type="primary" icon="el-icon-search" size="small"></el-button>
    </div>
    <!-- 内容 -->
    <el-table :data="istable" border ref="table" style="width: 100%;" class="itab">
      <el-table-column label="照片" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.g_zp" width="60" height="60" />
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="g_name"></el-table-column>
      <el-table-column label="性别" prop="g_xb"></el-table-column>
      <el-table-column label="年龄" prop="g_nl"></el-table-column>
      <el-table-column label="民族" prop="g_mz"></el-table-column>
      <el-table-column label="手机号" prop="g_sjh"></el-table-column>
      <el-table-column label="部门" prop="bm"></el-table-column>
      <el-table-column label="职位" prop="zw"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-search"
            circle
            @click.native.prevent="editdata(scope.$index,istable)"
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click.native.prevent="deleteRow(scope.$index, istable)"
            size="mini"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-size="5"
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChage"
    ></el-pagination>
    <!-- 弹窗框 -->
    <el-dialog title="员工信息" class="allTable" :visible.sync="dialogFormVisible">
      <div class="place">
        <el-form :model="form" :label-position="labelPosition" label-width="100px">
          <el-form-item label="姓名">
            <el-input v-model="form.g_name"></el-input>
          </el-form-item>
          <el-form-item label="照片" width="120" v-model="form.g_zp">
            <img :src="form.g_zp" width="100" height="100" />
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.g_xb"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.g_nl"></el-input>
          </el-form-item>
          <el-form-item label="民族">
            <el-input v-model="form.g_mz"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.g_sjh"></el-input>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-input v-model="form.bm"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="form.zw"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button style="margin-left:400px" type="primary" @click="dialogFormVisible = false">取 消</el-button>
          </el-form-item>
          
        </el-form>
      </div>
      
    </el-dialog>
  </div>
</template>

<script>
import { admin, searchadmin } from "../network/staffadmin";
export default {
  components: {},
  props: {},
  data() {
    return {
      isname: "",
      //员工信息   暂时是死数据
      tableData: [
        {
          name: "张三",
          sex: "男",
          age: 20,
          nation: "汉",
          cellphone: "18437930195",
          department: "人资",
          post: "员工",
          url:
            "http://api.switchyl.online/public/Upload/img/2020-05-11/5eb91ecd7d93c.png"
        },
        {
          name: "李四",
          sex: "男",
          age: 20,
          nation: "汉",
          cellphone: "18437930195",
          department: "人资",
          post: "员工",
          url:
            "http://api.switchyl.online/public/Upload/img/2020-05-11/5eb91ecd7d93c.png"
        },
        {
          name: "王二",
          sex: "男",
          age: 20,
          nation: "汉",
          cellphone: "18437930195",
          department: "人资",
          post: "员工",
          url:
            "http://api.switchyl.online/public/Upload/img/2020-05-11/5eb91ecd7d93c.png"
        },
        {
          name: "赵六",
          sex: "男",
          age: 20,
          nation: "汉",
          cellphone: "18437930195",
          department: "人资",
          post: "员工",
          url:
            "http://api.switchyl.online/public/Upload/img/2020-05-11/5eb91ecd7d93c.png"
        },
        {
          name: "李七",
          sex: "男",
          age: 20,
          nation: "汉",
          cellphone: "18437930195",
          department: "人资",
          post: "员工",
          url:
            "http://api.switchyl.online/public/Upload/img/2020-05-11/5eb91ecd7d93c.png"
        }
      ],
      //搜索之后的数据
      istable: [],
      total: 0,
      // 弹框
      dialogFormVisible: false,
      labelPosition: "right",
      form: [],
      formLabelWidth: "120px"
    };
  },
  created() {
    // 调取员工列表
    let params = {
      uid: this.$store.state.uid
    };
    //console.log(params);
    admin(1).then(res => {
      console.log(res.data);
      this.istable = res.data.staff;
    });
  },
  methods: {
    // 搜索
    searchUser() {
      let params = {
        g_name: this.isname,
        uid: 1
      };
      //console.log(params);
      if (params.g_name == "") {
        this.$alert("您输入的内容为空，请检查后输入");
        return;
      } else {
        searchadmin(params).then(res => {
         
          this.istable = res.data.staff;
        });
      }

      // if (this.isname != "") {
      //   let all = this.tableData.filter(n => {
      //     if (this.isname == n.name) {
      //       return n;
      //     }
      //     //console.log(n.name);
      //   });
      //   this.istable = all;
      //   if (this.istable == "") {
      //     this.$layer.msg("抱歉，没有您查找的这个员工");
      //   }
      // } else {
      //   this.$layer.msg("您输入的为空，请重新输入");
      //   setTimeout(() => {
      //     // this.istable = this.istable;
      //   }, 1000);
      // }
    },
    //查看
    editdata(i, e) {
      this.dialogFormVisible = true;
      this.form = e[i];
    },
    // 分页
    currentChage() {},
    // 删除
    deleteRow(index, row) {
      row.splice(index, 1);
    }
  }
};
</script>
<style lang="less">
/deep/.el-table .cell {
  text-align: center;
}

.isadmin {
  .place {
    .el-input {
      width: 80%;
    }
  }
}
.allTable {
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