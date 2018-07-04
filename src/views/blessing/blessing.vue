<style lang="less">
	@import '../../styles/common.less';
</style>
<template>
	<div>
		<Row>
			<Card>
				<span>名称：</span>
				<Input v-model="params.content" placeholder="请输入类型名称" clearable style="width: 200px"></Input>
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
	</div>
</template>
<script>
	import blessingService from '../../service/allBlessingService.js';
	import Cookies from 'js-cookie';

	export default {
		mixins: [blessingService],
		data() {
			return {
				resultValue: [],//列表数据
				params: {
					page: 1,//当前页数
					pagesize: 10,//每页显示条数
					content: '',//时间控件
				},
				pageTotal: null,//总页数
				typePid: '',
				typeName: '',//内容
				loading: true,//表格加载动画
				fCategory: [],
				tableColumns: [  //表头
					{
						title: 'ID',
						key: 'pray_id',
						width: 80,
						align: 'center',
					},
					{
						title: '祈福人',
						key: 'staff_nickname',
						align: 'center',
					},
					{
						title: '全景名称',
						key: 'pano_title',
						align: 'center',
					},
					{
						title: '是否包含红包',
						key: 'type',
						align: 'center',
						render: (h, params) => {
							return h('Icon', {
								props: {
									type: params.row.pray_ifmoney == '1' ? 'checkmark' : 'close',
								},
								style: {
									fontSize: '20px',
									color: params.row.pray_ifmoney == '1' ? 'green' : 'red',
								},
							});
						}
					},
					{
						title: '是否包含视频',
						key: 'type',
						align: 'center',
						render: (h, params) => {
							return h('Icon', {
								props: {
									type: params.row.pray_video ? 'checkmark' : 'close',
								},
								style: {
									fontSize: '20px',
									color: params.row.pray_video ? 'green' : 'red',
								},
							});
						}
					},
					{
						title: '是否包含语音',
						key: 'type',
						align: 'center',
						render: (h, params) => {
							return h('Icon', {
								props: {
									type: params.row.pray_voice  ? 'checkmark' : 'close',
								},
								style: {
									fontSize: '20px',
									color: params.row.pray_voice ? 'green' : 'red',
								},
							});
						}
					},
					{
						title: '内容',
						key: 'pray_content',
						align: 'center',
					},
					{
						title: '日期',
						key: 'pray_time',
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
											this.handleRemove(params.row.pray_id)
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
					token: Cookies.get('token'),
					prayid: id,
				}
				this.handleDeleteBlessing(params).then(() => {
					this.fetchList()
				})
			}
		}
	}
</script>