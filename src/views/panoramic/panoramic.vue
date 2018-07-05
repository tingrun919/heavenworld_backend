<style lang="less">
	@import '../../styles/common.less';
	@import './component/panoramic-new.less';
</style>
<template>
	<div>
		<Row>
			<Card>
				<span>标题名称：</span>
				<Input v-model="page.titlename" placeholder="请输入标题名称" clearable style="width: 200px"></Input>
				<span>发布人：</span>
				<Select v-model="page.staffid" style="width: 200px" clearable filterable remote :remote-method="remoteMethod" :loading="loading1">
               		<Option v-for="(option, index) in userList" :value="option.staffId" :key="index">{{option.staffNickname}}</Option>
            	</Select>
				<span class="margin-left-10">分类：</span>
				<Select v-model="page.typeid" clearable style="width:150px">
						<Option v-for="item in category" :value="item.typeId" :key="item.typeId">{{ item.typeName }}</Option>
					</Select>
				<Button @click="fetchList" class="margin-left-10" type="primary" icon="search">查询</Button>
			</Card>
		</Row>
		<Row>
			<Card>
				<Table :loading="loading" stripe border :columns="tableColumns" :data="resultValue"></Table>
				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page show-elevator show-sizer @on-page-size-change="changePage" :total="pageTotal" :current="page.beginRow" @on-change="changePage"></Page>
					</div>
				</div>
			</Card>
		</Row>
	</div>
</template>
<script>
	import panoramicService from '../../service/panoramicService.js';
	import userService from '../../service/userService.js';
	import Cookies from 'js-cookie';

	export default {
		mixins: [panoramicService, userService],
		data() {
			return {
				resultValue: [],//列表数据
				pageTotal: null,//总页数
				category: [],//全部类型
				page: {
					page: 1,//当前页数
					pagesize: 10,//每页显示条数
					panoid: '',//标题搜索条件
					typeid: '',//一级分类model
					titlename:'',
					orgid: Cookies.get('orgid') == 1 ? '' : Cookies.get('orgid'),//二级分类model
				},
				loading: true,//表格加载动画
				fCategory: [],//一级分类
				sCategory: [],//二级分类
				fDisabled: true,//二级分类是否启用
				userList: [],
				loading1:false,
				currentState: [//是否发布
					{
						value: '1',
						label: '已发布'
					},
					{
						value: '0',
						label: '未发布'
					}
				],
				currentTop: [//是否置顶
					{
						value: '1',
						label: '已置顶'
					},
					{
						value: '0',
						label: '未置顶'
					}
				],

				cityList: [
					{
						value: '全部',
						label: '全部'
					},
					{
						value: '礼券',
						label: '礼券'
					},
					{
						value: '现货',
						label: '现货'
					},
				],
				tableColumns: [  //表头
					{
						title: 'ID',
						key: 'panoId',
						width: 80,
						align: 'center',
					},
					{
						title: '主图',
						key: 'panoMainpic',
						align: 'center',
						render: (h, params) => {
							return h('img', {
								attrs: {
									src: params.row.panoMainpic,
									width: 100,
									height: 100,
								},
								on: {
									click: () => {
										// console.log(params,'12')
										// this.show(params.index)
									}
								}
							})
						}
					},
					{
						title: '发布人',
						key: 'staffNickname',
						align: 'center',
					},
					{
						title: '标题名',
						key: 'panoTitle',
						align: 'center',
					},
					{
						title: '发布时间',
						key: 'panoCreatetime',
						align: 'center',
					},
					{
						title: '分类',
						key: 'typeName',
						align: 'center',
					},
					{
						title: '是否上架',
						key: 'panoState',
						align: 'center',
						sortable: true,
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'text',
									size: 'small',
									icon: params.row.panoState == 1 ? 'checkmark' : 'close'
								},
								style: {
									fontSize: '20px',
									color: params.row.panoState == 1 ? 'green' : 'red',
								},
								on: {
									click: () => {
										this.handleIfTop(params.row.panoId, params.row.panoState)
									}
								}
							});
						}
					},
					{
						title: '操作',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											if (params.row.panoState == -1) {
												this.$Message.error('正在生成，请稍后再试！');
												return;
											}
											let argu = { panoramic_id: params.row.panoId };
											this.$router.push({
												name: 'panoramic_edit',
												params: argu
											});
										}
									}
								}, Cookies.get('access') == 1 ? '编辑' : '查看'),
								// h('Button', {
								// 	props: {
								// 		type: 'error',
								// 		size: 'small'
								// 	},
								// 	style: {
								// 		marginRight: '5px'
								// 	},
								// 	on: {
								// 		click: () => {
								// 			this.handleRemove(params.row.panoId)
								// 		}
								// 	}
								// }, '删除')
							]);
						}
					}
				],
			}
		},
		beforeMount() {
			this.fetchList()
			this.getCategory().then(res => {
				this.category = res
			})
		},
		methods: {
			//获取数据
			fetchList() {
				this.getPanoramicList(this.page).then(res => {
					this.loading = false
					this.resultValue = res.list
					this.pageTotal = new Number(res.total)
				})
			},
			//分页
			changePage(pageNum) {
				this.loading = true
				this.page.page = pageNum
				this.fetchList()
			},
			//是否置顶
			handleIfTop(infoId, status) {
				if (status == -1) {
					this.$Message.error('正在生成，请稍后再试！');
					return;
				}
				var param = {
					panoid: infoId,
					token: Cookies.get("token"),
					state: status == 1 ? 0 : 1
				}
				this.updataIfTop(param).then(() => {
					this.fetchList()
				})
			},
			remoteMethod(query){
				var params = {
					token: Cookies.get('token'),
					staffNickname: query,
					page:1,
					pageSize:20,
				}
				this.getUserList(params).then(res => {
					this.userList = res.list
				})
			}
		}
	}
</script>