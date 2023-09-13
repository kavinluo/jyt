import Layout from '@/layout'

const tableRoute = {
  path: '/table',
  component: Layout,
  redirect: '/table/base-table',
  name: 'Table',
  meta: {
    title: '表格',
    icon: 'icon-table'
  },
  children: [
    {
      path: 'base-table',
      name: '基础表格',
      component: () => import('_v/Table/base-table/index'),
      meta: {
        title: '基础表格'
      }
    },
    {
      path: 'index-table',
      name: '索引表格',
      component: () => import('_v/Table/index-table/index'),
      meta: {
        title: '索引表格'
      }
    },
    {
      path: 'page-table',
      name: '分页表格',
      component: () => import('_v/Table/page-table/index'),
      meta: {
        title: '分页表格'
      }
    },
    {
      path: 'search-table',
      name: '搜索栏表格',
      component: () => import('_v/Table/search-table/index'),
      meta: {
        title: '搜索栏表格'
      }
    },
    {
      path: 'stripe-table',
      name: '斑马纹表格',
      component: () => import('_v/Table/stripe-table/index'),
      meta: {
        title: '斑马纹表格'
      }
    },
    {
      path: 'row-class-name-table',
      name: '状态表格',
      component: () => import('_v/Table/row-class-name-table/index'),
      meta: {
        title: '状态表格'
      }
    },
    {
      path: 'column-fixed-table',
      name: '固定列',
      component: () => import('_v/Table/column-fiexd-table/index'),
      meta: {
        title: '固定列'
      }
    },
    {
      path: 'radio-select-table',
      name: 'radio单选表格',
      component: () => import('_v/Table/radio-select-table/index'),
      meta: {
        title: 'radio单选表格'
      }
    },
    {
      path: 'select-table',
      name: '多选表格',
      component: () => import('_v/Table/select-table/index'),
      meta: {
        title: '多选表格'
      }
    },
    {
      path: 'sort-table',
      name: '排序表格',
      component: () => import('_v/Table/sort-table/index'),
      meta: {
        title: '排序表格'
      }
    },
    {
      path: 'filters-table',
      name: '筛选表格',
      component: () => import('_v/Table/filters-table/index'),
      meta: {
        title: '筛选表格'
      }
    }
  ]
}

export default tableRoute
