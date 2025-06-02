<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-layout has-sider position="absolute" style="height: 100vh">
      
      <!-- Sidebar -->
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed="collapsed"
        :collapsed-width="64"
        width="200"
        show-trigger="arrow-circle"
        :native-scrollbar="false"
        @collapse="collapsed = true"
        @expand="collapsed = false"
        class="aside"
      >
        <div class="logo-box">
          <img src="../assets/logo-Co29R00y.png" alt="logo" class="logo" />
          <span v-if="!collapsed" class="logo-text">My Admin</span>
        </div>
        <n-scrollbar trigger="hover" style="height: 100%; overflow: hidden;">
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :options="menuOptions"
          :indent="24"
          :default-expand-all="false"
          :value="activeKey"
          @update:value="onMenuSelect"
        />
        </n-scrollbar>
      </n-layout-sider>

      <!-- Main Layout -->
      <n-layout>
        <!-- Header -->
        <n-layout-header class="header" :height="60">
          <n-grid
            :cols="{ xs: 1, sm: 2, md: 3, lg: 4 }"
            :y-gap="30"
          >
            <n-flex align="center">
              <n-button quaternary circle @click="toggleCollapsed">
                <n-icon :component="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
              </n-button>

              <n-breadcrumb separator=" / ">
                <n-breadcrumb-item>
                  <n-icon><HomeOutlined /></n-icon>
                  <span style="margin-left: 4px;">Home</span>
                </n-breadcrumb-item>

                <n-breadcrumb-item>
                  <n-icon><DashboardOutlined /></n-icon>
                  <span style="margin-left: 4px;">Account</span>
                </n-breadcrumb-item>
              </n-breadcrumb>
            </n-flex>
          </n-grid>
        </n-layout-header>

        <!-- Main Content -->
        <n-layout-content class="main-content">
          <router-view />
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<script setup>
import { ref, h } from 'vue'
import {
  NLayout,
  NLayoutSider,
  NMenu,
  NLayoutHeader,
  NLayoutContent,
  NConfigProvider,
  NButton,
  NIcon,
  NBreadcrumb, 
  NBreadcrumbItem,
  NFlex
} from 'naive-ui'
import { HomeOutlined, UsergroupDeleteOutlined, MenuFoldOutlined, MenuUnfoldOutlined, DashboardOutlined, AppstoreAddOutlined, NodeCollapseOutlined } from '@vicons/antd'
import { useRouter, useRoute } from 'vue-router'

const collapsed = ref(false)
const router = useRouter()
const route = useRoute()
const activeKey = ref(route.path)

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
}

const onMenuSelect = (key) => {
  activeKey.value = key
  router.push(key)
}

const menuOptions = [
  {
    label: 'Dashboard',
    key: '/dashboard',
    icon: () => h(DashboardOutlined, {width: '16px', height: '16px'}),
  },
  {
    label: 'Users',
    key: 'users',
    icon: () => h(UsergroupDeleteOutlined, {width: '16px', height: '16px'}),
    children: [
      { label: 'All Users', key: '/users/all' },
      { label: 'Add User', key: '/users/create' }
    ]
  }
  ,
  {
    label: 'Products',
    key: 'products',
    icon: () => h(AppstoreAddOutlined, {width: '16px', height: '16px'}),
    children: [
      { label: 'All Products', key: '/products/all' },
      { label: 'Add Products', key: '/products/create' },
      { label: 'View Products', key: '/products/view' },
      { label: 'Edit Products', key: '/products/edit' },
      { label: 'Delete Products', key: '/products/delete' },
    ]
  }
  ,
  {
    label: 'Articles',
    key: 'articles',
    icon: () => h(NodeCollapseOutlined, {width: '16px', height: '16px'}),
    children: [
      { label: 'All Articles', key: '/articles/all' },
      { label: 'Add Articles', key: '/articles/create' },
      { label: 'View Articles', key: '/articles/view' },
      { label: 'Edit Articles', key: '/articles/edit' },
      { label: 'Delete Articles', key: '/articles/delete' },
    ]
  },
  {
    label: 'Media',
    key: 'medias',
    icon: () => h(NodeCollapseOutlined, {width: '16px', height: '16px'}),
    children: [
      { label: 'All Media', key: '/medias/all' },
      { label: 'Add Media', key: '/medias/create' },
      { label: 'View Media', key: '/medias/view' },
      { label: 'Edit Media', key: '/medias/edit' },
      { label: 'Delete Media', key: '/medias/delete' },
    ]
  }
]

const themeOverrides = {
  Layout: {
    siderColor: '#ffffff',        // Nền trắng
    siderBorderColor: '#f0f0f0'   // Viền sáng nếu muốn
  },
  Menu: {
    itemTextColor: '#333',                // Màu chữ
    itemIconColor: '#666',
    itemTextColorHover: '#000',
    itemColorHover: '#f5f5f5',
    itemColorActive: '#e6f4ea',
    itemTextColorActive: '#18a058'
  }
}
</script>

<style>
.aside {
  background-color: #ffffff;
  color: #333;
  border-right: 1px solid #f0f0f0;
}
.logo-box {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  /* background-color: #18a058; */
  font-size: 16px;
  font-weight: bold;
  /* color: white; */
}
.logo {
  width: 24px;
  margin-right: 8px;
}
.logo-text {
  white-space: nowrap;
}
.header {
  background: white;
  padding: 0 16px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.header-content {
  display: flex;
  align-items: center;
  justify-content: left;
  height: 100%;
}
.main-content {
  padding: 16px;
  background: #f5f5f5;
  height: 100%;
  overflow-y: auto;
}

/*  */
.n-scrollbar-rail {
  background-color: #f0f0f0; /* Track color */
}
.n-scrollbar-rail__vertical .n-scrollbar-thumb {
  background-color: #18a058; /* Thumb color */
  border-radius: 4px;
}
.n-scrollbar-rail__vertical:hover .n-scrollbar-thumb {
  background-color: #0f8c4d;
}
/* Scrollbar ẩn mặc định */
.aside .n-scrollbar-rail {
  opacity: 0;
  transition: opacity 0.3s;
}

/* Khi hover vào aside thì hiện scrollbar */
.aside:hover .n-scrollbar-rail {
  opacity: 1;
}
.n-scrollbar-rail__vertical .n-scrollbar-thumb {
  background-color: #18a058;
  border-radius: 4px;
}
</style>
