
<template>
  <div>
    <el-button type="primary" @click="userGroupShow" style="margin-top:20px;">
      <i class="el-icon-plus"></i>
    </el-button>

    <!-- 表格 -->

    <el-table :data="tableData" border ref="table" style="width: 100%;">
      <el-table-column prop="id" label="id" width="200px" align="center"></el-table-column>
      <el-table-column prop="group" label="用户组名" width="160px" align="center"></el-table-column>
      <el-table-column prop="qx" label="权限" align="center"></el-table-column>
      <el-table-column label="操作" width="180px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" class="table-edit" size="mini" @click="userGroupEdit">
            <i class="el-icon-edit"></i>
          </el-button>

          <el-button
            class="table-del"
            type="primary"
            size="mini"
            @click.native.prevent="delUserGroupRow(scope.index, tableData)"
          >
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹框 -->
    <el-dialog class="allTable" title="添加用户组" :visible.sync="dialogVisible" width="40%">
      <!-- 用户组名 -->
用户名：
      <el-input  v-model="userinput" placeholder="请输入用户组名"></el-input>
      <!-- 选择权限 -->
      <el-tree
        :data="data"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
      ></el-tree>

      <div class="dialog-footer">
        <el-button @click="resetChecked">清空</el-button>
        <el-button type="primary" @click="getCheckedKeys">添 加</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 弹框 -->
    <el-dialog class="allTable" title="添加用户组" :visible.sync="editgroups" width="40%">
      <!-- 用户组名 -->
      <div class="usergroup-input">
        <p>
          用户组名
          <span>
            <el-input v-model="userinput" placeholder="请输入用户组名"></el-input>
          </span>
        </p>
      </div>
      <!-- 选择权限 -->
      <el-tree
        :data="data"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
      ></el-tree>
      <div class="dialog-footer">
        <el-button @click="resetChecked">清空</el-button>
        <el-button type="primary" @click="editqx">提交</el-button>
        <el-button @click="editgroups = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: [
        {
          id: "1",
          group: "销售经理",
          qx: "63,43,40,13,39,12,10,51,65,42,18,41,17,69,68,67,66,11"
        },
        {
          id: "1",
          group: "销售经理",
          qx: ["63,43,40,13,39,12,10,51,65,42,18,41,17,69,68,67,66,11"]
        }
      ],
      dialogVisible: false,
      editgroups: false,
      userinput: "",
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      showList: [],
    };
  },
  methods: {
    // 添加权限列表项
    getCheckedKeys() {
      this.dialogVisible=false
      let arr = [];
      for (let items of this.$refs.tree.getCheckedKeys()) {
        arr.push(items + ",");
      }
      console.log(arr);
      let a = {
        id: 1,
        group: this.userinput,
        qx: arr
      };
      this.tableData.push(a);
    },
    // 确认修改
    editqx(){

    },
    // 重置权限框
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    // 修改弹窗显示
    userGroupEdit() {
      this.editgroups = true;
    },
    // 删除列表项
    delUserGroupRow(index, rows) {
      rows.splice(index, 1);
    },
    // 点击显示添加弹框
    userGroupShow() {
      this.dialogVisible = true;
    }
  },

};
</script>
<style lang="less" scoped>
.userGroup-bg {
  background: #fff;
  line-height: 8px;
  margin-top: 0px;
}
.enter-select {
  margin-left: 86%;
  width: 30%;
  margin-top: 20px;
}
.enter-input .el-input {
  width: 50%;
  margin-top: 20px;
}
.enter-button .el-button {
  position: absolute;
  margin-top: -40px;
  margin-left: 58%;
  position: absolute;
}
.enter-button {
  position: relative;
}
.table-button .el-button {
  width: 10%;
  height: 10%;
  line-height: 10px;
  margin: 0 auto;
  background: #009688;
  color: #ffffff;
  font-size: 14px;
}
.table-button i {
  display: flex;
  justify-content: center;
}
.table-edit {
  line-height: 10px;
  margin: 0 auto;
  background: #ffb800;
  color: #ffffff;
  font-size: 14px;
  border: 0;
}
.table-edit i {
  display: flex;
  justify-content: center;
}
.table-del {
  line-height: 10px;
  margin: 0 auto;
  background: #ff5722;
  color: #ffffff;
  font-size: 14px;
  border: 0;
}
.table-del i {
  display: flex;
  justify-content: center;
}
.con p {
  font-size: 16px;
  margin-left: 80px;
}
.el-input {
  width: 180px;
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
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.avatar-uploader {
  border: 1px dashed rgb(109, 108, 108);
  width: 100px;
  height: 100px;
  margin-left: 150px;
  margin-top: 30px;
}
.enter-photo {
  position: relative;
}
.text {
  margin-left: 80px;
  margin-top: 10px;
  position: absolute;
}
.usergroup-input {
  font-size: 16px;
  margin-left: 60px;
  margin-top: 30px;
}

.usergroup-input {
  margin-left: 70px;
  margin-top: 30px;
  font-size: 16px;
}

.el-input {
  width: 30%;
}
.con-three .el-select {
  width: 61%;
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
.dialog-footer {
  margin-left: 30px;
  margin-top: 50px;
}
.usergroup-tree p {
  padding-left: 82px;
  font-size: 16px;
  padding-top: 20px;
}
.usergroup-tree .qx-tree {
  margin-left: 170px;
}
</style>