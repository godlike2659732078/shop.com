<template>
  <div class="user-list">
    <!-- 添加按钮 -->
    <p class="table_title">轮播管理</p>
    <!-- 搜索列表 -->
    <div class="userList_content">
      <!-- 用户信息列表 -->
      <div class="userList">
        <div class="userList_head">
          <el-button
            type="primary"
            size="large"
            style="border: none; border-radius: 2px; margin-right: 10px"
            @click="gotoAdd"
            icon="el-icon-plus"
            >增加</el-button
          >
          <el-button
            type="warning"
            size="large"
            style="
              background-color: #ff5722;
              border: none;
              border-radius: 2px;
              margin-right: 10px;
            "
            @click="frozen"
            >批量删除</el-button
          >
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width:100% overflow:scroll"
          class="userList_table"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            align="center"
            type="selection"
            width="55"
          ></el-table-column>

          <el-table-column align="center" label="图片" width="100">
            <!--加入下面的内容,scope.row代表这一行,img是显示这一行的哪个字段,我的是img,你的自己看下-->
            <template slot-scope="scope" class="headImage">
              <img
                v-if="scope.row.image"
                :src="scope.row.image"
                style="
                  margin-left: 10px;
                  display: block;
                  width: 80px;
                  height: 40px;
                "
                alt
              />
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="title"
            label="标题"
            width="180"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sort"
            label="排序"
            width="80"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="url"
            label="链接地址"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="status"
            label="位置"
            width="100"
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.isHome == 1"
                type="warning"
                size="mini"
                style="
                  background-color: #1e9fff;
                  border: none;
                  border-radius: 2px;
                  margin-right: 10px;
                "
                >首页</el-button
              >
              <el-button
                v-else
                type="warning"
                size="mini"
                style="
                  background-color: #ffb800;
                  border: none;
                  border-radius: 2px;
                  margin-right: 10px;
                "
                >发现</el-button
              >
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="createTime"
            label="加入时间"
            fixed="right"
            width="180px"
          ></el-table-column>
          <el-table-column
            align="center"
            label="操作"
            fixed="right"
            width="160px"
          >
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="mini"
                style="
                  background-color: #009688;
                  border: none;
                  border-radius: 2px;
                  margin-right: 10px;
                "
                icon="el-icon-edit"
                @click="eidt(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="warning"
                size="mini"
                style="
                  background-color: #ff5722;
                  border: none;
                  border-radius: 2px;
                  margin-right: 10px;
                "
                icon="el-icon-delete"
                @click="delOne(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { TimeSelect } from "element-ui";
import {
  allBanners,
  delBannerById,
  delBannerByIds,
} from "../../../network/platform";
export default {
  components: {},
  data() {
    return {
      tableData: [],
      currentPage4: 1,
      pages: null,
      multipleSelection: [],
      page: 1,
      limit: 10,
      editForm: {},
      labelPosition: "left",
      edit: false,
      index: "",
    };
  },
  watch: {
    page() {
      let obj = {
        limit: this.limit,
        page: this.page,
      };
      allBanners(obj).then((res) => {
        //console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
    limit() {
      let obj = {
        limit: this.limit,
        page: this.page,
      };
      allBanners(obj).then((res) => {
        //console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
  },
  methods: {
    // 获取列表
    getList() {
      let obj = {
        limit: this.limit,
        page: this.page,
      };
      allBanners(obj).then((res) => {
        //console.log(res);
        this.tableData = res.data;
        this.pages = res.count;
      });
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      //console.log(this.multipleSelection);
    },
    // 批量冻结事件
    frozen() {
      if (this.multipleSelection.length != 0) {
        this.$confirm("确认批量删除轮播？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let ids = [];
            for (let item in this.multipleSelection) {
              ids.push(this.multipleSelection[item].id);
            }
            ids = "(" + ids.toString() + ")";
           // console.log(ids);
            let obj = this.$qs.stringify({
              ids: ids,
              status: 1,
            });

            delBannerByIds(obj).then((res) => {
              //console.log(res);
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.getList();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消操作",
            });
          });
      } else {
        return;
      }
    },
    // 点击编辑事件
    eidt(res) {
      //console.log(res);
      this.$router.push({
        path: "/platform/banner/edit",
        query: {
          id: res.id,
        },
      });
    },

    // 删除单个商家
    delOne(res) {
      this.$confirm("是否删除该轮播？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = this.$qs.stringify({
            id: res.id,
          });
          delBannerById(obj).then((res) => {
            // //console.log(res);
            this.$message({
              type: "success",
              message: res.msg,
            });
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
      this.$router.push({ path: "/platform/banner/add" });
    },
    gotoCredits(res) {
      // this.$router.push({ path: "/credits", query: { uId: res.uId } });
    },
  },

  created() {
    let obj = {
      limit: this.limit,
      page: this.page,
    };
    allBanners(obj).then((res) => {
      //console.log(res);
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
