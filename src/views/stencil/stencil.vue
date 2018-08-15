<style lang="less">
	@import '../../styles/common.less';
</style>
<style lang="less">
	.vertical-center-modal {
		display: flex;
		align-items: center;
		justify-content: center;

		.ivu-modal {
			top: 0;
		}

		img {
			width: 100%;
		}
	}
</style>
<template>
	<div>
		<Row>
			<Card>
				<Button @click="viewDetail" class="margin-left-10" type="primary" icon="plus">新增</Button>
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
		<Modal title="查看详情" width="30%" scrollable v-model="commentShowAdd" @on-ok="uploadImgStencil" v-if="resultOneShow" class-name="vertical-center-modal">
			<div class="demo-upload-list" v-for="item in uploadList">
				<template v-if="item.status === 'finished'">
					<img :src="item.url">
				</template>
				<template v-else>
					<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
				</template>
			</div>
			<Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']"
			 :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" multiple type="drag" action="http://39.107.78.100:8080/banaworld_admin/User/uploadAll?type=1"
			 style="display: inline-block;width:58px;">
				<div style="width: 58px;height:58px;line-height: 58px;">
					<Icon type="camera" size="20"></Icon>
				</div>
			</Upload>
		</Modal>
	</div>
</template>
<script>
	import stencilService from '../../service/stencilService.js'
	import userService from '../../service/userService.js'
	import Cookies from 'js-cookie';

	export default {
		mixins: [stencilService, userService],
		data() {
			return {
				resultValue: [],//列表数据
				params: {
					page: 1,//当前页数
					pagesize: 10,//每页显示条数
					panoid: '1',
					orgid: Cookies.get('orgid') == 1 ? '' : Cookies.get('orgid'),//二级分类model
					token: Cookies.get('token'),
				},
				resultImg:'',
				commentShowAdd: false,
				uploadList: [],
				defaultList: [],
				userList: [],
				loading1: false,
				resultOneShow: false,
				pageTotal: null,//总页数
				typeName: '',//内容
				loading: true,//表格加载动画
				tableColumns: [  //表头
					{
						title: 'ID',
						key: 'temId',
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
									src: params.row.temUrl,
									// width: 100,
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
						title: '操作',
						key: 'action',
						width: 80,
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
											this.handleRemove(params.row.temId)
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
				this.getPanoramicStencil(this.params).then(res => {
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
			handleSuccess(res, file) {
				file.url = res.data
				file.name = file.name
				this.resultImg = res.data
				this.uploadList = this.$refs.upload.fileList;
				// this.resultValue.staffPortrait = res.data
				// this.$refs.upload.fileList.splice(0, 1);
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式不正确',
					desc: file.name + '的文件格式不正确，请使用jpg或png'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: '超出文件大小限制',
					desc: file.name + '文件太大，请不要超过2M'
				});
			},
			handleRemove(id) {
				var params = {
					token: Cookies.get('token'),
					temid: id,
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
			viewDetail() {
				// this.params.id = id;
				// this.getDetailone(this.params).then(res => {
				this.loading = false
				this.commentShowAdd = true
				this.resultOneShow = true
				// })
			},
			uploadImgStencil(){
				this.params.url = this.resultImg
				this.handleAddstencil(this.params).then(res => {
					console.log(res,'123')
					this.fetchList()
				})
			}
		}
	}
</script>