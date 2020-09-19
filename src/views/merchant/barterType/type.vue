<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">分销团队</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <!-- 用户信息列表 -->
      <div class="userList">
        <div class="userList_head">
          <el-button
            type="primary"
            size="large"
            style="border:none;border-radius:2px;margin-right:10px"
            @click="gotoAdd"
            icon="el-icon-plus"
          >增加</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width:100% overflow:scroll"
          class="userList_table"
        >
          <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>

          <el-table-column align="left" prop="typeName" label="分类名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="createTime" label="创建时间" width="200"></el-table-column>
          <el-table-column align="center" label="操作" fixed="right" width="161">
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="mini"
                style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
                icon="el-icon-edit"
                @click="change(scope.row)"
              >编辑</el-button>
              <el-button
                type="warning"
                size="mini"
                style="background-color:#ff5722;border:none;border-radius:2px;margin-right:10px"
                icon="el-icon-delete"
                @click="delTeam(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages"
        ></el-pagination>
      </div>
      <!-- 编辑用户信息列表 -->
      <el-dialog width="400px" title="添加" class="delTable" :visible.sync="add">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="editForm"
          :index="index"
        >
          <el-form-item label="分类名称">
            <el-input v-model="editForm.typeName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="subChange">立即提交</el-button>
            <el-button style="margin-left:60px" @click="add=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 添加用户信息列表 -->
      <el-dialog width="400px" title="添加" class="delTable" :visible.sync="edit">
        <el-form :label-position="labelPosition" label-width="80px" :value="addForm" :index="index">
          <el-form-item label="分类名称">
            <el-input v-model="addForm.typeName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="subAdd">立即提交</el-button>
            <el-button style="margin-left:60px" @click="edit= false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { TimeSelect } from "element-ui";
import {
  findAllType,
  addType,
  delType,
  changeType,
} from "../../../network/merchant";
export default {
  components: {},
  data() {
    return {
      username: "",
      phone: "",
      address: "",
      user_addTime: "",
      user_loginTime: "",
      tableData: [],
      currentPage4: 1,
      pages: null,
      multipleSelection: [],
      page: 1,
      limit: 10,
      params: {
        name: "",
      },

      lookform: {},
      addForm: {
        typeName: "",
        id: "",
      },
      editForm: {
        typeName: "",
      },

      labelPosition: "left",
      edit: false,
      add: false,
      index: "",
    };
  },
  watch: {
    page() {
          let obj = {
        page: this.page,
        limit: this.limit,
      };
      findAllType(obj).then((res) => {
       // console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
    limit() {
          let obj = {
        page: this.page,
        limit: this.limit,
      };
      findAllType(obj).then((res) => {
       // console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
  },
  methods: {
    getList() {
      let obj = {
        page: this.page,
        limit: this.limit,
      };
      findAllType(obj).then((res) => {
       // console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },

    // 点击编辑事件
    change(res) {
      (this.add = true),
        (this.editForm.id = res.id),
        (this.editForm.typeName = res.typeName);
    },
    subChange() {
      let obj = this.$qs.stringify(this.editForm);
      changeType(obj).then((res) => {
        if (res.code == 0) {
          this.add = false;
          this.$message({
            message: res.msg,
            type: "success",
          });

          this.getList();
        } else {
          this.$message.error("操作失败！");
        }
      });
    },
    // 提交添加内容事件
    subAdd() {
      console.log();
      console.log(this.addForm);
      if (this.addForm.typeName == "") {
        this.$message("分类名称不可为空");
        return false;
      }
      let obj = this.$qs.stringify(this.addForm);
      console.log(obj);
      addType(obj).then((res) => {
       // console.log(res);
        if (res.code == 0) {
          this.edit = false;
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.getList();
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    // 删除单条数据
    delTeam(res) {
      this.$confirm("确认批量删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = {
            id: res.id,
          };
          delType(obj).then((res) => {
           // console.log(res);
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: res.msg,
              });
            } else {
              this.$message.error("操作失败！");
            }
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作",
          });
        });
    },
    // 页面数量
    handleSizeChange(val) {
      this.limit = 10;
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    gotoAdd() {
      this.edit = true;
    },
    gotoCredits(res) {
      // this.$router.push({ path: "/credits", query: { uId: res.uId } });
    },
  },

  created() {
    let obj = {
      page: this.page,
      limit: this.limit,
    };
    findAllType(obj).then((res) => {
     // console.log(res);
      this.tableData = res.data;
      this.pages = res.count;
    });
  },
  mounted() {},
};
</script>
<style lang="less">
.user-list {
  background: #fff;
}
.table_title {
  display: block;
  font-size: 14px;
  height: 43px;
  line-height: 43px;
  padding: 0px 15px;
}
.userList_content {
  width: 100%;
  height: auto;
  padding: 15px;
  box-sizing: border-box;
}
.userList {
  background-color: #f2f2f2;
  border: 1px solid #e6e6e6;
  width: 100%;
  margin-top: 10px;
}
.cell {
  margin: 5px 0px;
}
.userList_head {
  padding: 10px 15px;
  border-bottom: 1px solid #ebeef5;
}
.userList_table {
  th {
    padding: 0 !important; //必须加important，不然覆盖优先级不够高
    height: auto; //你需要设置的高度
    line-height: 50px;
  }
  td {
    padding: 0 !important;
    height: auto;
    line-height: 50px;
  }
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 5px 5px;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
}
.showSelf {
  display: flex;
  width: 600px;
  justify-content: space-between;
  align-items: center;
}
.showSelf img {
  max-width: 100px;
  max-height: 100px;
}
.userserch_block {
  font-size: 14px;
  color: #666;
}
.el-button + .el-button {
  margin-left: 0px;
}
.el-menu-demo {
  display: block;
  width: 500px;
}
.delTable {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
  .el-dialog {
    margin: 20 auto !important;
    height: 20%;
    overflow: hidden;
    .el-dialog__body {
      position: absolute;
      display: flex;
      align-items: center;
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
.timeline {
  margin-left: 20px;
}
.user_edit {
  background: rgb(255, 184, 0);
  border: none;
}
.user_look {
  border: none;
}
</style>
