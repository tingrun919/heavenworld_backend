<style lang="less">
	@import '../../../styles/common.less';
	@import './festival-new.less';
</style>

<template>
	<div>
		<Row>
			<Col span="18">
			<Card>
				<Form :label-width="80">
					<FormItem label="节日名称">
						<Input v-model="resultData.holName" icon="android-list" />
					</FormItem>
					<FormItem label="资讯详情">
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
					属性操作
				</p>
				<Row>
					<p>
						<Icon type="android-time"></Icon>&nbsp;&nbsp;节日日期：
						<Date-picker @on-change="changeDate" v-model="time" type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
					</p>
				</Row>
				<Row class="margin-top-10 publish-button-con">
					<Button icon="ios-checkmark" @click="handleUpdateAndSave" long type="success">保存</Button>
				</Row>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
	import tinymce from 'tinymce';
	import festivalService from '../../../service/festivalService.js';
	import Cookies from 'js-cookie';

	export default {
		mixins: [festivalService],
		data() {
			return {
				resultData: [],
				time: null,
				articleEditor: 'articleEditor',
			};
		},
		beforeMount() {
			var id = {
				id: this.$route.params.festival_id,
				token: Cookies.get('token')
			}
			if (id.id != 'new') {
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
							if (vm.resultData.holContent) {
								editor.setContent(vm.resultData.holContent)
							} else {
								setTimeout(() => {
									if (vm.$route.params.festival_id != 'new') {
										editor.setContent(localStorage.editorContentF)
									}
								}, 50)
							}
						});
					}
				});
			})
		},
		methods: {
			changeDate(val) {
				this.time = val
			},
			handleUpdateAndSave() {
				this.resultData.token = Cookies.get('token')
				if (this.$route.params.information_id == 'new') {
					this.resultData.holTime = this.time
					this.resultData.holContent = tinymce.activeEditor.getContent()
					this.AddFestivalApi(this.resultData)
				} else {
					this.updateFestivalApi(this.resultData)
				}
			},
			handleOneSelect(id, isRefresh) {
				this.getOneFestivalApi(id).then(res => {
					this.resultData = res[0]
					this.time = res[0].holTime
					localStorage.editorContentF = res[0].holContent
				})
			},
		},
		destroyed() {
			tinymce.get('articleEditor').destroy();
		}
	};
</script>