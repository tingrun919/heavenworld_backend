<style lang="less">
	@import '../../styles/common.less';
</style>
<template>
	<div>
		<Row>
			<Card>
				<span>节日名称：</span>
				<Input v-model="params.name" placeholder="请输入类型名称" clearable style="width: 200px"></Input>
				<span>日期：</span>
				<Date-picker @on-change="changeDate" v-model="params.time" type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
				<Button @click="fetchList" class="margin-left-10" type="primary" icon="search">查询</Button>
				<Button @click="releaseFl" class="margin-left-10" type="success" icon="plus">新增</Button>
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
	</div>
</template>
<script>
	import festivalService from '../../service/festivalService.js';
	import canEditTable from '../util/canEditTable.vue';
	import Cookies from 'js-cookie';
	import dateUtil from 'iview/src/utils/date'


	export default {
		mixins: [festivalService],
		components: {
			canEditTable
		},
		data() {
			return {
				resultValue: [],//列表数据
				params: {
					token: Cookies.get('token'),
					page: 1,//当前页数
					pagesize: 10,//每页显示条数
					name: '',//节日名称,
					time: null,//时间控件
				},
				pageTotal: null,//总页数
				typePid: '',
				typeName: '',//内容
				loading: true,//表格加载动画
				fCategory: [],
				tableColumns: [  //表头
					{
						title: 'ID',
						key: 'holId',
						width: 80,
						align: 'center',
					},
					{
						title: '节日名称',
						key: 'holName',
						align: 'center',
					},
					{
						title: '日期',
						key: 'holTime',
						align: 'center',
					},
					{
						title: '操作',
						key: 'action',
						width: 350,
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
											let argu = { festival_id: params.row.holId };
											this.$router.push({
												name: 'festival_info',
												params: argu
											});
										}
									}
								}, '编辑'),
								h('Poptip', {
									props: {
										confirm: true,
										title: '您确定要删除这条数据吗?',
										transfer: true
									},
									on: {
										'on-ok': () => {
											this.handleRemove(params.row.holId)
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
				this.getFestivalList(this.params).then(res => {
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
			//新增全景类型
			releaseFl() {
				let argu = { festival_id: 'new' };
				this.$router.push({
					name: 'festival_info',
					params: argu
				});
			},
			//删除全景类型
			handleRemove(id) {
				var params = {
					token: Cookies.get('token'),
					id: id,
				}
				this.DeleteFestivalApi(params).then(() => {
					this.fetchList()
				})
			},
			//修改类型名称
			handleUpdatePanoramicCategory(val, index) {
				var params = {
					token: Cookies.get('token'),
					typeId: val[index].typeId,
					typeName: val[index].typeName
				}
				this.UpdateCategoryInformationApi(params).then(() => {
					this.fetchList()
				})
			},
			//修改是否默认展示
			handleUpdateInformationCategoryIf(typeId, typeIfedit, typeName) {
				var params = {
					token: Cookies.get('token'),
					typeId: typeId,
					typeIfedit: typeIfedit == '0' ? '1' : '0',
					typeName: typeName
				}
				this.UpdateCategoryInformationApi(params).then(() => {
					this.fetchList()
				})
			}
		}
	}
</script>