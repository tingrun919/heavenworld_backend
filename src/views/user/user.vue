<style lang="less">
	@import '../../styles/common.less';
</style>
<template>
	<div>
		<Row>
			<Card>
				<span>用户名称：</span>
				<Input v-model="params.staffNickname" placeholder="请输入用户名称" clearable style="width: 200px"></Input>
				<Button @click="fetchList" class="margin-left-10" type="primary" icon="search">查询</Button>
			</Card>
		</Row>
		<Row>
			<Card>
				<can-edit-table @on-delete="handleRemove" v-model="resultValue" :columns-list="tableColumns"></can-edit-table>
				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page show-elevator show-sizer @on-params-size-change="changePage" :total="pageTotal" :current="params.beginRow" @on-change="changePage"></Page>
					</div>
				</div>
			</Card>
		</Row>
	</div>
</template>
<script>
	import userService from '../../service/userService.js';
	import canEditTable from '../util/canEditTable.vue';
	import Cookies from 'js-cookie';

	export default {
		mixins: [userService],
		components: {
			canEditTable
		},
		data() {
			return {
				resultValue: [],//列表数据
				pageTotal: null,//总页数
				params: {
					token: Cookies.get('token'),
					page: 1,//当前页数
					pagesize: 10,//每页显示条数
					staffNickname: '',
				},
				loading: true,//表格加载动画
				tableColumns: [  //表头
					{
						title: 'ID',
						key: 'staffId',
						width: 80,
						align: 'center',
					},
					{
						title: '昵称',
						key: 'staffNickname',
						align: 'center',
					},
					{
						title: '电话',
						key: 'staffPhone',
						align: 'center',
					},
					{
						title: '状态',
						key: 'staffState',
						align: 'center',
						sortable: true,
						render: (h, params) => {
							const row = params.row;
							const type = row.staffState == 0 ? 'error' : 'primary';
							const text = row.staffState == 0 ? '封禁' : '正常'
							return h('Button', {
								props: {
									type: type,
								},
								on: {
									click: () => {
										this.handleUpdateUserIndexStatus(params.row)
									}
								}
							}, text);
						},
					},
					{
						title: '操作',
						key: 'action',
						width: 250,
						align: 'center',
						handle: ['delete'],
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
				this.getUserList(this.params).then(res => {
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
			//删除资讯
			handleRemove(val) {
				var param = {
					staffId: val.staffId,
					token: Cookies.get("token")
				}
				this.removeUser(param).then(() => {
					this.fetchList()
				})
			},
			//修改第三方是否封禁
			handleUpdateUserIndexStatus(val){
				var params = {
					token:Cookies.get('token'),
					staffId:val.staffId,
					staffState:val.staffState == 1 ? 0 : 1
				}
				this.updateUserState(params).then(() => {
					this.fetchList()
				})
			},
		}
	}
</script>