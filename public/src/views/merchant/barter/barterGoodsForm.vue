<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">审核资料</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <!-- 编辑用户信息列表 -->
      <el-form :label-position="labelPosition" label-width="80px" :model="editForm" :index="index">
        <el-form-item label="账号：">
          <el-input v-model="editForm.account" style="width:300px" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="editForm.goodsName" style="width:300px" disabled></el-input>
        </el-form-item>
        <el-form-item label="零售价：">
          <el-input v-model="editForm.price" style="width:300px" disabled></el-input>
        </el-form-item>
        <el-form-item label="成本价：">
          <el-input v-model="editForm.costPrice" style="width:300px" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品详情">
          <el-input v-model="editForm.detail" type="textarea" style="width:300px" disabled></el-input>
        </el-form-item>
        <el-form-item label>
          <div class="showSelf">
            <p>生产日期：</p>
            <p v-if="editForm.storeLicense1==''||editForm.storeLicense1==null"></p>
            <img v-else :src="editForm.storeLicense1" alt />
            <p>保质期：</p>
            <p v-if="editForm.storeLicense2==''||editForm.storeLicense2==null"></p>
            <img v-else :src="editForm.storeLicense2" alt />
          </div>
          <div class="showSelf">
            <p>商品图标：</p>
            <p v-if="editForm.storeLicense3==''||editForm.storeLicense3==null"></p>
            <img v-else :src="editForm.storeLicense3" alt />
            <p>规格及地址：</p>
            <p v-if="editForm.storeLicense4==''||editForm.storeLicense4==null"></p>
            <img v-else :src="editForm.storeLicense4" alt />
          </div>
        </el-form-item>
        <el-form-item v-if="editForm.status==0">
          <el-button
            type="warning"
            size="large"
            style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
            @click="pass(editForm)"
          >认证通过</el-button>
          <el-button
            type="warning"
            size="large"
            style="background-color:#ffb800;border:none;border-radius:2px"
            @click="nopass(editForm)"
          >认证驳回</el-button>
        </el-form-item>
        <el-form-item v-else-if="editForm.status==2" label="驳回原因">
          <el-input v-model="editForm.reason" type="textarea" style="width:300px" disabled></el-input>
        </el-form-item>
      </el-form>
      <!-- 备注信息弹窗 -->
      <el-dialog
        width="500px"
        style="height:400px"
        title="认证驳回"
        class="checkTable"
        :visible.sync="lose"
      >
        <el-form :label-position="labelPosition" label-width="80px" :model="noPass" :index="index">
          <el-form-item label="驳回原因">
            <el-input type="textarea" v-model="noPass.reason" :rows="3" placeholder="请输入驳回原因"></el-input>
          </el-form-item>
          <div style="display:flex;">
            <el-form-item>
              <el-button type="primary" @click="subLose(editForm)">确认</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { TimeSelect } from "element-ui";
import { findOneGoods, passGoods } from "../../../network/merchant";
export default {
  components: {},
  data() {
    return {
      multipleSelection: [],
      params: {
        name: "",
      },
      editForm: {},
      noPass: {
        reason: "",
        id: "",
      },
      labelPosition: "left",
      edit: false,
      lose: false,
      index: "",
    };
  },
  methods: {
    pass(res) {
      console.log(res);
      let obj = this.$qs.stringify({
        status: 1,
        id: res.id,
      });

      console.log(obj);
      passGoods(obj).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.$router.push({ path: "/merchant/barterGoods" });
        } else {
          this.$message.error("操作失败!");
        }
      });
    },
    nopass(res) {
      console.log(res);
      this.lose = true;
    },
    subLose(res) {
      console.log(res);
      let obj = this.$qs.stringify({
        status: 2,
        reason: this.noPass.reason,
        id: res.id,
      });
      console.log(obj);
      passGoods(obj).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.lose = false;
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.$router.push({ path: "/merchant/barterGoods" });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },

  created() {
    let obj = {
      id: this.$route.query.id,
    };
    findOneGoods(obj).then((res) => {
      console.log(res);
      this.editForm = res.data;
    });
  },
  mounted() {},
};
</script>
<style lang="less">
.user-list {
  background: #fff;
}
.table_title {
  display: block;
  font-size: 14px;
  height: 43px;
  line-height: 43px;
  padding: 0px 15px;
}
.userList_content {
  width: 100%;
  height: auto;
  padding: 15px;
  box-sizing: border-box;
}
.userList {
  background-color: #f2f2f2;
  border: 1px solid #e6e6e6;
  width: 100%;
  margin-top: 10px;
}
.cell {
  margin: 5px 0px;
}
.userList_head {
  padding: 10px 15px;
  border-bottom: 1px solid #ebeef5;
}
.userList_table {
  th {
    padding: 0 !important; //必须加important，不然覆盖优先级不够高
    height: auto; //你需要设置的高度
    line-height: 50px;
  }
  td {
    padding: 0 !important;
    height: auto;
    line-height: 50px;
  }
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 5px 5px;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
}
.showSelf {
  display: flex;
  width: 600px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
}
.showSelf img {
  max-width: 150px;
  max-height: 150px;
}
.userserch_block {
  font-size: 14px;
  color: #666;
}
.el-button + .el-button {
  margin-left: 0px;
}
.el-menu-demo {
  display: block;
  width: 500px;
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
