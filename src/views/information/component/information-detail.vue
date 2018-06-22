<style lang="less">
	@import '../../../styles/common.less';
	@import './information-detail.less';
</style>

<template>
	<div>
		<Row>
			<Col span="18">
			<Card>
				<Form :label-width="80">
					<!-- 商品主图 -->
					<FormItem label="资讯主图">
						<div class="demo-upload-list" v-for="(item,index) in uploadList">
							<template v-if="item.status == 'finished'">
								<img :src="item.url">
								<div class="demo-upload-list-cover">
									<Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
									<Icon type="ios-trash-outline" @click.native="handleRemove(item,index)"></Icon>
								</div>
							</template>
							<template v-else>
								<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
							</template>
						</div>
						<Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']"
						 :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload"
						 multiple type="drag" action="http://192.168.10.76:8080/banaworld_admin/User/uploadAll?type=1" style="display: inline-block;width:58px;">
							<div style="width: 58px;height:58px;line-height: 58px;">
								<Icon type="camera" size="20"></Icon>
							</div>
						</Upload>
						<Modal title="查看图片" v-model="visible">
							<img :src="imgName" v-if="visible" style="width: 100%">
						</Modal>
					</FormItem>
					<FormItem label="资讯视频" v-if="hasVideo">
						<div class="demo-upload-list-video" v-for="(item,index) in uploadListVideo">
							<template v-if="item.status == 'finished'">
								<video id="videoTag" playsinline webkit-playsinline ref="videoTag" :src="item.url" type="video/mp4" style="width: 50%" controls="controls">
								</video>
							</template>
							<template v-else>
								<Progress style="width: 400px;" v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
							</template>
						</div>
						<Upload ref="uploadVideo" :show-upload-list="false" :default-file-list="defaultListVideo" :on-success="handleSuccessVideo"
						 :format="['mp4','mov']" :on-format-error="handleFormatError" type="drag" action="http://192.168.10.76:8080/banaworld_admin/User/uploadAll?type=3"
						 style="display: inline-block;width:58px;">
							<div style="width: 58px;height:58px;line-height: 58px;">
								<Icon type="camera" size="20"></Icon>
							</div>
						</Upload>
					</FormItem>

					<FormItem label="标题" :error="articleError">
						<Input v-model="resultData.infoTitle" icon="android-list" />
					</FormItem>
					<FormItem label="副标题" :error="articleError">
						<Input v-model="resultData.infoSubtitle" icon="android-list" />
					</FormItem>
					<FormItem label="资讯详情">
						<div>
							<textarea id="articleEditor"></textarea>
						</div>
					</FormItem>
				</Form>
			</Card>
			<Card>
				<p slot="title">
					<Icon type="paper-airplane"></Icon>
					评论列表
				</p>
				<Table stripe border :columns="columns1" :data="resultData.informationComment"></Table>
			</Card>
			</Col>
			<Col span="6" class="padding-left-10">
			<Card>
				<p slot="title">
					<Icon type="paper-airplane"></Icon>
					来源信息
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;编&nbsp;辑&nbsp;者：
					<b>{{resultData.staffNickname}}</b>
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;所属模块：
					<b>{{resultData.typePName}} -> {{resultData.typeName}}</b>
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;发布时间：
					<b>{{resultData.infoCreatdate}}</b>
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;发布状态：
					<b>{{resultData.infoState == 1 ? '已发布' : '未发布'}}</b>
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;置顶状态：
					<b>{{resultData.infoIftop == 1 ? '已置顶' : '未置顶'}}</b>
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;点&nbsp;赞&nbsp;数：
					<b>{{resultData.praiseCount}}</b>
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;转&nbsp;发&nbsp;数：
					<b>{{resultData.forwardCount}}</b>
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;评&nbsp;论&nbsp;数：
					<b>{{resultData.commentCount}}</b>
				</p>
			</Card>
			<Card>
				<p slot="title">
					<Icon type="paper-airplane"></Icon>
					属性操作
				</p>
				<Row class="">
					<p class="margin-top-10">
						是否发布：
						<i-switch v-model="ifState">
							<span slot="open">是</span>
							<span slot="close">否</span>
						</i-switch>
					</p>
				</Row>
				<Row class="margin-top-10 publish-button-con">
					<p class="margin-top-10">
						<Icon type="android-time"></Icon>&nbsp;&nbsp;一级分类：
						<Select size="small" :disabled="sDisabled" v-model="resultData.typePId" style="width: 100px">
							<Option v-for="item in fCategory" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</p>
					<p class="margin-top-10">
						<Icon type="android-time"></Icon>&nbsp;&nbsp;二级分类：
						<Select size="small" v-model="resultData.infoTypeId" style="width: 100px">
							<Option v-for="item in sCategory" :disabled="fDisabled" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</p>
				</Row>
				<Row class="margin-top-10 publish-button-con">
					<Button @click="handleUpdate" :loading="publishLoading" icon="ios-checkmark" long type="success">保存</Button>
				</Row>
			</Card>
			<Card>
				<p slot="title">
					<Icon type="paper-airplane"></Icon>
					数据机器人
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;点&nbsp;赞&nbsp;数：
					<Input v-model="praisecount" placeholder="Enter something..." style="width: 70%"></Input>
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;转&nbsp;发&nbsp;数：
					<Input v-model="forwardcount " placeholder="Enter something..." style="width: 70%"></Input>
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;评&nbsp;论&nbsp;数：
					<Input v-model="robotcommentcount" placeholder="Enter something..." style="width: 70%"></Input>
				</p>
				<Row class="margin-top-20 publish-button-con">
					<span class="publish-button">
						<Button @click="handleRobot" :loading="publishLoading" icon="ios-checkmark" style="width:120px;" type="warning">提交机器人</Button>
					</span>

				</Row>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
	import tinymce from 'tinymce';
	import informationService from '../../../service/informationService.js';
	import Cookies from 'js-cookie';

	export default {
		mixins: [informationService],
		data() {
			return {
				resultData: [],
				category: [],//全部类型
				fCategory: [],//一级分类
				sCategory: [],//二级分类
				fDisabled: true,//二级分类是否启用
				sDisabled: this.$route.params.information_id == 'new' ? false : true,
				ifState: false,
				// ifTop: false,
				hasVideo: false,
				articleEditor: 'articleEditor',
				praisecount: '',
				forwardcount: '',
				robotcommentcount: '',
				columns1: [
					{
						title: 'ID',
						key: 'comId',
						width: 80,
						align: 'center',
					},
					{
						title: '昵称',
						key: 'staffNickname'
					},
					{
						title: '内容',
						key: 'comContent'
					},
					{
						title: '时间',
						key: 'comDate'
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
										type: 'error',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.handleRemoveComment(params.row.comId)
										}
									}
								}, '删除')
							]);
						}
					}
				],
				articleStateList: [{ value: '草稿' }, { value: '等待复审' }],
				defaultList: [],
				defaultListVideo: [],
				imgName: '',
				visible: false,
				uploadList: [],
				uploadListVideo: [],
				value: '',
				model1: '礼券',
				cityList: [
					{
						value: '礼券',
						label: '礼券'
					},
					{
						value: '现货',
						label: '现货'
					},
				],
				articleTitle: '',
				articleError: '',
				publishLoading: false,

			};
		},
		watch: {
			'resultData.typePId': function () {
				this.sCategory = []
				this.fDisabled = false
				for (var item of this.category) {
					if (item.typePid != 0 && item.typePid == this.resultData.typePId) {
						var data = {
							value: item.typeId,
							label: item.typeName,
						}
						this.sCategory.push(data)
					}
				}
				if (this.$route.params.information_id == 'new') { //新增
					if (this.resultData.typePId == 3) {
						this.hasVideo = true
					} else {
						this.hasVideo = false
					}
				} else { //修改
					if (this.resultData.infoVideo) { // 有视频
						this.hasVideo = true
					} else {  //没视频
						if (this.resultData.typePId == 3) {
							this.hasVideo = true
						} else {
							this.hasVideo = false
						}
					}
				}
			}
		},
		beforeMount() {
			this.getCategory().then(res => {
				this.category = res
				this.handleCategory(res)
			})
			var id = {
				infoId: this.$route.params.information_id
			}
			if (id.infoId != 'new') {
				this.handleOneSelect(id, true)
			}
			this.$nextTick(() => {
				let vm = this;
				tinymce.init({
					selector: `#${vm.articleEditor}`,
					branding: false,
					elementpath: false,
					height: 500,
					language: 'zh_CN.GB2312',
					menubar: 'edit insert view format table tools',
					theme: 'modern',
					plugins: [
						'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
						'searchreplace visualblocks visualchars code fullscreen fullpage',
						'insertdatetime media nonbreaking save table contextmenu directionality',
						'emoticons paste textcolor colorpicker textpattern imagetools codesample'
					],
					toolbar1: ' newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
					autosave_interval: '20s',
					image_advtab: true,
					table_default_styles: {
						width: '100%',
						borderCollapse: 'collapse'
					},
					setup: function (editor) {
						editor.on('init', function (e) {
							if (vm.resultData.infoContent) {
								editor.setContent(vm.resultData.infoContent)
							} else {
								setTimeout(() => {
									if (vm.$route.params.information_id != 'new') {
										editor.setContent(localStorage.editorContent)
									}
								}, 50)
							}
						});
					}
				});
			})
		},
		methods: {
			handleCategory(res) {
				for (var item of res) {
					if (item.typePid == 0) {	// 一级分类
						var data = {
							value: item.typeId,
							label: item.typeName,
						}
						this.fCategory.push(data)
					}
				}
			},
			handleInfoImg(arg) {
				var data = arg.split(',')
				for (var item in data) {
					var result = {
						'url': data[item]
					}
					this.defaultList.push(result)
				}
				this.$nextTick(() => {
					this.uploadList = this.$refs.upload.fileList;
				})
			},
			handleInfoVideo(arg) {
				var result = {
					'url': arg
				}
				this.defaultListVideo.push(result)
				this.$nextTick(() => {
					this.uploadListVideo = this.$refs.uploadVideo.fileList;
				})
			},
			handleView(name) {
				this.imgName = name;
				this.visible = true;
			},
			handleRemove(file, index) {
				// 从 upload 实例删除数据
				const fileList = this.$refs.upload.fileList;
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
				this.resultData.infoMainpic = this.resultData.infoMainpic.split(",")
				this.resultData.infoMainpic.splice(index, 1)
				this.resultData.infoMainpic = this.resultData.infoMainpic.join(',')
			},
			handleSuccess(res, file) {
				file.url = res.data
				file.name = file.name
				this.resultData.infoMainpic = this.resultData.infoMainpic ? this.resultData.infoMainpic + "," + res.data : res.data
				if (this.$route.params.information_id == 'new') {
					this.$nextTick(() => {
						this.uploadList = this.$refs.upload.fileList;
					})
				}
			},
			handleSuccessVideo(res, file) {
				file.url = res.data
				file.name = file.name

				this.resultData.infoVideo = res.data
				if (this.$route.params.information_id == 'new') {
					this.$nextTick(() => {
						this.uploadListVideo = this.$refs.uploadVideo.fileList;
					})
					if (this.uploadListVideo.length > 0) {
						this.$refs.uploadVideo.fileList.splice(0, 1);
					}
				} else {
					this.$refs.uploadVideo.fileList.splice(0, 1);
				}
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: 'The file format is incorrect',
					desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: 'Exceeding file size limit',
					desc: 'File  ' + file.name + ' is too large, no more than 2M.'
				});
			},
			handleBeforeUpload() {
				const check = this.uploadList.length < 3;
				if (!check) {
					this.$Notice.warning({
						title: '最多上传三张主图！'
					});
				}
				return check;
			},
			handleUpdate() {
				this.resultData.infoState = this.ifState ? 1 : 0
				this.resultData.token = Cookies.get('token')
				this.resultData.infoContent = tinymce.activeEditor.getContent()

				if (this.$route.params.information_id == 'new') {
					this.resultData.infoStaffId = Cookies.get('staffId')
					if (this.resultData.typePId == 3) {
						var vid = document.getElementById("videoTag")
						var vLength = parseFloat(vid.duration);
						this.resultData.infoTime = vLength
					}
					this.handleAddData(this.resultData)
				} else {
					this.updateInformation(this.resultData)
				}
			},
			handleOneSelect(id, isRefresh) {
				this.getOneInformation(id).then(res => {
					this.resultData = res
					localStorage.editorContent = res.infoContent
					this.ifState = res.infoState == 1 ? true : false
					if (res.infoMainpic && isRefresh) {
						this.handleInfoImg(res.infoMainpic)
					}
					if (res.infoVideo && isRefresh) {
						this.handleInfoVideo(res.infoVideo)
					}
				})
			},
			handleRobot() {
				var param = {
					infoId: this.$route.params.information_id,
					praisecount: this.praisecount,
					forwardcount: this.forwardcount,
					robotcommentcount: this.robotcommentcount,
				}
				var id = {
					infoId: this.$route.params.information_id,
				}
				this.getOneInformation(param).then(() => {
					this.praisecount = ''
					this.forwardcount = ''
					this.robotcommentcount = ''
					this.handleOneSelect(id, false)
				})
			},
			handleRemoveComment(rowId) {
				var param = {
					comId: rowId,
					token: Cookies.get('token'),
				}
				var id = {
					infoId: this.$route.params.information_id,
				}
				this.removeComment(param).then(() => {
					this.praisecount = ''
					this.forwardcount = ''
					this.robotcommentcount = ''
					this.handleOneSelect(id, false)
				})
			}
		},
		destroyed() {
			tinymce.get('articleEditor').destroy();
		}
	};
</script>