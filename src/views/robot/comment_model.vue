<style lang="less">
	@import '../../styles/common.less';
	@import './comment_model.less';
</style>
<template>
	<div>
		<Row>
			<Card>
				<span>内容查询：</span>
				<Input v-model="page.temContent" placeholder="请输入商品名称" clearable style="width: 200px"></Input>
				<Button @click="commentShowAdd = true" class="margin-left-10" type="success" icon="plus">新增</Button>
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
		<Modal title="新增" @on-ok="handleAddComment" v-model="commentShowAdd" class-name="vertical-center-modal">
			<Input v-model="temContent" placeholder="Enter something..."></Input>
		</Modal>
		<Modal title="编辑" @on-ok="handleEditComment" v-model="commentShowEdit" class-name="vertical-center-modal">
			<Input v-model="editTemContent" placeholder="Enter something..."></Input>
		</Modal>
	</div>
</template>
<script>
	import commentmodelService from '../../service/commentmodelService.js';
	import Cookies from 'js-cookie';

	export default {
		mixins: [commentmodelService],
		data() {
			return {
				resultValue: [],//列表数据
				pageTotal: null,//总页数
				page: {
					beginRow: 1,//当前页数
					pageSize: 10,//每页显示条数
					token: Cookies.get('token'),
					temContent: '',//模版内容
				},
				temContent: '',//内容
				editTemContent:'',//编辑内容
				editID:'',//编辑ID
				loading: true,//表格加载动画
				commentShowAdd: false,
				commentShowEdit: false,
				tableColumns: [  //表头
					{
						title: 'ID',
						key: 'temId',
						width: 80,
						align: 'center',
					},
					{
						title: '内容',
						key: 'temContent',
						align: 'center',
					},
					{
						title: '创建时间',
						key: 'temCreatetime',
						align: 'center',
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
											this.editTemContent = params.row.temContent
											this.editID = params.row.temId
											this.commentShowEdit = true
										}
									}
								}, '编辑'),
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
											this.handleRemoveComment(params.row.temId)
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
		},
		methods: {
			//获取数据
			fetchList() {
				this.getCommentModelList(this.page).then(res => {
					this.loading = false
					this.resultValue = res
					this.pageTotal = new Number(res[0].robotcommentCount)
				})
			},
			//分页
			changePage(pageNum) {
				this.loading = true
				this.page.beginRow = pageNum
				this.fetchList()
			},
			//新增评论模版
			handleAddComment() {
				var params = {
					token: Cookies.get('token'),
					temContent: this.temContent,
				}
				this.AddCommentApi(params).then(() => {
					this.fetchList()
				})
			},
			//修改评论模版
			handleEditComment(){
				var params = {
					token: Cookies.get('token'),
					temContent: this.editTemContent,
					temId: this.editID,
				}
				this.EditCommentApi(params).then(() => {
					this.fetchList()
				})	
			},
			//删除评论模版
			handleRemoveComment(id) {
				var params = {
					token: Cookies.get('token'),
					temId: id,
				}
				this.DeleteCommentApi(params).then(() => {
					this.fetchList()
				})
			},

		}
	}
</script>