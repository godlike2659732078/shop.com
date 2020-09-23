<template>
  <div class="user-list">
    <el-table :data="usersData" border ref="table" style="width: 100%">
      <el-table-column prop="y_name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="y_xb" label="性别" align="center"></el-table-column>
      <el-table-column prop="y_nl" label="年龄" align="center"></el-table-column>
      <el-table-column prop="y_sjh" label="手机号" align="center"></el-table-column>
      <el-table-column prop="y_dz" label="地址" align="center"></el-table-column>
      <el-table-column prop="y_wx" label="微信" align="center"></el-table-column>
      <el-table-column prop="y_qq" label="QQ" align="center"></el-table-column>
      <el-table-column prop="y_sj" label="创建时间" align="center">2020-06-15</el-table-column>
      <el-table-column prop="cjr" label="创建人" align="center">admin</el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            class="user_look"
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="look(scope.$index,scope.row)"
          ></el-button>
          <el-button
            class="user_edit"
            type="primary"
            size="mini"
            @click="eidt(scope.$index,scope.row)"
          >申领</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog width="500px" title="用户信息" class="allTable" :visible.sync="dialogTableVisible">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户信息" name="first">
          <el-form :label-position="labelPosition" label-width="80px" :model="lookform">
            <el-form-item label="姓名">
              <el-input :value="lookform.y_name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="lookform.y_xb">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input :value="lookform.y_nl"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input :value="lookform.y_dz"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input :value="lookform.y_sjh"></el-input>
            </el-form-item>
            <el-form-item label="微信">
              <el-input :value="lookform.y_wx"></el-input>
            </el-form-item>
            <el-form-item label="QQ">
              <el-input :value="lookform.y_qq"></el-input>
            </el-form-item>
            <el-form-item label="创建人">
              <el-input :value="lookform.cjr"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input :value="lookform.y_sj"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="成交商品" name="second">
          <el-table :data="subData" style="width: 100%">
            <el-table-column prop="product" label="产品" width="90px"></el-table-column>
            <el-table-column prop="price" label="单价" width="90px"></el-table-column>
            <el-table-column prop="sum" label="总价" width="90px"></el-table-column>
            <el-table-column prop="num" label="数量" width="90px"></el-table-column>
            <el-table-column prop="name" label="成交人" width="90px"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="跟踪进程" name="third">
          <el-timeline class="timeline">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :color="activity.color"
              :timestamp="activity.timestamp"
            >{{activity.content}}</el-timeline-item>
          </el-timeline>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
// import { getSeapool,getUser } from "../network/sea";
export default {
  data() {
    return {
      params: {
        name: ""
      },
      form: {
        id: "",
        name: "",
        nickname: "",
        age: "",
        cellphone: "",
        QQ: "",
        wx: "",
        place: "",
        tp: ""
      },
      subData: [
        {
          product: "火箭",
          price: "199",
          sum: "398",
          num: "2",
          name: "张三"
        },
        {
          product: "飞船",
          price: "199",
          sum: "398",
          num: "2",
          name: "李四"
        }
      ],
      usersData: [
       
       
      ],
      usersData2: [
        {
          id: 1,
          name: "张三",
          nickname: "管理员",
          age: "19",
          cellphone: "151178xxxx",
          QQ: "2222222",
          wx: "111111",
          place: "洛职",
          tp: "男",
          active: 1
        },
        {
          id: 2,
          name: "李四",
          nickname: "森林",
          age: "20",
          cellphone: "151178xxxx",
          QQ: "111111",
          wx: "2222222",
          place: "洛职",
          tp: "女",
          active: 0
        }
      ],
      lookform: {},
      activities: [
        {
          content: "这是一个进程",
          timestamp: "张三提交于：2018-04-12 20:46",
          color: "#0bbd87"
        },
        {
          content: "这是一个进程",
          timestamp: "张三提交于：2018-04-12 20:46",
          color: "#0bbd87"
        },
        {
          content: "这是一个进程",
          timestamp: "张三提交于：2018-04-12 20:46",
          color: "#0bbd87"
        },
        {
          content: "这是一个进程",
          timestamp: "张三提交于：2018-04-12 20:46",
          color: "#0bbd87"
        }
      ],
      editForm: {},
      labelPosition: "left",
      dialogTableVisible: false,
      activeIndex: "1",
      activeIndex2: "1",
      activeName: "first",
      appendLog: false,
      time: "2020-06-15",
      site: "admin",
      edit: false,
      index: ""
    };
  },
  methods: {
    look(a, b) {
      this.dialogTableVisible = true;
      this.lookform = b;
    },
    sub() {
      this.appendLog = false;
      this.usersData.push(this.form);
      console.log(this.usersData);
    },
    // 申领
    eidt(index, rows) {
     let obj={
       uid:this.$store.state.uid,
       id:rows.id
     }
     getUser(obj).then(res=>{
       console.log(res)
     })
    },
   
  },
  components: {},
  created() {
    getSeapool(this.$store.state.uid).then(res => {
      console.log(res);
      this.usersData=res.data
    });
  }
};
</script>
<style lang="less">
.el-button + .el-button {
  margin-left: 0px;
}
.el-menu-demo {
  display: block;
  width: 500px;
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
