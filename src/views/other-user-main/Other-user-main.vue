<style lang="less">
	@import '../../styles/common.less';
</style>
<template>
	<div>
		<Row>
			<Card>
				<Button class="margin-left-10" size="large" type="success" icon="search">发布全景</Button>
				<Button class="margin-left-10" size="large" type="success" icon="search" @click="releaseIM">发布资讯</Button>
			</Card>
		</Row>
		<Row>
			<Card>
				<p slot="title">
					<Icon type="compose"></Icon>
					第三方组织信息
				</p>
				<Table :columns="other_user" stripe border :data="resultData"></Table>
			</Card>
		</Row>
		<Row>
			<Card>
				<p slot="title">
					<Icon type="compose"></Icon>
					子账号
				</p>
				<Table :columns="child_number" stripe border :data="resultData"></Table>
			</Card>
		</Row>
		<Row>
			<Card>
				<p slot="title">
					<Icon type="compose"></Icon>
					全景
				</p>
				<Table :columns="panoramic_col" stripe border :data="resultData"></Table>
			</Card>
		</Row>
		<Row>
			<Card>
				<p slot="title">
					<Icon type="compose"></Icon>
					资讯
				</p>
				<Table :columns="information_col" stripe border :data="resultData"></Table>
			</Card>
		</Row>
	</div>
</template>

<script>
	import Cookies from 'js-cookie';
	import otheruserService from '../../service/otheruserService.js'
	export default {
		name: 'other_index',
		mixins:[otheruserService],
		data() {
			return {
				params:{
					token:Cookies.get('token'),
					thirdId:Cookies.get('orgid')
				},
				resultData:[],
				showInfo: false,
				other_user: [
					{
						title: '公司名称',
						key: 'thirdName',
						align: 'center'
					},
					{
						title: '公司地址',
						key: 'thirdAddress',
						align: 'center'
					},
					{
						title: '联系方式',
						key: 'thirdPhone',
						align: 'center'
					},
					{
						title: '操作',
						key: 'action',
						align: 'center'
					},
				],
				child_number: [
					{
						title: '子账号数量',
						key: 'sysstaffCount',
						align: 'center'
					},
					{
						title: '操作',
						key: 'action',
						align: 'center'
					},
				],
				panoramic_col: [
					{
						title: '已发布全景数',
						key: 'banapanofabuCount',
						align: 'center'
					},
					{
						title: '待审核全景数',
						key: 'banapanoshenhezhongCount',
						align: 'center'
					},
					{
						title: '审核失败数',
						key: 'banapanoshenheshibaiCount',
						align: 'center'
					},
					{
						title: '已下架数量',
						key: 'banapanoxiajiaCount',
						align: 'center'
					},
				],
				information_col: [
					{
						title: '已发布资讯数',
						key: 'informationfabuCount',
						align: 'center'
					},
					{
						title: '被置顶数',
						key: 'informationIftop',
						align: 'center'
					},
					{
						title: '已下架数',
						key: 'informationxiajiaCount',
						align: 'center'
					},
				],
				order_data: [],
			};
		},
		beforeMount(){
			this.getUserinfo(this.params).then(res => {
				this.resultData = res
			})
		},
		methods: {
			// init() {
			// 	let index = 1
			// 	let buyer = '';
			// 	let addr = '';
			// 	let time = '';
			// 	let state = '';
			// 	switch (index) {
			// 		case 1: buyer = 'Arasn'; addr = '北京市东直门外大街39号院2号楼航空服务大厦'; time = '2017年10月20日 13：33：24'; state = '已付款'; break;
			// 		case 2: buyer = 'Lison'; addr = '北京市东直门外大街39号院2号楼航空服务大厦'; time = '2017年10月21日 19：13：24'; state = '已付款'; break;
			// 		case 3: buyer = 'lili'; addr = 'TalkingData总部'; time = '2017年10月12日 10：39：24'; state = '待收货'; break;
			// 		case 4: buyer = 'lala'; addr = '国家统计局'; time = '2017年8月20日 11：45：24'; state = '已收货'; break;
			// 	}
			// 	let order = {
			// 		order_id: this.$route.params.order_id,
			// 		buyer: buyer,
			// 		addr: addr,
			// 		time: time,
			// 		state: state
			// 	};
			// 	this.order_data = [order];
			// },
			releaseIM() {
				let argu = { information_id: 'new' };
				this.$router.push({
					name: 'information-info',
					params: argu
				});
			}
		},
		// mounted() {
		// 	this.init();
		// },
		// activated() {
		// 	this.init();
		// }
	};
</script>