<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-layout has-sider position="absolute" style="height: 100vh">
      
      <!-- Sidebar -->
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed="collapsed"
        :collapsed-width="64"
        width="220"
        show-trigger="arrow-circle"
        :native-scrollbar="false"
        @collapse="collapsed = true"
        @expand="collapsed = false"
        class="aside"
      >
        <n-flex justify="center" class="py-[16px] h-[64px] whitespace-nowrap flex-nowrap" align="center" style="gap: 0; flex-flow: nowrap">
          <n-image :src="logo" :preview-disabled="false" height="40" class="w-[32px]" />
          <h1 v-if="!collapsed" class="ml-[12px] font-bold text-[18px] whitespace-nowrap">Admin Plus</h1>
        </n-flex>

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
        <n-layout-header>
          <n-flex align="center" class="py-2 px-3">
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

          <n-tabs
            type="bar"
            :value="$route.path"
            @update:value="handleTabChange"
            animated
          >
            <n-tab name="/dashboard">Dashboard</n-tab>
            <n-tab name="/users">Users</n-tab>
            <n-tab name="/settings">Settings</n-tab>
          </n-tabs>
        </n-layout-header>

        <!-- Main Content -->
        <n-layout-content class="px-3">
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
  NFlex,
  NImage,
  NTabs
} from 'naive-ui'
import {
  HomeOutlined, 
  UsergroupDeleteOutlined, 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  DashboardOutlined, 
  AppstoreAddOutlined, 
  NodeCollapseOutlined,
  BarChartOutlined,
  AppstoreOutlined
 } from '@vicons/antd'
import { useRouter, useRoute } from 'vue-router'

const collapsed = ref(false)
const router = useRouter()
const route = useRoute()
const activeKey = ref(route.path)

import logo from '@/assets/logo-Co29R00y.png'

const toggleCollapsed = () => {
  if (!val) {
    setTimeout(() => {
      collapsed.value = true
    }, 1000) // Hiển thị sau 300ms
  } else {
    collapsed.value = false
  }
}

const tabs = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Users', path: '/users' },
  { label: 'Settings', path: '/settings' }
]

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
      { label: 'All Users', key: '/users/all', icon: () => h(BarChartOutlined, {width: '14px', height: '14px'}), },
      { label: 'Add User', key: '/users/create', icon: () => h(AppstoreOutlined, {width: '14px', height: '14px'}), }
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
    siderColor: '#ffffff',
    siderBorderColor: '#f0f0f0'
  },
  Menu: {
    itemColorHover: '#f4f4f5',           // Background on hover
    itemTextColor: '#333',               // Default text
    itemIconColor: '#666',               // Default icon
    itemTextColorHover: '#2080f0',       // Text on hover (primary)
    itemIconColorHover: '#2080f0',       // Icon on hover
    itemColorActive: '#fff',          // Background on active
    itemTextColorActive: '#2080f0',      // Text on active
    itemIconColorActive: '#2080f0',      // Icon on active
    itemIconColorActiveHover: '#2080f0',
    itemTextColorActiveHover: '#2080f0',
    itemColor: '#2080f0',
  }
}

function handleTabChange(path) {
  router.push(path)
}

</script>

<style scoped>
::v-deep(.n-menu .n-menu-item-content.n-menu-item-content--selected::before) {
  background-color: #f5f5f5;
}
</style>
