import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', access: 0, title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
		{ path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') },
		{ path: 'other-index', access: 1, title: '首页', name: 'other_index', component: () => import('@/views/other-user-main/Other-user-main.vue') },
		{ path: 'information/:information_id', title: '资讯详情', name: 'information-info', component: () => import('@/views/information/component/information-detail.vue') },
		{ path: 'panoramic/new', title: '新增全景', name: 'panoramic_new', component: () => import('@/views/panoramic/component/panoramic-new.vue') },
		{ path: 'festival/:festival_id', title: '节日详情', name: 'festival_info', component: () => import('@/views/festival/component/festival-new.vue') },
		{ path: 'panoramic/:panoramic_id', title: '编辑全景', name: 'panoramic_edit', component: () => import('@/views/panoramic/component/panoramic-edit.vue') },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    // {
    //     path: '/component',
    //     icon: 'social-buffer',
    //     name: 'component',
    //     title: '组件',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'compose',
    //             name: 'text-editor',
    //             title: '富文本编辑器',
    //             component: () => import('@/views/my-components/text-editor/text-editor.vue')
    //         },
    //         {
    //             path: 'md-editor',
    //             icon: 'pound',
    //             name: 'md-editor',
    //             title: 'Markdown编辑器',
    //             component: () => import('@/views/my-components/markdown-editor/markdown-editor.vue')
    //         },
    //         {
    //             path: 'image-editor',
    //             icon: 'crop',
    //             name: 'image-editor',
    //             title: '图片预览编辑',
    //             component: () => import('@/views/my-components/image-editor/image-editor.vue')
    //         },
    //         {
    //             path: 'draggable-list',
    //             icon: 'arrow-move',
    //             name: 'draggable-list',
    //             title: '可拖拽列表',
    //             component: () => import('@/views/my-components/draggable-list/draggable-list.vue')
    //         },
    //         {
    //             path: 'area-linkage',
    //             icon: 'ios-more',
    //             name: 'area-linkage',
    //             title: '城市级联',
    //             component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
    //         },
    //         {
    //             path: 'file-upload',
    //             icon: 'android-upload',
    //             name: 'file-upload',
    //             title: '文件上传',
    //             component: () => import('@/views/my-components/file-upload/file-upload.vue')
    //         },
    //         {
    //             path: 'scroll-bar',
    //             icon: 'android-upload',
    //             name: 'scroll-bar',
    //             title: '滚动条',
    //             component: () => import('@/views/my-components/scroll-bar/scroll-bar-page.vue')
    //         },
    //         {
    //             path: 'count-to',
    //             icon: 'arrow-graph-up-right',
    //             name: 'count-to',
    //             title: '数字渐变',
    //             // component: () => import('@/views/my-components/count-to/count-to.vue')
    //             component: () => import('@/views/my-components/count-to/count-to.vue')
    //         },
    //         {
    //             path: 'split-pane-page',
    //             icon: 'ios-pause',
    //             name: 'split-pane-page',
    //             title: 'split-pane',
    //             component: () => import('@/views/my-components/split-pane/split-pane-page.vue')
    //         }
    //     ]
	// },
	{
        path: '/otherUsers',
        icon: 'grid',
        name: 'otherUser',
		title: '第三方管理',
		access: 0,
        component: Main,
        children: [
			{ path: 'index', title: '第三方管理', name: 'otherUser_index', icon: 'grid', component: () => import('@/views/other-user-main/Other-user-index.vue') },
        ]
	},
	{
        path: '/users',
        icon: 'grid',
        name: 'user',
		title: '用户管理',
		access: 0,
        component: Main,
        children: [
			{ path: 'index', title: '用户管理', name: 'user_index', icon: 'grid', component: () => import('@/views/user/user.vue') },
        ]
	},
	{
        path: '/informations',
        icon: 'grid',
        name: 'information',
        title: '资讯管理',
        component: Main,
        children: [
			{ path: 'index', title: '资讯管理', name: 'information_index', icon: 'grid', component: () => import('@/views/information/information.vue') },
        ]
	},
	{
        path: '/panoramics',
        icon: 'grid',
        name: 'panoramic',
        title: '全景管理',
        component: Main,
        children: [
			{ path: 'index', title: '全景管理', name: 'panoramic_index', icon: 'grid', component: () => import('@/views/panoramic/panoramic.vue') },
        ]
	},
	{
        path: '/robots',
        icon: 'grid',
        name: 'robot',
        title: '机器人管理',
		component: Main,
		access: 0,
        children: [
			{ path: 'robot_index', title: '机器人列表', name: 'robot_index', icon: 'grid', component: () => import('@/views/robot/robot.vue') },
			{ path: 'comment_model', title: '回复模版管理', name: 'comment_model', icon: 'grid', component: () => import('@/views/robot/comment_model.vue') },
        ]
	},
	{
        path: '/categorys',
        icon: 'grid',
		name: 'category',
		access: 0,
        title: '分类管理',
        component: Main,
        children: [
			{ path: 'category_panoramic', title: '全景分类', name: 'category_panoramic', icon: 'grid', component: () => import('@/views/category/category_panoramic.vue') },
			{ path: 'category_information', title: '资讯分类', name: 'category_information', icon: 'grid', component: () => import('@/views/category/category_information.vue') },
        ]
	},
	{
        path: '/search',
        icon: 'grid',
        name: 'search',
		title: '搜索管理',
		access: 0,
        component: Main,
        children: [
			{ path: 'hotword', title: '设置热搜', name: 'hotword', icon: 'grid', component: () => import('@/views/search/hotword.vue') },
			{ path: 'shield', title: '搜索屏蔽词管理', name: 'shield', icon: 'grid', component: () => import('@/views/search/shield.vue') },
        ]
	},
	{
        path: '/festivals',
        icon: 'grid',
		name: 'festival',
		access: 0,
        title: '节日管理',
        component: Main,
        children: [
			{ path: 'festival_index', title: '节日管理', name: 'festival_index', icon: 'grid', component: () => import('@/views/festival/festival.vue') },
        ]
    },
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
];
