<style lang="less">
	@import '../../../../styles/common.less';
	@import './product-detail.less';
</style>

<template>
	<div>
		<Row>
			<Col span="18">
			<Card>
				<Form :label-width="80">
					<!-- 商品名称 -->
					<FormItem label="商品名称" :error="articleError">
						<Input v-model="articleTitle" @on-blur="handleArticletitleBlur" icon="android-list" />
					</FormItem>
					<!-- 商品主图 -->
					<FormItem label="商品主图">
						<div class="demo-upload-list" v-for="item in uploadList">
							<template v-if="item.status === 'finished'">
								<img :src="item.url">
								<div class="demo-upload-list-cover">
									<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
									<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
								</div>
							</template>
							<template v-else>
								<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
							</template>
						</div>
						<Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']"
						 :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload"
						 multiple type="drag" action="//jsonplaceholder.typicode.com/posts/" style="display: inline-block;width:58px;">
							<div style="width: 58px;height:58px;line-height: 58px;">
								<Icon type="camera" size="20"></Icon>
							</div>
						</Upload>
						<Modal title="View Image" v-model="visible">
							<img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
						</Modal>
					</FormItem>
					<FormItem label="商品详情">
						<div>
							<textarea id="articleEditor"></textarea>
						</div>
					</FormItem>
				</Form>
			</Card>
			</Col>
			<Col span="6" class="padding-left-10">
			<Card>
				<p slot="title">
					<Icon type="paper-airplane"></Icon>
					商品信息
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;原&nbsp;&nbsp;&nbsp; 价：
					<Input v-model="value" placeholder="Enter something..." style="width: 70%"></Input>
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;售&nbsp;&nbsp;&nbsp; 价：
					<Input v-model="value" placeholder="Enter something..." style="width: 70%"></Input>
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;规&nbsp;&nbsp;&nbsp; 格：
					<Input v-model="value" placeholder="Enter something..." style="width: 70%"></Input>
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;类&nbsp;&nbsp;&nbsp; 型：
					<Select v-model="model1" style="width:70%">
							<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;可用时间：
					<DatePicker type="daterange" split-panels placeholder="Select date" style="width: 66%"></DatePicker>

				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;商品产地：
					<Input v-model="value" placeholder="Enter something..." style="width: 66%"></Input>
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>&nbsp;&nbsp;配送方式：
					<Input v-model="value" placeholder="Enter something..." style="width: 66%"></Input>
				</p>
				<Row class="margin-top-20 publish-button-con">
					<span class="publish-button">
						<Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="warning">取消</Button>
					</span>
					<span class="publish-button">
						<Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="error">删除</Button>
					</span>
					<span class="publish-button">
						<Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="success">更新</Button>
					</span>
				</Row>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
	import tinymce from 'tinymce';
	export default {
		name: 'artical-publish',
		data() {
			return {
				defaultList: [
					{
						'name': 'a42bdcc1178e62b4694c830f028db5c0',
						'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
					},
					{
						'name': 'bc7521e033abdd1e92222d733590f104',
						'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
					}
				],
				imgName: '',
				visible: false,
				uploadList: [],
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
		methods: {
			handleSuccess(res, file) {
				file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
				file.name = '7eb99afb9d5f317c912f08b5212fd69a';
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
				const check = this.uploadList.length < 5;
				if (!check) {
					this.$Notice.warning({
						title: 'Up to five pictures can be uploaded.'
					});
				}
				return check;
			},
			handleArticletitleBlur() {
				if (this.articleTitle.length !== 0) {
					// this.articleError = '';
					localStorage.articleTitle = this.articleTitle; // 本地存储文章标题
					if (!this.articlePathHasEdited) {
						let date = new Date();
						let year = date.getFullYear();
						let month = date.getMonth() + 1;
						let day = date.getDate();
						this.fixedLink = window.location.host + '/' + year + '/' + month + '/' + day + '/';
						this.articlePath = this.articleTitle;
						this.articlePathHasEdited = true;
						this.showLink = true;
					}
				} else {
					// this.articleError = '文章标题不可为空哦';
					this.$Message.error('文章标题不可为空哦');
				}
			},
			handlePublish() {
				if (this.canPublish()) {
					this.publishLoading = true;
					setTimeout(() => {
						this.publishLoading = false;
						this.$Notice.success({
							title: '保存成功',
							desc: '文章《' + this.articleTitle + '》保存成功'
						});
					}, 1000);
				}
			},
		},
		mounted() {
			this.uploadList = this.$refs.upload.fileList;

			tinymce.init({
				selector: '#articleEditor',
				branding: false,
				elementpath: false,
				height: 600,
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
				}
			});
		},
		destroyed() {
			tinymce.get('articleEditor').destroy();
		}
	};
</script>