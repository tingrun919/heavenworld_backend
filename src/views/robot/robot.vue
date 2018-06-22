<style lang="less">
	@import '../../styles/common.less';
	@import './comment_model.less';
	@import '../information/component/information-detail.less';
</style>
<template>
	<div>
		<Row>
			<Card>
				<span>机器人昵称：</span>
				<Input v-model="page.staffNickname" placeholder="请输入机器人昵称" clearable style="width: 200px"></Input>
				<Button @click="fetchList" class="margin-left-10" type="primary" icon="search">查询</Button>
				<Button @click="addRobot" class="margin-left-10" type="success" icon="plus">新增</Button>
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
		<Modal @on-ok="handleUpdateRobot" title="编辑" v-model="showModal" class-name="vertical-center-modal">
			<div class="demo-upload-list" v-for="item in uploadList">
				<template v-if="item.status === 'finished'">
					<img :src="item.url">
				</template>
				<template v-else>
					<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
				</template>
			</div>
			<Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']"
			 :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" multiple type="drag" action="http://192.168.10.76:8080/banaworld_admin/User/uploadAll?type=1"
			 style="display: inline-block;width:58px;">
				<div style="width: 58px;height:58px;line-height: 58px;">
					<Icon type="camera" size="20"></Icon>
				</div>
			</Upload>
			<Input v-model="nickname" placeholder="请输入昵称"></Input>
		</Modal>
	</div>
</template>
<script>
	import robotService from '../../service/robotService.js';
	import Cookies from 'js-cookie';

	export default {
		mixins: [robotService],
		data() {
			return {
				resultValue: [],//列表数据
				initResultValue: [],//列表数据
				pageTotal: null,//总页数
				showModal: false,
				nickname: '',
				page: {
					token: Cookies.get("token"),
					beginRow: 1,//当前页数
					pageSize: 10,//每页显示条数
					staffNickname: '',//标题搜索条件
				},
				params: {
					robotnumber: '',
					token: Cookies.get("token"),
				},
				updateParams: {
					token: Cookies.get("token"),
					staffId: '',
					staffNickname: '',
					staffPortrait: '',
					staffDictValue: '',
				},
				loading: true,//表格加载动画
				defaultList: [],
				imgName: '',
				visible: false,
				uploadList: [],
				tableColumns: [  //表头
					{
						title: 'ID',
						key: 'staffId',
						width: 80,
						align: 'center',
					},
					{
						title: '头像',
						key: 'staffPortrait',
						align: 'center',
						render: (h, params) => {
							return h('img', {
								attrs: {
									src: params.row.staffPortrait,
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
						title: '机器人昵称',
						key: 'staffNickname',
						align: 'center',
					},
					{
						title: '创建时间',
						key: 'staffCreatdate',
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
											this.nickname = params.row.staffNickname
											this.updateParams.staffDictValue = params.row.staffDictvalue
											this.updateParams.staffId = params.row.staffId
											var result = {
												'url': params.row.staffPortrait
											}
											if (this.defaultList.length == 0) {
												this.defaultList.push(result)
											}
											this.$nextTick(() => {
												this.uploadList = this.$refs.upload.fileList;
											})
											this.showModal = true
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
											this.delRobot(params.row.staffId)
										}
									}
								}, '删除')
							]);
						}
					}
				],
			}
		},
		mounted() {
			this.uploadList = this.$refs.upload.fileList;
		},
		beforeMount() {
			this.fetchList()
		},
		methods: {
			//获取数据
			fetchList() {
				this.getRobotList(this.page).then(res => {
					this.loading = false
					this.resultValue = res
					this.pageTotal = new Number(res[0].staffRobotCount)
				})
			},
			//分页
			changePage(pageNum) {
				this.loading = true
				this.page.beginRow = pageNum
				this.fetchList()
			},
			//新增机器人
			addRobot() {
				this.$Modal.confirm({
					render: (h) => {
						return h('Input', {
							props: {
								value: this.params.robotnumber,
								autofocus: true,
								placeholder: '请输入新增机器人的数量'
							},
							on: {
								input: (val) => {
									this.params.robotnumber = val;
								}
							}
						})
					},
					onOk: () => {
						this.addRobotNumber(this.params).then(() => {
							this.fetchList()
						})
					}
				})
			},
			//删除机器人
			delRobot(id) {
				var delParams = {
					staffId: id,
					token: Cookies.get("token")
				}
				this.delRobotNumber(delParams).then(() => {
					this.fetchList()
				})
			},
			handleView(name) {
				this.imgName = name;
				this.visible = true;
			},
			handleRemove(file) {
				const fileList = this.$refs.upload.fileList;
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
			},
			handleSuccess(res, file) {
				file.url = res.data
				file.name = file.name
				this.resultValue.staffPortrait = res.data
				this.$refs.upload.fileList.splice(0, 1);
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
			handleUpdateRobot() {
				this.updateParams.staffNickname = this.nickname
				this.updateParams.staffPortrait = this.resultValue.staffPortrait
				this.updateRobot(this.updateParams).then(() => {
					this.fetchList()
				})
			}
		}
	}
</script>