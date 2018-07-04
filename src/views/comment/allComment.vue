<style lang="less">
	@import '../../styles/common.less';
</style>
<style>
	.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-content {
		margin-top: -16px;
	}

	.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-content>.ivu-tabs-tabpane {
		background: #fff;
		padding: 16px;
	}

	.demo-tabs-style1>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
		border-color: transparent;
	}

	.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
		border-color: #fff;
	}

	.demo-tabs-style2>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
		border-radius: 0;
		background: #fff;
	}

	.demo-tabs-style2>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
		border-top: 1px solid #3399ff;
	}

	.demo-tabs-style2>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active:before {
		content: '';
		display: block;
		width: 100%;
		height: 1px;
		background: #3399ff;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
<template>
	<div>
		<Row :gutter="32">
			<Col span="24" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
			<Tabs type="card" @on-click="loadingComment">
				<TabPane label="资讯">
					<Row>
						<Card>
							<span>内容：</span>
							<Input v-model="params.content" placeholder="请输入资讯内容" clearable style="width: 200px"></Input>
							<Button @click="fetchList" class="margin-left-10" type="primary" icon="search">查询</Button>
						</Card>
					</Row>
					<Row>
						<Card>
							<Table :loading="loading" stripe border :columns="tableColumns" :data="resultValue"></Table>
							<div style="margin: 10px;overflow: hidden">
								<div style="float: right;">
									<Page show-elevator show-sizer @on-page-size-change="changePage" :total="pageTotal" :current="params.page" @on-change="changePage"></Page>
								</div>
							</div>
						</Card>
					</Row>
				</TabPane>
				<TabPane label="全景">
					<Row>
						<Card>
							<span>内容：</span>
							<Input v-model="params.content" placeholder="请输入全景内容" clearable style="width: 200px"></Input>
							<Button @click="fetchList" class="margin-left-10" type="primary" icon="search">查询</Button>
						</Card>
					</Row>
					<Row>
						<Card>
							<Table :loading="loading" stripe border :columns="tableColumns2" :data="resultValue"></Table>
							<div style="margin: 10px;overflow: hidden">
								<div style="float: right;">
									<Page show-elevator show-sizer @on-page-size-change="changePage" :total="pageTotal" :current="params.page" @on-change="changePage"></Page>
								</div>
							</div>
						</Card>
					</Row>
				</TabPane>
				<TabPane label="祈福">
					<Row>
						<Card>
							<span>内容：</span>
							<Input v-model="params.content" placeholder="请输入祈福内容" clearable style="width: 200px"></Input>
							<Button @click="fetchList" class="margin-left-10" type="primary" icon="search">查询</Button>
						</Card>
					</Row>
					<Row>
						<Card>
							<Table :loading="loading" stripe border :columns="tableColumns3" :data="resultValue"></Table>
							<div style="margin: 10px;overflow: hidden">
								<div style="float: right;">
									<Page show-elevator show-sizer @on-page-size-change="changePage" :total="pageTotal" :current="params.page" @on-change="changePage"></Page>
								</div>
							</div>
						</Card>
					</Row>
				</TabPane>
			</Tabs>
			</Col>
		</Row>
	</div>
</template>
<script>
	import allComment from '../../service/allCommentService.js';
	import canEditTable from '../util/canEditTable.vue';
	import Cookies from 'js-cookie';
	import dateUtil from 'iview/src/utils/date'


	export default {
		mixins: [allComment],
		components: {
			canEditTable
		},
		data() {
			return {
				cityList: [
					{
						value: 1,
						label: '资讯'
					},
					{
						value: 2,
						label: '全景'
					},
					{
						value: 3,
						label: '祈福'
					}
				],
				resultValue: [],//列表数据
				params: {
					page: 1,//当前页数
					pagesize: 10,//每页显示条数
					type: 1,
					content: ''
				},
				pageTotal: null,//总页数
				typePid: '',
				handleType:1,
				typeName: '',//内容
				loading: true,//表格加载动画
				fCategory: [],
				tableColumns: [  //表头
					{
						title: 'ID',
						key: 'com_id',
						width: 80,
						align: 'center',
					},
					{
						title: '评论人',
						key: 'staff_nickname',
						align: 'center',
					},
					{
						title: '评论的文章',
						key: 'info_title',
						align: 'center',
					},
					{
						title: '评论内容',
						key: 'com_content',
						align: 'center',
					},
					{
						title: '评论时间',
						key: 'com_date',
						align: 'center',
					},
					{
						title: '操作',
						key: 'action',
						width: 350,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Poptip', {
									props: {
										confirm: true,
										title: '您确定要删除这条数据吗?',
										transfer: true
									},
									on: {
										'on-ok': () => {
											this.handleRemove(params.row.com_id)
										}
									}
								}, [
										h('Button', {
											style: {
												marginRight: '5px'
											},
											props: {
												size: 'small',
												type: 'error',
												placement: 'top'
											}
										}, '删除')
									])
							]);
						}
					}
				],
				tableColumns2: [  //表头
					{
						title: 'ID',
						key: 'c_id',
						width: 80,
						align: 'center',
					},
					{
						title: '评论人',
						key: 'staff_nickname',
						align: 'center',
					},
					{
						title: '评论的全景',
						key: 'pano_title',
						align: 'center',
					},
					{
						title: '评论内容',
						key: 'c_content',
						align: 'center',
					},
					{
						title: '评论时间',
						key: 'c_time',
						align: 'center',
					},
					{
						title: '操作',
						key: 'action',
						width: 350,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Poptip', {
									props: {
										confirm: true,
										title: '您确定要删除这条数据吗?',
										transfer: true
									},
									on: {
										'on-ok': () => {
											this.handleRemove(params.row.c_id)
										}
									}
								}, [
										h('Button', {
											style: {
												marginRight: '5px'
											},
											props: {
												size: 'small',
												type: 'error',
												placement: 'top'
											}
										}, '删除')
									])
							]);
						}
					}
				],
				tableColumns3: [  //表头
					{
						title: 'ID',
						key: 'c_id',
						width: 80,
						align: 'center',
					},
					{
						title: '评论人',
						key: 'staff_nickname',
						align: 'center',
					},
					{
						title: '评论的全景',
						key: 'pano_title',
						align: 'center',
					},
					{
						title: '评论内容',
						key: 'c_content',
						align: 'center',
					},
					{
						title: '评论时间',
						key: 'c_time',
						align: 'center',
					},
					{
						title: '操作',
						key: 'action',
						width: 350,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Poptip', {
									props: {
										confirm: true,
										title: '您确定要删除这条数据吗?',
										transfer: true
									},
									on: {
										'on-ok': () => {
											this.handleRemove(params.row.c_id)
										}
									}
								}, [
										h('Button', {
											style: {
												marginRight: '5px'
											},
											props: {
												size: 'small',
												type: 'error',
												placement: 'top'
											}
										}, '删除')
									])
							]);
						}
					}
				],
			}
		},
		beforeMount() {
			this.fetchList()
		},
		methods: {
			//获取数据
			fetchList() {
				this.getCommentList(this.params).then(res => {
					this.loading = false
					this.resultValue = res.list
					this.pageTotal = new Number(res.total)
				})
			},
			//分页
			changePage(pageNum) {
				this.loading = true
				this.params.page = pageNum
				this.fetchList()
			},
			loadingComment(index) {
				if (index == 0) {
					this.handleType = 1
					this.params.type = 1
				} else if (index == 1) {
					this.params.type = 2
					this.handleType = 2
				} else {
					this.handleType = 3
					this.params.type = 3
				}
				this.fetchList()
			},
			handleRemove(id){
				var params = {
					type:this.handleType,
					pid :id
				}
				this.handleDeleteComment(params).then(() => {
					this.fetchList()
				})
			}
		}
	}
</script>