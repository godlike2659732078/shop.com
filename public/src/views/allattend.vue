<template>
  <div>
    <div class="leave_head">
      <!-- 点击筛选列表时间段 -->
      <div>
        <el-button class="filter" type="primary" @click="getMonth" size="mini">近一个月</el-button>
        <el-button class="filter" type="primary" @click="getWeek" size="mini">一星期</el-button>
        <el-button class="filter" type="primary" @click="getNow" size="mini">当天</el-button>
      </div>
<!--时间选择器筛选列表 -->
      <div class="block">
        <el-date-picker v-model="date1" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        <el-date-picker v-model="date2" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        <el-button type="primary" @click="serchData">查询</el-button>
      </div>
    </div>
    <!-- 页面表格 -->
    <el-table :data="showList" border ref="table" style="width: 100%">
      <el-table-column prop="g_name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="q_date" label="时间" align="center"></el-table-column>
      <el-table-column prop="q_s_stime" label="上午上班时间" align="center"></el-table-column>
      <el-table-column prop="q_s_xtime" label="上午下班时间" align="center"></el-table-column>
      <el-table-column prop="q_x_stime" label="下午上班时间" align="center"></el-table-column>
      <el-table-column prop="q_x_xtime" label="下午下班时间" align="center"></el-table-column>
      <el-table-column prop="q_s" label="上午" align="center"></el-table-column>
      <el-table-column label="下午" prop="q_x" width="180" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getHistory} from "../network/kq"
export default {
  components: {},
  props: {},
  data() {
    return {
      usersData: [
       
      ],

      value2: "",

      date1: "",
      date2: "",
      showList: [],
      rules: {},
      index: "",
      getTime: "",
      ct_month: null,
      nowtime: null
    };
  },
  methods: {
    // 时间格式事件
    formatDate(now) {
      var year = now.getFullYear(); //取得4位数的年份
      var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
      var date = now.getDate(); //返回日期月份中的天数（1到31）
      if (month < 10) {
        month = "0" + month;
      }
      if (date < 10) {
        date = "0" + date;
      }
      return year + "-" + month + "-" + date;
    },
    // 筛选近一个月
    getMonth() {
      this.nowtime = new Date();
      this.ct_month = new Date();

      let monthday = this.ct_month.setTime(
        this.ct_month.getTime() - 3600 * 1000 * 24 * 30
      );
      let nowday = this.ct_month.setTime(this.nowtime.getTime());
      let action = new Date(nowday);
      let end = new Date(monthday);
      this.showList = this.usersData.filter(res => {
        if (
          res.q_date <= this.formatDate(action) &&
          res.q_date > this.formatDate(end)
        ) {
          return res;
        }
      });
    },
    // 筛选近一周
    getWeek() {
      this.nowtime = new Date();
      this.ct_month = new Date();

      let monthday = this.ct_month.setTime(
        this.ct_month.getTime() - 3600 * 1000 * 24 * 7
      );
      let nowday = this.ct_month.setTime(this.nowtime.getTime());
      let action = new Date(nowday);
      let end = new Date(monthday);
      this.showList = this.usersData.filter(res => {
        if (
          res.q_date <= this.formatDate(action) &&
          res.q_date > this.formatDate(end)
        ) {
          return res;
        }
      });
    },
    //筛选当天
    getNow() {
      this.nowtime = new Date();
      this.ct_month = new Date();
      let nowday = this.ct_month.setTime(this.nowtime.getTime());
      let action = new Date(nowday);

      this.showList = this.usersData.filter(res => {
        if (res.q_date == this.formatDate(action)) {
          return res;
        }
      });
    },
    // 查询时间段事件
    serchData() {
      console.log(this.date1)
      console.log(this.showList);
      // if (
      //   (this.date1 == "" || this.date1 == null) &&
      //   (this.date2 == "" || this.date2 == null)
      // ) {
      //   this.showList = this.usersData;
      // } else if (this.date1 != "" && (this.date2 == "" || this.date2 == null)) {
      //   this.showList = this.usersData.filter(res => {
      //     if (res.q_date >= this.date1) {
      //       return res;
      //     }
      //   });
      // } else if ((this.date1 == "" || this.date1 == null) && this.date2 != "") {
      //   this.showList = this.usersData.filter(res => {
      //     if (res.q_date <= this.date2) {
      //       return res;
      //     }
      //   });
      // } else {
      //   this.showList = this.usersData.filter(res => {
      //     if (res.q_date <= this.date2 && res.q_date >= this.date1) {
      //       return res;
      //     }
      //   });
      // }
    }
  },
  created() {
    let obj={
      sj:"2000-01-01",
      sj1:"2020-12-12"
    }
    getHistory(obj).then(res=>{
      console.log(res)
      this.usersData=res.data.data
       this.showList = this.usersData;
    })
   
  }
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

.leave_head {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0px 0px;
  margin-bottom: 4px;
}
.filter {
  margin-right: 20px;
}
</style>