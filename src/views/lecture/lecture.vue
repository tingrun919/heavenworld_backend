<style lang="less">
	@import '../../styles/common.less';
</style>
<style lang="less">
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }

		img{
			width: 100%;
		}
    }
</style>
<template>
	<div>
		<Row>
			<Card>
				<span>发起者：</span>
				<Select v-model="params.userid" style="width: 200px" clearable filterable remote :remote-method="remoteMethod" :loading="loading1">
					<Option v-for="(option, index) in userList" :value="option.staffId" :key="index">{{option.staffNickname}}</Option>
			 	</Select>
				<span>状态：</span>
				<Select v-model="params.state" style="width: 200px" clearable>
					<Option v-for="(option, index) in status" :value="option.value" :key="index">{{option.label}}</Option>
				 </Select>
				<Button @click="fetchList" class="margin-left-10" type="primary" icon="search">查询</Button>
			</Card>
		</Row>
		<Row>
			<Card>
				<Table :loading="loading" stripe border :columns="tableColumns" :data="resultValue"></Table>
				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page show-elevator @on-page-size-change="changePage" :total="pageTotal" :current="params.page" @on-change="changePage"></Page>
					</div>
				</div>
			</Card>
		</Row>
		<Modal title="查看详情" width="30%" footer-hide scrollable v-model="commentShowAdd" v-if="resultOneShow" class-name="vertical-center-modal">
			<div v-html="resultOne[0].forumDesc"></div> 
		</Modal>
	</div>
</template>
<script>
	import lectureService from '../../service/lectureService.js'
	import userService from '../../service/userService.js'
	import Cookies from 'js-cookie';

	export default {
		mixins: [lectureService, userService],
		data() {
			return {
				resultValue: [],//列表数据
				resultOne:[],
				params: {
					page: 1,//当前页数
					pagesize: 10,//每页显示条数
					content: '',//时间控件
					userid: '',
					state:'',
					orgid: Cookies.get('orgid') == 1 ? '' : Cookies.get('orgid'),//二级分类model
				},
				commentShowAdd:false,
				status: [
					{
						value: '1',
						label: '待开课'
					},
					{
						value: '2',
						label: '开课中'
					},
					{
						value: '3',
						label: '已完成'
					},
				],
				userList: [],
				loading1: false,
				resultOneShow:false,
				pageTotal: null,//总页数
				typeName: '',//内容
				loading: true,//表格加载动画
				tableColumns: [  //表头
					{
						title: 'ID',
						key: 'forumId',
						width: 80,
						align: 'center',
					},
					{
						title: '讲堂名称',
						key: 'forumName',
						align: 'center',
					},
					{
						title: '发起人昵称',
						key: 'staffNickname',
						align: 'center',
					},
					{
						title: '参与人数',
						key: 'partakeCount',
						align: 'center',
						render: (h, params) => {
							return h('span', params.row.partakeCount + '人')
						}
					},
					{
						title: '参与条件',
						key: 'forumMoney',
						align: 'center',
						render: (h, params) => {
							return h('span', params.row.forumMoney + '元')
						}
					},
					{
						title: '开始时间',
						key: 'forumBegintime',
						align: 'center',
					},
					{
						title: '结束时间',
						key: 'forumEndtime',
						align: 'center',
					},
					{
						title: '状态',
						key: 'forumState',//1.带开课2。开课中3.已完成
						align: 'center',
						render: (h, params) => {
							return h('span', params.row.forumState === '1' ? '待开课' : params.row.forumState === '2' ? '开课中' : '已完成')
						}
					},
					{
						title: '操作',
						key: 'action',
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'success',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.viewDetail(params.row.forumId)
										}
									}
								}, '查看详情'),
								h('Poptip', {
									props: {
										confirm: true,
										title: '您确定要删除这条数据吗?',
										transfer: true
									},
									on: {
										'on-ok': () => {
											this.handleRemove(params.row.forumId)
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
				this.params.id = ''
				this.getBlessingList(this.params).then(res => {
					this.loading = false
					this.resultValue = res.list
					this.pageTotal = new Number(res.total)
				})
			},
			changeDate(val) {
				this.params.time = val
			},
			//分页
			changePage(pageNum) {
				this.loading = true
				this.params.page = pageNum
				this.fetchList()
			},
			handleRemove(id) {
				var params = {
					id: id,
				}
				this.handleDeleteBlessing(params).then(() => {
					this.fetchList()
				})
			},
			remoteMethod(query) {
				var params = {
					token: Cookies.get('token'),
					staffNickname: query,
					page: 1,
					pageSize: 20,
				}
				this.getUserList(params).then(res => {
					this.userList = res.list
				})
			},
			viewDetail(id){
				this.params.id = id;
				this.getDetailone(this.params).then(res => {
					this.loading = false
					this.commentShowAdd = true
					this.resultOne = res.list
					this.resultOneShow = true
				})
			}
		}
	}
</script>