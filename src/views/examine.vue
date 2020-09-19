<template>
  <div class="user-list">
    <!-- 用户信息审核列表信息 -->
    <el-table :data="usersData" border ref="table" style="width: 100%">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="cellphone" label="手机号"></el-table-column>
      <el-table-column prop="place" label="地址"></el-table-column>
      <el-table-column prop="cellphone" label="微信"></el-table-column>
      <el-table-column prop="cellphone" label="QQ"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
              @click="look(scope.$index,scope.row)"
          ></el-button>
          <el-button type="success" size="mini">通过</el-button>
          <el-button type="warning" size="mini">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 查看页面弹框 -->
    <el-dialog width="500px" title="用户信息" class="allTable" :visible.sync="dialogTableVisible">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户信息" name="first">
          <el-form :label-position="labelPosition" label-width="80px" :model="form">
            <el-form-item label="用户id">
              <el-input :value="form.id"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input :value="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-input :value="form.sex"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input :value="form.age"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input :value="form.place"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input :value="form.cellphone"></el-input>
            </el-form-item>
            <el-form-item label="微信">
              <el-input :value="form.cellphone"></el-input>
            </el-form-item>
            <el-form-item label="QQ">
              <el-input :value="form.cellphone"></el-input>
            </el-form-item>
            <el-form-item label="创建人">
              <el-input :value="form.name"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input :value="form.type"></el-input>
            </el-form-item>
            <el-form-item label="所属">
              <el-input :value="form.type"></el-input>
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
export default {
  data() {
    return {
      params: {
        name: ""
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
        {
          id: 1,
          name: "张三",
          nickname: "管理员",
          age: "19",
          cellphone: "151178xxxx",
          place: "洛职",
          sex: "男",
          active: 1
        },
        {
          id: 2,
          name: "李四",
          nickname: "森林",
          age: "20",
          cellphone: "151178xxxx",
          place: "洛职",
          sex: "女",
          active: 0
        }
      ],
      form: {
       
      },
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
      labelPosition: "left",
      dialogTableVisible: false,
      activeIndex: "1",
      activeIndex2: "1",
      activeName: "first"
    };
  },
  methods: {
    // 查看事件
    look(a,b){
      this.dialogTableVisible=true
      this.form=b
    }
  },
  components: {}
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

</style>
