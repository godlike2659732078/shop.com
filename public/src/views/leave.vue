<template>
  <div>
    <!-- 请假页面 -->
    <div class="leave_head">
      <!-- 添加请假申请 -->
      <el-button type="primary" icon="el-icon-plus" @click="dialogTableVisible = true"></el-button>
      <div class="block">
        <el-date-picker v-model="date1" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        <el-date-picker v-model="date2" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        <el-button type="primary" @click="serchData">查询</el-button>
      </div>
    </div>
    <!-- 请假申请弹窗 -->
    <el-dialog title="请假申请" width="480px" :visible.sync="dialogTableVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="开始时间">
          <el-date-picker
            :required="true"
            v-model="form.actime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="form.endtime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="天数" prop="days">
          <el-input class="days" v-model="form.days" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.tp">
            <el-radio label="请假"></el-radio>
            <el-radio label="外出"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="原因">
          <el-input class="desc" type="textarea" size="mini" v-model="form.reason"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left:250px" type="primary" @click="sub">提交</el-button>
          <el-button @click="dialogTableVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 请假申请列表 -->
    <el-table :data="showList" border ref="table" style="width: 100%">
      <el-table-column prop="g_name" label="发起人">张三</el-table-column>
      <el-table-column prop="j_ksj" label="开始时间" align="center"></el-table-column>
      <el-table-column prop="j_jsj" label="结束时间" align="center"></el-table-column>
      <el-table-column prop="j_ts" label="天数" align="center"></el-table-column>
      <el-table-column prop="j_yy" label="原因" align="center"></el-table-column>
      <el-table-column prop="j_type" label="类型" align="center"></el-table-column>
      <el-table-column prop="j_zt" label="状态" align="center">
        <template slot-scope="scope">
          <el-button class="edit" type="primary" size="mini">{{scope.row.j_zt}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            class="edit"
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="look(scope.$index,scope.row)"
          ></el-button>
          <el-button
            class="del"
            type="primary"
            icon="el-icon-delete"
            size="mini"
            @click.native.prevent="del(scope.$index,scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑请假申请 -->
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
      editForm: {},
      form: {
        actime: "",
        endtime: "",
        days: "",
        tp: "",
        reason: ""
      },
      usersData: [],

      formLabelWidth: "120px",

      value2: "",
      dialogTableVisible: false,
      dialogEdit: false,
      date1: "",
      date2: "",
      showList: [],
      rules: {},
      index: ""
    };
  },
  methods: {
    // 请假申请提交
    sub() {
      console.log(this.form);
      let type = "";
      if (this.form.tp == "请假") {
        type = 1;
      } else if (this.form.tp == "外出") {
        type = 2;
      }
      let obj = {
        j_ygid: this.$store.state.uid,
        j_ksj: this.form.actime,
        j_ts: this.form.days,
        j_yy: this.form.reason,
        j_type: type
      };

      console.log(obj);
      subLeave(obj).then(res => {
        console.log(res);
        this.$alert(res.data.info);
        this.dialogTableVisible = false;
        this.$router.go(0);
        console.log(this.showList);
      });
    },
    // 编辑弹窗
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
    // 提交新的编辑
    subChange(index) {
      this.dialogEdit = false;
      let type = "";
      if (this.editForm.j_type == "请假") {
        type = 1;
      } else if (this.editForm.j_type == "外出") {
        type = 2;
      }
      let ab = {
        j_ygid: 15,
        id: this.editForm.id,
        j_ksj: this.editForm.j_ksj,
        j_ts: this.editForm.j_ts,
        j_yy: this.editForm.j_yy,
        j_type: type
      };
      console.log(ab);
      changeLeave(ab).then(res => {
        console.log(res);
         this.$router.go(0);
        this.$alert(res.data.info);
      });

      // this.usersData.splice(index, 1, this.editForm);
    },
    // 删除列表某一项
    del(index, rows) {
      console.log(index);
      this.usersData.splice(index, 1);
    },
    // 搜索时间段
    serchData() {
      console.log(this.showList);
      if (
        (this.date1 == "" || this.date1 == null) &&
        (this.date2 == "" || this.date2 == null)
      ) {
        this.showList = this.usersData;
      } else if (
        (this.date1 != "" || this.date1 != null) &&
        (this.date2 == "" || this.date2 == null)
      ) {
        this.showList = this.usersData.filter(res => {
          if (res.j_ksj >= this.date1) {
            return res;
          }
        });
      } else if ((this.date1 == "" || this.date1 == null) && this.date2 != "") {
        this.showList = this.usersData.filter(res => {
          if (res.j_ksj <= this.date2) {
            return res;
          }
        });
      } else {
        this.showList = this.usersData.filter(res => {
          if (res.j_ksj <= this.date2 && res.j_ksj >= this.date1) {
            return res;
          }
        });
      }
    }
  },
  created() {
    let uid = this.$store.state.uid;
    let sj = "2020-01-01";
    getLeave(uid, sj).then(res => {
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
  // updated() {
  //   getLeave(this.$store.state.uid).then(res => {
  //     this.usersData = res.data.data;

  //     for (let items of this.usersData) {
  //       // console.log(items)
  //       if (items.j_type == 1) {
  //         items.j_type = "请假";
  //       } else if (items.j_type == 2) {
  //         items.j_type = "外出";
  //       }
  //     }
  //     this.showList = this.usersData;
  //   });
  // }
};
</script>
<style lang="less" scoped>
.days {
  width: 400px;
}
.desc {
  width: 400px;
}
.el-button + .el-button {
  margin-left: 0px;
}
.edit {
  background: rgb(255, 184, 0);
  border: none;
}
.del {
  background: rgb(255, 87, 34);
  border: none;
}
.leave_head {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0px 0px;
  margin-bottom: 4px;
}
</style>