<template>
  <div class="page-layout">
    <div class="page-header-wrapper">
      <PageHeader></PageHeader>
    </div>
    <el-row>
      <!-- <el-col :span="1"> 
        <p @click="change"><i class="el-icon-data-board"></i></p>
        <el-menu
          default-active="2"
          router
          align="left"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          >
          <el-menu-item index="/editor">
            <i class="el-icon-data-board"></i>
            <span slot="title">Editor</span>
          </el-menu-item>
          <el-menu-item index="tempalate">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">My Template</span>
          </el-menu-item>
          <el-menu-item index="user">
            <i class="el-icon-user"></i>
            <span slot="title">User Management</span>
          </el-menu-item>
        </el-menu>
      </el-col> -->
      <el-col :span="23">
        <router-view class="sub-page"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PageHeader from '@/pages/components/page-header'
export default {
  components: {
    PageHeader
  },
  data() {
    return {
      isCollapse: false,
      sidebarMenus: [
        {
          label: 'Editor',
          value: 'componentLibs',
          elementUiIcon: 'el-icon-s-operation'
        },
        {
          label: 'My Template',
          value: 'pageManage',
          elementUiIcon: 'el-icon-document'
        },
        {
          label: 'Template Square',
          value: 'templateLibs',
          elementUiIcon: 'el-icon-files'
        }
      ],
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    change() {
      this.isCollapse==!this.isCollapse
    }
  }
}
</script>

<style scoped>
  .page-layout{
    height: 100%;
    padding-top: 48px;
  }
  .sub-page{
    position: relative;
    height: 100%;
  }
  .page-header-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
</style>
