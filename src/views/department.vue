<template>
  <div>
    <div>
      <el-button type="primary" @click="adddepartment" icon="el-icon-plus"></el-button>
      <el-table :data="showList" border style="width: 100%" :header-cell-style="{background:'rgb(242, 242, 242)'}">
        <el-table-column prop="id" label="id" align="center" style="width: 20%;"></el-table-column>
        <el-table-column prop="m_name" label="名称" align="center" style="width: 20%;"></el-table-column>
        <el-table-column prop="m_type" label="类型" align="center" style="width: 20%;"></el-table-column>
        <el-table-column prop="px" label="排序" align="center" style="width: 20%;"></el-table-column>

        <el-table-column prop="operation" label="操作" align="center" style="width: 20%;">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="ModifyClick(scope.$index,scope.row)">
            </el-button>

            <el-button type="primary" icon="el-icon-delete" size="mini"
              @click.native.prevent="deleteRow(scope.$index, scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加部门 -->
      <el-dialog title="添加部门/职位" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.m_name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-radio-group v-model="form.m_type">
              <el-radio label="部门" @change="hiddenselect"></el-radio>
              <el-radio label="职位" @change="showselects"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="上级职位" :label-width="formLabelWidth" v-if="showselect">
            <el-select v-model="form.m_fid" placeholder="请选择上级职位">
              <el-option label="经理" value="经理"></el-option>
              <el-option label="董事长" value="董事长"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">添 加</el-button>
        </div>
      </el-dialog>
      <!-- 修改部门 -->
      <el-dialog title="修改部门/职位" :visible.sync="dialogFormVisible2" :index="index">
        <el-form :model="editform">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="editform.m_name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-radio-group v-model="editform.m_type">
              <el-radio label="部门" @change="hiddenselect"></el-radio>
              <el-radio label="职位" @change="showselects"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="上级职位" :label-width="formLabelWidth" v-if="showselect">
            <el-select v-model="editform.m_fid" placeholder="请选择上级职位">
              <el-option label="经理" value="经理"></el-option>
              <el-option label="董事长" value="董事长"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="Modify(index)">修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {
    getDepart
  } from "../network/department.js";
  import {
    addDepart
  } from "../network/department.js";

  import {
    ModifyDepart
  } from "../network/department.js";
  export default {
    components: {},
    props: {},
    data() {
      return {
        tableData: [],
        showList: [],
        dialogFormVisible: false,
        dialogFormVisible2: false,
        showselect: false,
        form: {
          id: "",
          m_name: "",
          m_fid: "",
          m_type: "",

        },
        editform: {
          id: "",
          m_name: "",
          m_fid: "",
          m_type: "",
        },
        modify: {},

        formLabelWidth: "120px",
        index: ""
      };
    },
    methods: {
      //修改部门
      ModifyClick(index, rows) {
        this.dialogFormVisible2 = true;
        this.editform = this.showList[index];
        this.editform = this.tableData[index];
        console.log(rows);
        this.index = index;
      },
      //修改
      Modify(index) {
        console.log(index);
        this.dialogFormVisible2 = false;
        let uid = this.$store.state.uid;
        let m_name = this.editform.m_name;
        let m_type = this.editform.m_type;
        let m_fid = this.editform.m_fid;
        let id = this.editform.id;
        ModifyDepart(uid, m_name, m_type, m_fid, id).then(res => {
          console.log(res);

        });
        this.showList.splice(index, 1, this.editform); //修改
        this.tableData.splice(index, 1, this.editform); //修改

        console.log(this.showList);
      },
      //删除
      deleteRow(index, rows) {
        this.tableData.splice(index, 1);
      },
      //隐藏职位
      hiddenselect() {
        this.showselect = false;
      },
      //显示职位
      showselects() {
        this.showselect = true;
      },
      //添加按钮
      adddepartment() {
        this.dialogFormVisible = true;
        //添加部门
        let uid = this.$store.state.uid;
        let m_name = this.form.m_name;
        let m_type = this.form.m_type;
        let m_fid = this.form.m_fid;
        ModifyDepart(uid, m_name, m_type, m_fid, ).then(res => {
          console.log(res);

        });
      },

      //添加部门
      add() {
        this.dialogFormVisible = false;
        this.tableData.push(this.form);
        this.showList.push(this.form);
        console.log(this.tableData);
      },
    },


    created() {
      //获取部门列表
      getDepart(this.$store.state.uid).then(res => {
        console.log(res);
        this.tableData = res.data.data;
        this.showList = this.tableData;
      });



    }
  };
</script>
<style scoped>
</style>