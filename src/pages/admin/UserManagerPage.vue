<template>
  <div class="userManage">
    <!-- 搜索表单 -->
    <a-form layout="inline" :model="searchParams" @finish="doSearch">
      <a-form-item label="账号">
        <a-input v-model:value="searchParams.userAccount" allowClear="true" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item label="用户名">
        <a-input v-model:value="searchParams.userName" allowClear="true" placeholder="请输入用户名 " />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">搜索</a-button>
      </a-form-item>
    </a-form>


    <!-- 分割线 -->
    <a-divider />

    <!-- 表格 -->
    <a-table :columns="columns" :data-source="data" :pagination="pagination" @change="doTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'userAvatar'">
          <a-image :src="record.userAvatar" :width="120" />
        </template>
        <template v-if="column.dataIndex === 'userProfile'">
          {{ record.userProfile ? record.userProfile : '暂无简介' }}
        </template>
        <template v-else-if="column.dataIndex === 'userRole'">
          <div v-if="record.userRole === 'admin'">
            <a-tag color="green">管理员</a-tag>
          </div>
          <div v-else>
            <a-tag color="blue">普通用户</a-tag>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-else-if="column.key === 'action'">
          <a-popconfirm placement="left"  title="确认要删除该用户吗，此操作不可逆" ok-text="Yes" cancel-text="No" @confirm="confirm(record.id)"
            @cancel="cancel">
            <a-button danger>删除</a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { deleteUser, listUserVoByPage } from '@/api/userController'
import { message, Pagination } from 'ant-design-vue'
import { computed, onMounted, reactive, ref } from 'vue'
import dayjs from 'dayjs'

// 展示表格的列数据
const columns = [
  {
    title: 'id',//表格中文列名称
    dataIndex: 'id'//数据源字段名称
  },
  {
    title: '账号',
    dataIndex: 'userAccount'
  },
  {
    title: '用户名',
    dataIndex: 'userName'
  },
  {
    title: '头像',
    dataIndex: 'userAvatar'
  },
  {
    title: '简介',
    dataIndex: 'userProfile'
  },
  {
    title: '用户角色',
    dataIndex: 'userRole'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '操作',
    key: 'action'
  }
]
// 获取用户数据
const data = ref<API.UserVO[]>([])
const total = ref(0)
// 搜索条件
const searchParams = reactive<API.UserQueryRequest>({
  pageNum: 1,
  pageSize: 10
})

const fetchData = async () => {
  try {
    const res = await listUserVoByPage({
      ...searchParams
    })
    if (res.data.code === 0 && res.data.data) {
      data.value = res.data.data.records ?? 0
      total.value = res.data.data.totalRow ?? 0
    } else {
      message.error(res.data.message)
    }
  } catch (error) {
    message.error('获取用户列表失败' + error.message)
  }
}

// 分页参数
const pagination = computed(() => {
  return {
    current: searchParams.pageNum ?? 1,
    pageSize: searchParams.pageSize ?? 10,
    total: total.value,
    showSizeChanger: true,
    showTotal: (total: number) => `共 ${total} 条`
  }
})

// 表格变化处理
const doTableChange = (page: any) => {
  searchParams.pageNum = page.current
  searchParams.pageSize = page.pageSize
  fetchData()
}

// 获取数据
const doSearch = () => {
  // 重置页码
  console.log('搜索了' + searchParams.userName)
  searchParams.pageNum = 1
  fetchData()
}

// 删除用户
const doDelete = async (id: number) => {
  if (!id) return
  try {
    const res = await deleteUser({ id })
    if (res.data.code === 0 && res.data) {
      message.success('删除成功')
      fetchData()
    } else {
      message.error(res.data.message)
    }
  } catch (err) {
    message.error('删除失败' + err.message)
  }
}

const confirm = (id: number) => {
  doDelete(id)
};

const cancel = (e: MouseEvent) => {
  message.error('取消删除');
};

onMounted(() => {
  fetchData()
})
</script>

<style scoped lang="scss"></style>
