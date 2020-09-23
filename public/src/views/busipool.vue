<template>
  <div class="user-list">
    <el-table :data="usersData" border ref="table" style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="tp" label="性别" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column prop="cellphone" label="手机号" align="center"></el-table-column>
      <el-table-column prop="place" label="地址" align="center"></el-table-column>
      <el-table-column prop="wx" label="微信" align="center"></el-table-column>
      <el-table-column prop="QQ" label="QQ" align="center"></el-table-column>
      <el-table-column prop="time" label="创建时间" align="center">2020-06-15</el-table-column>
      <el-table-column prop="site" label="创建人" align="center">admin</el-table-column>
      <el-table-column label="操作" width="210" align="center">
        <template slot-scope="scope">
          <el-button class="busi_plus" type="primary" icon="el-icon-plus" size="mini" @click="plus"></el-button>
          <el-button
            class="busi_look"
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="look(scope.$index,scope.row)"
          ></el-button>
          <el-button
            class="busi_edit"
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="eidt(scope.$index,scope.row)"
          ></el-button>
          <el-button class="busi_no" type="primary" size="mini">放弃</el-button>
        </template>
      </el-table-column>
    </el-table>

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
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="成交商品" name="second">
          <el-table :data="subData" style="width: 100%">
            <el-table-column prop="product" label="产品" width="90px"></el-table-column>
            <el-table-column prop="price" label="单价" width="90px"></el-table-column>
            <el-table-column prop="sum" label="总价" width="90px"></el-table-column>
            <el-table-column prop="num" label="数量" width="90px"></el-table-column>
            <el-table-column prop="name" label="成交人" width="90px">张三</el-table-column>
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
    <el-dialog width="500px"  title="追加" class="allTable" :visible.sync="pluslog">
      <div class="pluslogHead">
        <p>类型：</p>
        <el-radio-group class="group" v-model="tp">
          <el-radio label="跟踪进程" class="radio" @change="changePage1"></el-radio>
          <el-radio label="成交商品" class="radio" @change="changePage2"></el-radio>
        </el-radio-group>
      </div>
      <div v-if="pageShow==false">
        追踪进程：
        <el-input class="zz" type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
      <div class="foot_btn">
         <el-button type="primary" size="mini" @click="subProcess">添加</el-button>
          <el-button type="primary" size="mini" @click="pluslog=false" plain>取消</el-button>
      </div>
      </div>
      <el-form v-else ref="form" :model="plusForm" label-width="80px">
        <el-form-item label="产品名称">
          <el-input v-model="plusForm.product" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="产品价格">
          <el-input v-model="plusForm.price" placeholder="请输入产品价格"></el-input>
        </el-form-item>
        <el-form-item label="成交价格">
          <el-input v-model="plusForm.sum" placeholder="请输入成交价格"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="plusForm.num" placeholder="请输入数量"></el-input>
        </el-form-item>
         <div class="foot_btn">
         <el-button type="primary" size="mini" @click="plusCommodity">添加</el-button>
          <el-button type="primary" size="mini" @click="pluslog=false" plain>取消</el-button>
      </div>
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
        }
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
      plusForm: {
         product: "",
          price: "",
          sum: "",
          num: "",
      },
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
      index: "",
      pluslog: false,
     
      pageShow: false,
      textarea: "",
      tp:"跟踪进程"
    };
  },
  methods: {
    plus() {
      this.pluslog = true;
      console.log(111);
    },
    look(a, b) {
      this.dialogTableVisible = true;
      this.lookform = b;
    },
    sub() {
      this.appendLog = false;
      this.usersData.push(this.form);
      console.log(this.usersData);
    },
    eidt(index, obj) {
      this.edit = true;
      this.editForm = this.usersData2[index];
      this.index = index;
    },
    subChange(index) {
      this.edit = false;
      this.usersData.splice(index, 1, this.editForm);
    },
    changePage1() {
      this.pageShow = false;
      console.log(this.pageShow);
    },
    changePage2() {
      this.pageShow = true;
      console.log(this.pageShow);
    },
    subProcess(){
      this.pluslog=false
    },
    plusCommodity(){
      this.pluslog=false
this.subData.push(this.plusForm)
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
.busi_edit {
  background: rgb(255, 184, 0);
  border: none;
}
.busi_look {
  border: none;
}
.busi_plus {
  border: none;
}
.busi_no {
  border: none;
  background: red;
}
.pluslogHead {
  display: flex;
  font-size: 20px;
  justify-content: space-around;
  padding: 0px 80px;
  margin-bottom: 30px;
}
.pluslogHead .group .radio {
  font-size: 20px;
  line-height: 26px;
}
.zz{
  width: 400px;
  margin: 20px 30px;
}
.foot_btn{
margin-left: 200px;
position: absolute;
bottom: 20px;

}
</style>
