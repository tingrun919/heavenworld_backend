<style lang="less">
	@import '../../../styles/common.less';
	@import './panoramic-new.less';
</style>
<template>
	<div>
		<Row>
			<Col span="18">
			<Card>
				<Row>
					<Col span="18">
					<Upload multiple :on-success="handleSuccess" :action="`http://39.107.78.100:8080/banaworld_admin/krpano/picUpload?code=${uploadCode}`">
						<Button type="primary" icon="ios-cloud-upload-outline">选择2:1全景图</Button>
					</Upload>
					</Col>
					<Col span="6" style="text-align: right;vertical-align: center;line-height: 32px;"> 上传有问题？请查看全景图规范
					</Col>
				</Row>
			</Card>
			<Row class="img-row">
				<Col span="12" v-if="uploadList" v-for="item in uploadList" :key="item.name">
				<Card>
					<p slot="title">
						{{item.name}}
					</p>
					<a href="#" slot="extra" @click.prevent="changeLimit">
						<Icon type="close"></Icon>
					</a>
					<img :src="item.url" width="100" height="100">
					<Input style="padding-left: 5%;" v-model="item.name"></Input>
					</Card>
					</Col>
			</Row>
			</Col>
			<Col span="6" class="padding-left-10">
			<Card>
				<p slot="title">
					<Icon type="paper-airplane"></Icon>
					属性
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>作品标题：
					<Input v-model="uploadCode.title" placeholder="请输入..." style="width: 150px"></Input>
				</p>
				<p class="margin-top-10">
					<Icon type="android-time"></Icon>全景分类：
					<Select style="width:150px" clearable>
						<Option v-for="item in category" :value="item.typeId" :key="item.typeId">{{ item.typeName }}</Option>
					</Select>
				</p>
				<Row class="margin-top-20 publish-button-con">
					<span class="publish-button">
						<Button @click="handlePanoramic" long icon="ios-checkmark" type="primary">发布</Button>
					</span>
				</Row>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
	import panoramicService from '../../../service/panoramicService.js'
	export default {
		mixins: [panoramicService],
		data() {
			return {
				uploadCode: '',
				uploadList: [],
				category: [],
			};
		},
		beforeMount() {
			this.getPanoramicCode().then(res => {
				this.uploadCode = res
			})
			this.getCategory().then(res => {
				this.category = res
			})
		},
		methods: {
			//上传成功之后的回调
			handleSuccess(res, file) {
				// 因为上传过程为实例，这里模拟添加 url
				this.uploadList.push(res.data)
			},
			//生成全景
			handlePanoramic(){
				var name = this.getPanoramicName()
				var value = this.getPanoramicValue()
				var param = {
					file:this.uploadList[0].file,
					title:'test',
					name:name,
					value:value
				}
				this.PanoramicApi(param).then(res => {
					console.log(res)
				})
			},
			getPanoramicName(){
				var result = ''
				for(var item in this.uploadList){
					result += this.uploadList[item].name + ','
				}
				return result
			},
			getPanoramicValue(){
				var result = ''
				for(var item in this.uploadList){
					result += this.uploadList[item].value + ','
				}
				return result
			},
		},
	};
</script>