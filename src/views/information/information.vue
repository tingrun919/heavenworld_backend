<style lang="less">
	@import '../../styles/common.less';
</style>
<template>
	<div>
		<Row>
			<Card>
				<span>标题名：</span>
				<Input v-model="page.infoTitle" placeholder="请输入标题名" clearable style="width: 150px"></Input>
				<span>发布人：</span>
				<Select v-model="page.staffid" style="width: 150px" clearable filterable remote :remote-method="remoteMethod" :loading="loading1">
               		<Option v-for="(option, index) in userList" :value="option.staffId" :key="index">{{option.staffNickname}}</Option>
            	</Select>
				<span class="margin-left-10">一级分类：</span>
				<Select v-model="page.typePId" clearable style="width:150px">
						<Option v-for="item in fCategory" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<span class="margin-left-10">二级分类：</span>
				<Select v-model="page.infoTypeId" clearable :disabled="fDisabled" style="width:150px">
						<Option v-for="item in sCategory" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<span class="margin-left-10">发布状态：</span>
				<Select v-model="page.infoState" clearable style="width:150px">
					<Option v-for="item in currentState" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<span class="margin-left-10">置顶状态：</span>
				<Select v-model="page.infoIftop" clearable style="width:150px">
					<Option v-for="item in currentTop" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Button @click="fetchList" class="margin-left-10" type="primary" icon="search">查询</Button>
			</Card>
		</Row>
		<Row>
			<Card>
				<Table :loading="loading" stripe border :columns="tableColumns" :data="resultValue"></Table>
				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page show-elevator show-sizer @on-page-size-change="changePage" :total="pageTotal" :current="page.page" @on-change="changePage"></Page>
					</div>
				</div>
			</Card>
		</Row>
	</div>
</template>
<script>
	import informationService from '../../service/informationService.js';
	import userService from '../../service/userService.js';
	import Cookies from 'js-cookie';

	export default {
		mixins: [informationService,userService],
		data() {
			return {
				ifThird: Cookies.get('orgid'),
				resultValue: [],//列表数据
				initResultValue: [],//列表数据
				pageTotal: null,//总页数
				category: [],//全部类型
				page: {
					page: 1,//当前页数
					pagesize: 10,//每页显示条数
					infoTitle: '',//标题搜索条件
					typePId: '',//一级分类model
					infoTypeId: '',//二级分类model
					infoState: '',//是否发布
					infoIftop: '',//是否置顶
					orgid: Cookies.get('orgid') == 1 ? '' : Cookies.get('orgid'),
					token: Cookies.get('token'),
					staffid:''
				},
				loading: true,//表格加载动画
				loading1:false,
				fCategory: [],//一级分类
				sCategory: [],//二级分类
				fDisabled: true,//二级分类是否启用
				userList: [],
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
						key: 'infoId',
						width: 80,
						align: 'center',
					},
					{
						title: '发布人',
						key: 'staffNickname',
						align: 'center',
					},
					{
						title: '标题名',
						key: 'infoTitle',
						align: 'center',
					},
					{
						title: '发布时间',
						key: 'infoCreatdate',
						align: 'center',
					},
					{
						title: '一级分类',
						key: 'typePName',
						align: 'center',
					},
					{
						title: '二级分类',
						key: 'typeName',
						align: 'center',
					},
					{
						title: '是否发布',
						key: 'infoState',
						align: 'center',
						sortable: true,
						render: (h, params) => {
							return h('Icon', {
								props: {
									type: params.row.infoState == 1 ? 'checkmark' : 'close',
								},
								style: {
									fontSize: '20px',
									color: params.row.infoState == 1 ? 'green' : 'red',
								},
							});
						}
					},
					{
						title: '是否置顶',
						key: 'infoIftop',
						align: 'center',
						sortable: true,
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'text',
									size: 'small',
									icon: params.row.infoIftop == 1 ? 'checkmark' : 'close',
									disabled: this.ifThird == 2
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
		watch: {
			'page.typePId': function () {
				this.sCategory = []
				if (this.page.typePId != '') {
					this.fDisabled = false
					for (var item of this.category) {
						if (item.typePid != 0 && item.typePid == this.page.typePId) {
							var data = {
								value: item.typeId,
								label: item.typeName,
							}
							this.sCategory.push(data)
						}
					}
				} else {
					this.page.infoTypeId = ''
					this.fDisabled = true
				}
			}
		},
		beforeMount() {
			this.fetchList()
			this.getCategory().then(res => {
				this.category = res
				this.handleCategory(res)
			})
		},
		methods: {
			//获取数据
			fetchList() {
				this.getInformationList(this.page).then(res => {
					this.loading = false
					this.resultValue = res.list
					this.pageTotal = new Number(res.total)
				})
			},
			//处理分类
			handleCategory(res) {
				for (var item of res) {
					if (item.typePid == 0) {	// 一级分类
						var data = {
							value: item.typeId,
							label: item.typeName,
						}
						this.fCategory.push(data)
					}
					// else {   					// 二级分类
					// 	var data = {
					// 		value: item.typeId,
					// 		label: item.typeName,
					// 	}
					// 	this.sCategory.push(data)
					// }
				}
			},
			//分页
			changePage(pageNum) {
				this.loading = true
				this.page.page = pageNum
				this.fetchList()
			},
			//删除资讯
			handleRemove(infoId) {
				var param = {
					infoId: infoId,
					token: Cookies.get("token")
				}
				this.removeInfo(param).then(() => {
					this.fetchList()
				})
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