<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">直播商品库</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <!-- 用户信息列表 -->
      <div class="userList">
        <div class="userList_head">
          <el-button
            type="primary"
            size="large"
            style="border:none;border-radius:2px;margin-right:10px"
            @click="gotoAdd"
            icon="el-icon-plus"
          >增加</el-button>
          <el-button
            type="primary"
            size="large"
            style="border:none;border-radius:2px;margin-right:10px"
            @click="examined"
          >审核通过</el-button>
          <el-button
            type="primary"
            size="large"
            style="border:none;border-radius:2px;margin-right:10px"
            @click="examing"
          >审核中</el-button>
          <el-button
            type="primary"
            size="large"
            style="border:none;border-radius:2px;margin-right:10px"
            @click="examineno"
          >审核驳回</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width:100% overflow:scroll"
          class="userList_table"
        >
          <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
          <el-table-column align="center" label="分享图" width="150">
            <template slot-scope="scope" class="headImage">
              <img
                v-if="scope.row.coverImgUrl"
                :src="scope.row.coverImgUrl"
                style="margin-left:40px;display:block;width:40px;"
                alt
              />
            </template>
          </el-table-column>

          <el-table-column align="center" prop="name" label="商品名"></el-table-column>
          <el-table-column align="center" prop="price" label="商品价格"></el-table-column>
          <el-table-column align="center" label="操作" fixed="right" width="240">
            <template slot-scope="scope">
              <div v-if="status==2">
                <el-button
                  type="warning"
                  size="mini"
                  style="background-color:#009688;border:none;border-radius:2px;margin-right:10px"
                  icon="el-icon-edit"
                  @click="change(scope.row)"
                >编辑</el-button>
                <el-button
                  type="warning"
                  size="mini"
                  style="background-color:#ff5722;border:none;border-radius:2px;margin-right:10px"
                  icon="el-icon-delete"
                  @click="delTeam(scope.row)"
                >删除</el-button>
              </div>
              <div v-else-if="status==1">
                <el-button
                  type="warning"
                  size="mini"
                  style="background-color:#ff5722;border:none;border-radius:2px;margin-right:10px"
                  icon="el-icon-delete"
                  @click="hoveTeam(scope.row)"
                >撤回</el-button>
              </div>
              <div v-else>
                <el-button
                  type="warning"
                  size="mini"
                  style="background-color:#ff5722;border:none;border-radius:2px;margin-right:10px"
                  icon="el-icon-delete"
                  @click="delTeam(scope.row)"
                >删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="200"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages"
        ></el-pagination>
      </div>
      <!-- 编辑商品价格 -->
      <el-dialog width="400px" title="修改商品价格" class="liveGoodsTabel" :visible.sync="edit">
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :value="addForm"
          :index="index"
        >
          <el-form-item label="价格类型：">
            <el-input v-model="addForm.priceType" disabled></el-input>
          </el-form-item>
          <el-form-item label="价格：">
            <el-input v-model="addForm.price"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="subChange">立即提交</el-button>
            <el-button style="margin-left:60px" @click="edit= false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { TimeSelect } from "element-ui";
import {
  getLivegoods,
  changeGoodsPrice,
  delLiveGoods,
  hoveLiveGoods,
} from "../../../network/merchant";
export default {
  components: {},
  data() {
    return {
      status: 2,
      tableData: [],
      currentPage4: 1,
      pages: null,
      multipleSelection: [],
      page: 1,
      limit: 10,
      addForm: {
        priceType: "1",
        price: "",
        goodsId: "",
      },

      labelPosition: "left",
      edit: false,
      index: "",
    };
  },
  watch: {
    page() {
      let obj = {
        page: this.page,
        limit: this.limit,
      };
      findAllType(obj).then((res) => {
        // console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
    limit() {
      let obj = {
        page: this.page,
        limit: this.limit,
      };
      findAllType(obj).then((res) => {
        // console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
  },
  methods: {
    //
    getList() {
      let obj = {
        offset: 0,
        limit: this.limit,
        status: this.status,
      };
      getLivegoods(obj).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
    //   审核通过列表
    examined() {
      this.status = 2;
      this.getList();
    },
    // 审核中
    examing() {
      this.status = 1;
      this.getList();
    },
    // 审核驳回
    examineno() {
      this.status = 3;
      this.getList();
    },

    // 点击编辑事件
    change(res) {
      this.edit = true;
      this.addForm.goodsId = res.goodsId;
    },
    // 提交编辑
    subChange() {
      let obj = this.$qs.stringify(this.addForm);
      changeGoodsPrice(obj).then((res) => {
        if (res.code == 0) {
          this.$message({
            type: "success",
            message: "价格修改成功！",
          });
          this.edit = false;
          this.getList();
        } else {
          this.$message.error("操作失败!");
        }
      });
    },
    // 删除单条数据
    delTeam(res) {
      this.$confirm("确认删除此商品？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(res);
          let obj = this.$qs.stringify({
            goodsId: res.goodsId,
          });
          delLiveGoods(obj).then((res) => {
            // console.log(res);
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: res.msg,
              });
            } else {
              this.$message.error("操作失败！");
            }
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作",
          });
        });
    },
    hoveTeam(res) {
      this.$confirm("确认撤回此条审核？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = this.$qs.stringify({
            goodsId: res.goodsId,
          });
          hoveLiveGoods(obj).then((res) => {
            // console.log(res);
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: res.msg,
              });
            } else {
              this.$message.error("操作失败！");
            }
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作",
          });
        });
    },
    // 页面数量
    handleSizeChange(val) {
      this.limit = 10;
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    gotoAdd() {
      this.$router.push({ path: "/merchant/liveGoodsList/add" });
    },
    gotoCredits(res) {
      // this.$router.push({ path: "/credits", query: { uId: res.uId } });
    },
  },

  created() {
    let obj = {
      offset: 0,
      limit: this.limit,
      status: this.status,
    };
    getLivegoods(obj).then((res) => {
      console.log(res);
      this.tableData = res.data;
      this.pages = res.count;
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
}
.showSelf img {
  max-width: 100px;
  max-height: 100px;
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
.liveGoodsTabel {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
  .el-dialog {
    margin: 20 auto !important;
    height: 30%;
    overflow: hidden;
    .el-dialog__body {
      position: absolute;
      display: flex;
      align-items: center;
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
