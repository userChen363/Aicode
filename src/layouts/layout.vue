<template>
  <div id="layout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <Header />
      </a-layout-header>
      <a-layout-content class="content">
        <!--路由出口-->
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <div class="footer-content">
          <span>Copyright © {{ currentYear }} </span>
          <a href="#" target="_blank">成都众智科技有限公司</a>
          <span> | </span>
          <a href="#" target="_blank">备案号：京ICP备052493号</a>
        </div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header.vue'
const currentYear = ref(new Date().getFullYear())
</script>
<style scoped lang="scss">
#layout {
  .header{
    margin-bottom: 20px;
    color: unset;
  }
  .ant-layout-header {
    padding-inline: 0 !important;
  }

  .content {
    padding: 20px;
  }

  .footer {
    text-align: center;
    background-color: #f0f2f5;
    color: #666;

    .footer a {
      color: #666;
      text-decoration: none;
      margin: 0 5px;
      transition: color 0.3s;
    }

    .footer a:hover {
      color: #1890ff;
    }
  }
}
</style>
