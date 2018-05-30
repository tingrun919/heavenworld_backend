<style lang="less">
	@import '../../../styles/common.less';
</style>
<template>
	<div>
		<Row>
			<Card>
				<span>商品名称：</span>
				<Input v-model="value" placeholder="请输入商品名称" clearable style="width: 200px"></Input>
				<span class="margin-left-10">商品类型：</span>
				<Select v-model="model1" style="width:200px">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
				<Button class="margin-left-20" type="primary" icon="ios-search">搜索</Button>
				<Button class="margin-left-10" type="success" icon="android-add">新增</Button>
			</Card>
		</Row>
		<Row>
			<Card>
				<Table stripe border :columns="tableColumns1" :data="tableData1"></Table>
				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page show-elevator show-sizer @on-page-size-change="changePage" :total="100" :current="1" @on-change="changePage(10)"></Page>
					</div>
				</div>
			</Card>
		</Row>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				value: '',
				model1: '全部',
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
				tableData1: this.mockTableData1(10),
				tableColumns1: [
					{
						title: 'ID',
						key: 'id',
						width: 80,
						align: 'center',
					},
					{
						title: '商品名称',
						key: 'name',
						align: 'center',
					},
					{
						title: '主图',
						key: 'img',
						align: 'center',
						render: (h, params) => {
							return h('img', {
								attrs: {
									src: params.row.img,
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
						title: '原价',
						key: 'retailPrice',
						align: 'center',
						render: (h, params) => {
							return h('span', [
								'¥' + params.row.retailPrice
							]);
						}
					},
					{
						title: '销售价',
						key: 'masterPrice',
						align: 'center',
						render: (h, params) => {
							return h('span', [
								'¥' + params.row.masterPrice
							]);
						}
					},
					{
						title: '类型',
						key: 'type',
						align: 'center',
						render: (h, params) => {
							return h('span', [
								params.row.type == 1 ? '礼券' : '现货'
							]);
						}
					},
					{
						title: '规格',
						key: 'specification',
						align: 'center',
					},
					{
						title: '是否上架',
						key: 'available',
						align: 'center',
						sortable: true,
						render: (h, params) => {
							return h('Icon', {
								props: {
									type: params.row.available ? 'checkmark' : 'close',
								},
								style: {
									fontSize: '20px',
									color: params.row.available ? 'green' : 'red',
								},
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
											let argu = { product_id: params.row.id };
											this.$router.push({
												name: 'product-info',
												params: argu
											});
										}
									}
								}, '编辑'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.remove(params.index)
										}
									}
								}, '删除')
							]);
						}
					}
				],
			}
		},
		methods: {
			mockTableData1(pageSize) {
				let data = [];
				for (let i = 0; i < pageSize; i++) {
					data.push({
						id: i + 1,
						name: '阳澄湖大闸蟹6对礼盒装',
						img: '//img12.360buyimg.com/n1/jfs/t19426/264/1610686010/451016/9b083eb8/5ad0334bNde6fb162.jpg',
						retailPrice: Math.floor(Math.random() * (300 - 100)) + 200,
						masterPrice: Math.floor(Math.random() * (300 - 100)),
						type: Math.floor(Math.random() * (2 - 0)),
						specification: '3公3母',
						available: Math.floor(Math.random() * (2 - 0)),
					})
				}
				return data;
			},
			formatDate(date) {
				const y = date.getFullYear();
				let m = date.getMonth() + 1;
				m = m < 10 ? '0' + m : m;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				return y + '-' + m + '-' + d;
			},
			changePage(pageSize) {
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				this.tableData1 = this.mockTableData1(pageSize);
			},
		}
	}
</script>