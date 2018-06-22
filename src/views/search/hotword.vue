<style lang="less">
	@import '../../styles/common.less';
</style>
<template>
	<div>
		<Row>
			<Card>
				<Input v-model="params.keyword" placeholder="请输入要增加的关键词" clearable style="width: 300px"></Input>
				<Input v-model="params.sort" placeholder="请输入关键词的显示顺序" clearable style="width: 300px"></Input>
				<Button @click="handleAddHotWord" class="margin-left-10" type="primary" icon="plus">增加</Button>
			</Card>
		</Row>
		<Row>
			<Card>
				<can-edit-table @on-change="handleChange" @on-delete="handleRemove" v-model="resultValue" :columns-list="tableColumns"></can-edit-table>
				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page show-elevator show-sizer @on-page-size-change="changePage" :total="pageTotal" :current="params.page" @on-change="changePage"></Page>
					</div>
				</div>
			</Card>
		</Row>
	</div>
</template>
<script>
	import canEditTable from '../util/canEditTable.vue';
	import searchService from '../../service/searchService.js';
	import Cookies from 'js-cookie';

	export default {
		mixins: [searchService],
		components: {
			canEditTable
		},
		data() {
			return {
				resultValue: [],//列表数据
				pageTotal: null,//总页数
				category: [],//全部类型
				params: {
					page: 1,//当前页数
					pageSize: 10,//每页显示条数
					token: Cookies.get('token'),
					type: 1,
					keyword: '',
					sort: '',
				},
				loading: true,//表格加载动画
				tableColumns: [  //表头
					{
						title: 'ID',
						key: 'searId',
						width: 80,
						align: 'center',
					},
					{
						title: '展示顺序',
						key: 'searSort',
						width: 260,
						align: 'center',
						editable: true
					},
					{
						title: '关键词',
						key: 'searKeyword',
						align: 'center',
						editable: true
					},
					{
						title: '操作',
						key: 'action',
						width: 250,
						align: 'center',
						handle: ['edit', 'delete']
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
				this.getSearchHotWordList(this.params).then(res => {
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
			handleAddHotWord() {
				this.AddHotWordApi(this.params).then(() => {
					this.params.keyword = ''
					this.params.sort = ''
					this.fetchList()
				})
			},
			handleRemove(val) {
				this.params.id = val.searId
				this.RemoveHotWordApi(this.params).then(() => {
					this.params.keyword = ''
					this.params.sort = ''
					this.params.id = ''
					this.fetchList()
				})
			},
			handleChange(val, index) {
				this.params.id = val[index].searId
				this.params.sort = val[index].searSort
				this.params.keyword = val[index].searKeyword
				this.updataHotWordApi(this.params).then(() => {
					this.params.keyword = ''
					this.params.sort = ''
					this.params.id = ''
					this.fetchList()
				})
			}
		}
	}
</script>