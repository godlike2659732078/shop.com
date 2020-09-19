<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <el-button type="primary" icon="el-icon-plus" @click="appendLog = true"></el-button>
    <!-- 用户信息列表 -->
    <el-table :data="usersData" border ref="table" style="width: 100%" >
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="tp" label="性别" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column prop="cellphone" label="手机号" align="center"></el-table-column>
      <el-table-column prop="place" label="地址" align="center"></el-table-column>
      <el-table-column prop="wx" label="微信" align="center"></el-table-column>
      <el-table-column prop="QQ" label="QQ" align="center"></el-table-column>
      <el-table-column prop="time" label="创建时间" align="center">2020-06-15</el-table-column>
      <el-table-column prop="site" label="创建人" align="center">admin</el-table-column>
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
            icon="el-icon-edit"
            size="mini"
            @click="eidt(scope.$index,scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加用户弹窗 -->
    <el-dialog width="500px" title="添加用户" class="allTable" :visible.sync="appendLog">
      <el-form :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.tp">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.place"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.cellphone"></el-input>
        </el-form-item>
        <el-form-item label="微信">
          <el-input v-model="form.wx"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="form.QQ"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button style="margin-left:180px" type="primary" @click="sub">提交</el-button>
          <el-button style="margin-left:20px" @click="dialogTableVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 查看用户信息弹窗 -->
    <el-dialog width="500px" title="用户信息" class="allTable" :visible.sync="dialogTableVisible">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户信息" name="first">
          <el-form :label-position="labelPosition" label-width="80px" :model="lookform">
            <el-form-item label="姓名">
              <el-input :value="lookform.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="lookform.tp">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input :value="lookform.age"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input :value="lookform.place"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input :value="lookform.cellphone"></el-input>
            </el-form-item>
            <el-form-item label="微信">
              <el-input :value="lookform.wx"></el-input>
            </el-form-item>
            <el-form-item label="QQ">
              <el-input :value="lookform.QQ"></el-input>
            </el-form-item>
            <el-form-item label="创建人">
              <el-input :value="site"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input :value="time"></el-input>
            </el-form-item>
            <el-form-item label="所属">
              <el-input :value="lookform.type"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 成交商品列表 -->
        <el-tab-pane label="成交商品" name="second">
          <el-table :data="subData" style="width: 100%">
            <el-table-column prop="product" label="产品" width="90px"></el-table-column>
            <el-table-column prop="price" label="单价" width="90px"></el-table-column>
            <el-table-column prop="sum" label="总价" width="90px"></el-table-column>
            <el-table-column prop="num" label="数量" width="90px"></el-table-column>
            <el-table-column prop="name" label="成交人" width="90px"></el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 跟踪进程 -->
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
    <!-- 编辑用户信息列表 -->
    <el-dialog width="500px" title="用户信息" class="allTable" :visible.sync="edit">
      <el-form :label-position="labelPosition" label-width="80px" :model="editForm" :index="index">
        <el-form-item label="姓名">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.tp">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="editForm.age"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editForm.place"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="editForm.cellphone"></el-input>
        </el-form-item>
        <el-form-item label="微信">
          <el-input v-model="editForm.wx"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="editForm.QQ"></el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="site"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="time"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button style="margin-left:160px" type="primary" @click="subChange(index)">提交</el-button>
          <el-button @click="edit= false">取消</el-button>
        </el-form-item>
      </el-form>
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
    // 查看事件
    look(a, b) {
      this.dialogTableVisible = true;
      this.lookform = b;
    },
    // 提交添加
    sub() {
      this.appendLog = false;
      this.usersData.push(this.form);
      console.log(this.usersData);
    },
    // 点击编辑事件
    eidt(index, obj) {
      this.edit = true;
      this.editForm = this.usersData[index];
      this.index = index;
    },
    // 提交编辑内容事件
    subChange(index) {
      this.edit = false;
      this.usersData.splice(index, 1, this.editForm);
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
.user_edit {
  background: rgb(255, 184, 0);
  border: none;
}
.user_look {
  border: none;
}
</style>
