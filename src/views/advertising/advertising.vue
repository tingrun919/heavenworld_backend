<style lang="less">
	@import '../../styles/common.less';
</style>
<template>
	<div>
		<Card>
			<p slot="title">
				<Icon type="paper-airplane"></Icon>
				广告设置
			</p>
			<a href="#" slot="extra" @click.prevent="handleSave">
				<Icon type="checkmark"></Icon>
				保存
			</a>
			<Row>
				<img :src="resultValue.no_mainpic" width="200" height="200">
				<Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']"
				 :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" multiple type="drag" action="http://39.107.78.100:8080/banaworld_admin/User/uploadAll?type=1"
				 style="display: inline-block;width:198px;">
					<div style="width: 198px;height:198px;line-height: 198px;">
						<Icon type="camera" size="20"></Icon>
					</div>
				</Upload>
			</Row>
			<Row>
				<Input v-model="resultValue.no_content" placeholder="请输入外链网址" style="width: 300px"></Input>
			</Row>
		</Card>
	</div>
</template>
<script>
	import Cookies from 'js-cookie';
	import advertisingService from '../../service/advertisingService.js'
	export default {
		mixins: [advertisingService],
		data() {
			return {
				resultValue:[],
			}
		},
		beforeMount() {
			this.fetchList()
		},
		methods: {
			fetchList() {
				this.getAdvertisingList().then(res => {
					this.resultValue = res
				})
			},
			handleSuccess(res, file) {
				file.url = res.data
				this.resultValue.no_mainpic = res.data
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
			handleSave(){
				this.resultValue.token = Cookies.get('token')
				this.handleSaveAdv(this.resultValue)
			},
		}
	}
</script>