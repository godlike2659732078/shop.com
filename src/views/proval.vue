<template>
  <div>
    <!-- 审核页面 -->
    <el-tabs v-model="activeName">
<!-- 审核页面切换菜单————全部 -->
      <el-tab-pane label="全部" name="first">
         <el-table :data="showList" border ref="table" style="width: 100%">
      <el-table-column prop="g_name" label="发起人">张三</el-table-column>
      <el-table-column prop="j_ksj" label="开始时间" align="center"></el-table-column>
      <el-table-column prop="j_jsj" label="结束时间" align="center"></el-table-column>
      <el-table-column prop="j_ts" label="天数" align="center"></el-table-column>
      <el-table-column prop="j_yy" label="原因" align="center"></el-table-column>
      <el-table-column prop="j_type" label="类型" align="center"></el-table-column>
      <el-table-column prop="j_zt" label="状态" align="center">
        <template slot-scope="scope">
          <el-button class="proval_edit" type="primary" size="mini">{{scope.row.j_zt}}</el-button>
        </template>
      </el-table-column>
          <el-table-column label="操作" width="240" align="center">
            <template slot-scope="scope">
              <el-button
                class="proval_edit"
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="look(scope.$index,scope.row)"
              ></el-button>
              <el-button
                class="proval_del"
                type="primary"
                icon="el-icon-delete"
                size="mini"
                @click.native.prevent="del(scope.$index,scope.row)"
              ></el-button>
              <el-button type="success" class="proval_pass" size="mini">通过</el-button>
              <el-button type="warning" class="proval_no" size="mini">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 待审核 -->
      <el-tab-pane label="待审核" name="second">
        <el-table :data="showList" border ref="table" style="width: 100%">
          <el-table-column prop="g_name" label="发起人">张三</el-table-column>
      <el-table-column prop="j_ksj" label="开始时间" align="center"></el-table-column>
      <el-table-column prop="j_jsj" label="结束时间" align="center"></el-table-column>
      <el-table-column prop="j_ts" label="天数" align="center"></el-table-column>
      <el-table-column prop="j_yy" label="原因" align="center"></el-table-column>
      <el-table-column prop="j_type" label="类型" align="center"></el-table-column>
      <el-table-column prop="j_zt" label="状态" align="center">
        <template slot-scope="scope">
          <el-button class="proval_edit" type="primary" size="mini">{{scope.row.j_zt}}</el-button>
        </template>
      </el-table-column>
          <el-table-column label="操作" width="240" align="center">
           <template slot-scope="scope">
              <el-button
                class="proval_edit"
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="look(scope.$index,scope.row)"
              ></el-button>
              <el-button
                class="proval_del"
                type="primary"
                icon="el-icon-delete"
                size="mini"
                @click.native.prevent="del(scope.$index,scope.row)"
              ></el-button>
              <el-button type="success" class="proval_pass" size="mini">通过</el-button>
              <el-button type="warning" class="proval_no" size="mini">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 已通过 -->
      <el-tab-pane label="已通过" name="third"></el-tab-pane>
      <!-- 已拒绝 -->
      <el-tab-pane label="已拒绝" name="for"></el-tab-pane>
    </el-tabs>
    <!-- 编辑弹窗 -->
    <el-dialog title="请假申请" width="480px" :index="index" :visible.sync="dialogEdit">
      <el-form :model="editForm">
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="editForm.j_ksj"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="editForm.j_jsj"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="天数">
          <el-input class="days" v-model="editForm.j_ts" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="editForm.j_type">
            <el-radio label="请假"></el-radio>
            <el-radio label="外出"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="原因">
          <el-input class="desc" type="textarea" size="mini" v-model="editForm.j_yy"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left:250px" type="primary" @click="subChange(index)">提交</el-button>
          <el-button @click="dialogEdit= false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getLeave, subLeave, editLeave, changeLeave } from "../network/leave";
export default {
  components: {},
  props: {},
  data() {
    return {
      usersData: [
        {
          id: 1,
          name: "张三",
          endtime: "2020-06-17 00:00:03",
          cellphone: "151178xxxx",
          tp: "外出",
          reason: "222",
          actime: "2020-06-15 00:01:00",
          active: 1,
          days: "2"
        },
        {
          id: 2,
          name: "张三",
          endtime: "2020-06-17 00:00:03",
          cellphone: "151178xxxx",
          reason: "111",
          tp: "外出",
          actime: "2020-06-15 00:01:00",
          active: 0,
          days: "2"
        }
      ],
      aaaa: [
        {
          id: 1,
          name: "张三",
          endtime: "2020-06-17 00:00:03",
          cellphone: "151178xxxx",
          tp: "外出",
          reason: "222",
          actime: "2020-06-15 00:01:00",
          active: 1,
          days: "2"
        },
        {
          id: 2,
          name: "张三",
          endtime: "2020-06-17 00:00:03",
          cellphone: "151178xxxx",
          reason: "111",
          tp: "外出",
          actime: "2020-06-15 00:01:00",
          active: 0,
          days: "2"
        }
      ],
      editForm: {},
      form: {},
      activeIndex: "1",
      activeIndex2: "1",
      activeName: "first",
      dialogEdit: false,
      index: "",
      showList:[]
    };
  },
  methods: {
  //  点击编辑按钮弹出编辑
   
    look(index, item) {
      this.dialogEdit = true;
      editLeave(this.showList[index].id).then(res => {
        console.log(res);
        this.editForm = res.data.data;
        if (this.editForm.j_type == 1) {
          this.editForm.j_type = "请假";
        } else if (this.editForm.j_type == 2) {
          this.editForm.j_type = "外出";
        }
        console.log(this.editForm);
      });

      // this.editForm = this.lookData[a];
      // this.index=a
    },
    // 提交编辑
    subChange(index) {
      this.dialogEdit = false;
      this.usersData.splice(index, 1, this.editForm);
    },
    // 删除列表某一项
    del(index, rows) {
      console.log(index);
      this.usersData.splice(index, 1);
    }
  },
    created(){
        getLeave(this.$store.state.uid).then(res => {
      console.log(res);
      this.usersData = res.data.data;

      for (let items of this.usersData) {
        // console.log(items)
        if (items.j_type == 1) {
          items.j_type = "请假";
        } else if (items.j_type == 2) {
          items.j_type = "外出";
        }
      }
      this.showList = this.usersData;
    });
  }
};
</script>
<style scoped>
.proval_edit {
  background: rgb(255, 184, 0);
  border: none;
}
.proval_del {
  background: rgb(255, 87, 34);
  border: none;
}
.proval_pass {
  border: none;
}
.proval_no {
  border: none;
}
.el-button + .el-button {
  margin-left: 0px;
}
.proval_edit {
  background: rgb(255, 184, 0);
  border: none;
}
</style>