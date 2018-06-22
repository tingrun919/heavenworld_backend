<style lang="less">
	@import '../../styles/common.less';
	@import './component/panoramic-new.less';
</style>
<template>
	<div>
		<Row>
			<Card>
				<span>标题名称：</span>
				<Input v-model="page.infoTitle" placeholder="请输入商品名称" clearable style="width: 200px"></Input>
				<span class="margin-left-10">分类：</span>
				<Select v-model="page.infoIftop" clearable style="width:150px">
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
	import Cookies from 'js-cookie';

	export default {
		mixins: [panoramicService],
		data() {
			return {
				resultValue: [],//列表数据
				pageTotal: null,//总页数
				category: [],//全部类型
				page: {
					page: 1,//当前页数
					pagesize: 5,//每页显示条数
					panoid: '',//标题搜索条件
					typeid: '',//一级分类model
					orgid: '',//二级分类model
				},
				loading: true,//表格加载动画
				fCategory: [],//一级分类
				sCategory: [],//二级分类
				fDisabled: true,//二级分类是否启用
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
						title: '是否置顶',
						key: 'panoRecommend',
						align: 'center',
						sortable: true,
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'text',
									size: 'small',
									icon: params.row.infoIftop == 1 ? 'checkmark' : 'close'
								},
								style: {
									fontSize: '20px',
									color: params.row.infoIftop == 1 ? 'green' : 'red',
								},
								on: {
									click: () => {
										this.handleIfTop(params.row.infoId, params.row.infoIftop)
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
											let argu = { information_id: params.row.infoId };
											this.$router.push({
												name: 'information-info',
												params: argu
											});
										}
									}
								}, Cookies.get('access') == 1 ? '编辑' : '查看'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.handleRemove(params.row.infoId)
										}
									}
								}, '删除')
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
				this.page.beginRow = pageNum
				this.fetchList()
			},
			//是否置顶
			handleIfTop(infoId, status) {
				var param = {
					infoId: infoId,
					token: Cookies.get("token"),
					infoIftop: status == 1 ? 0 : 1
				}
				this.updataIfTop(param).then(() => {
					this.fetchList()
				})
			}
		}
	}
</script>