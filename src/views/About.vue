<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="8">
        <div class="grid-content">
          <div class="user_box">
            <div class="box_title">
              <a href="#">用户数量</a>
              <div class="about_all all">总量</div>
            </div>
            <div class="user_content">
              <p class="allUsers">{{users.allCount}}</p>
            </div>
          </div>
          <div class="user_box">
            <div class="box_title">
              <a href="#"></a>
              <div class="about_all day">日</div>
            </div>
            <div class="user_content">
              <p class="allUsers">{{users.dayCount}}</p>
            </div>
          </div>
          <div class="user_box">
            <div class="box_title">
              <a href="#"></a>
              <div class="about_all week">周</div>
            </div>
            <div class="user_content">
              <p class="allUsers">{{users.weekCount}}</p>
            </div>
          </div>
          <div class="user_box">
            <div class="box_title">
              <a href="#"></a>
              <div class="about_all month">月</div>
            </div>
            <div class="user_content">
              <p class="allUsers">{{users.monthCount}}</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <div class="user_box">
            <div class="box_title">
              <a href="#">商家订单</a>
              <div class="about_all all">总量</div>
            </div>
            <div class="user_content">
              <p class="allUsers">{{orders.allCount}}</p>
            </div>
          </div>
          <div class="user_box">
            <div class="box_title">
              <a href="#"></a>
              <div class="about_all day">日</div>
            </div>
            <div class="user_content">
              <p class="allUsers">{{orders.dayCount}}</p>
            </div>
          </div>
          <div class="user_box">
            <div class="box_title">
              <a href="#"></a>
              <div class="about_all week">周</div>
            </div>
            <div class="user_content">
              <p class="allUsers">{{orders.weekCount}}</p>
            </div>
          </div>
          <div class="user_box">
            <div class="box_title">
              <a href="#"></a>
              <div class="about_all month">月</div>
            </div>
            <div class="user_content">
              <p class="allUsers">{{orders.monthCount}}</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <div class="user_box">
            <div class="box_title">
              <a href="#">平台订单</a>
              <div class="about_all all">总量</div>
            </div>
            <div class="user_content">
              <p class="allUsers">{{lineOrders.allCount}}</p>
            </div>
          </div>
          <div class="user_box">
            <div class="box_title">
              <a href="#"></a>
              <div class="about_all day">日</div>
            </div>
            <div class="user_content">
              <p class="allUsers">{{lineOrders.dayCount}}</p>
            </div>
          </div>
          <div class="user_box">
            <div class="box_title">
              <a href="#"></a>
              <div class="about_all week">周</div>
            </div>
            <div class="user_content">
              <p class="allUsers">{{lineOrders.weekCount}}</p>
            </div>
          </div>
          <div class="user_box">
            <div class="box_title">
              <a href="#"></a>
              <div class="about_all month">月</div>
            </div>
            <div class="user_content">
              <p class="allUsers">{{lineOrders.monthCount}}</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-table">
          <p>用户留言</p>
          <el-table :data="feedback" style="width: 100%" type="index">
            <el-table-column class="nickname" prop="nickname" label="用户名" width="180" :show-overflow-tooltip='true'></el-table-column>
            <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
            <el-table-column prop="message" label="内容"></el-table-column>
            <el-table-column prop="time" label="时间" width="180"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-table">
          <p>保证金告急商家</p>
          <el-table :data="ShopEnsureWarn" style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="name" label="商家名称" width="180"></el-table-column>
            <el-table-column prop="currentEnsure" label="当前保证金" width="180"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getHome_user,
  getHome_order,
  getHome_lineOrder,
  getShopEnsureWarn,
  getfeedback,
} from "../network/getHome";
export default {
  components: {},
  props: {},
  data() {
    return {
      users: "",
      orders: "",
      lineOrders: "",
      ShopEnsureWarn: [],
      feedback: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  created() {
    console.log(this.$store.state);
    getHome_user().then((res) => {
      console.log(res);
      this.users = res.data;
    });
    getHome_order().then((res) => {
      console.log(res);
      this.orders = res.data;
    });
    getHome_lineOrder().then((res) => {
      console.log(res);
      this.lineOrders = res.data;
    });
    getShopEnsureWarn().then((res) => {
      console.log(res);
      this.ShopEnsureWarn = res.data;
    });
    getfeedback().then((res) => {
      console.log(res);
      this.feedback = res.data;
    });
  },
};
</script>
<style scoped lang="less">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  background: #fff;
  border-radius: 1px;
  min-height: 263px;
  display: flex;
  flex-wrap: wrap;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.user_box {
  width: 50%;
  height: 50%;
}
.box_title {
  width: 100%;
  height: 43px;
  display: flex;
  justify-content: space-between;
  padding: 0px 15px;
  align-items: center;
  box-sizing: border-box;
}
.box_title a {
  text-decoration: none;
  color: #333;
  font-size: 14px;
}
.about_all {
  width: auto;
  height: 18px;
  border-radius: 2px;
  padding: 0px 6px;
  color: #fff;
  background: #1e9fff;
  font-size: 12px;
}
.day {
  background: #2f4056;
}
.week {
  background: #009688;
}
.month {
  background: #ffb800;
}
.user_content {
  width: 100%;
  height: 81px;
  padding: 15px;
  box-sizing: border-box;
}
.user_content p {
  width: 100%;
  margin: 0px;
  font-size: 36px;
  color: #666666;
  text-align: right;
}
.grid-table {
  height: auto;
  background: #fff;
  padding: 0px 15px;
}
.grid-table p {
  width: 100%;
  height: 43px;
  font-size: 14px;
  line-height: 43px;
  color: #333;
}
</style>
