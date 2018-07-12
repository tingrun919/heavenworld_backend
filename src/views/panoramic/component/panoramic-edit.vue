<style lang="less">
	@import '../../../styles/common.less';
</style>
<style>
	.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-content {
		/* height: 320px; */
		margin-top: -16px;
	}

	.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-content>.ivu-tabs-tabpane {
		background: #fff;
		padding: 16px;
	}

	.demo-tabs-style1>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
		border-color: transparent;
	}

	.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
		border-color: #fff;
	}

	.demo-tabs-style2>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
		border-radius: 0;
		background: #fff;
	}

	.demo-tabs-style2>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
		border-top: 1px solid #3399ff;
	}

	.demo-tabs-style2>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active:before {
		content: '';
		display: block;
		width: 100%;
		height: 1px;
		background: #3399ff;
		position: absolute;
		top: 0;
		left: 0;
	}

	.demo-upload-list {
		display: inline-block;
		width: 100px;
		height: 100px;
		text-align: center;
		line-height: 100px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
		margin-right: 4px;
	}

	.demo-upload-list img {
		width: 100%;
		height: 100%;
	}

	.demo-upload-list-cover {
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .6);
	}

	.demo-upload-list:hover .demo-upload-list-cover {
		display: block;
	}

	.demo-upload-list-cover i {
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		margin: 0 2px;
	}

	#pano {
		width: 100%;
		height: 100%;
	}
</style>
<style>
	.demo-spin-icon-load {
		animation: ani-demo-spin 1s linear infinite;
	}

	@keyframes ani-demo-spin {
		from {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.demo-spin-col {
		height: 100px;
		position: relative;
		border: 1px solid #eee;
	}
</style>
<template>
	<div>
		<Modal v-model="modal6" title="操作确认" @on-ok="asyncOK">
			<p>确认保存吗？</p>
		</Modal>
		<Modal v-model="modal7" title="操作确认" @on-ok="asyncOK7">
			<p>确认保存吗？</p>
		</Modal>
		<div id="temp" style="display:none"></div>
		<input type="hidden" id="comment-athv" />
		<Modal title="新增" @on-ok="handleAddAction" v-model="commentShowAdd" class-name="vertical-center-modal">
			<Input v-model="actionName" placeholder="请输入名称"></Input>
			<Select v-model="modelAction">
				<Option v-for="item in actionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			<Input v-if="modelAction != 2" v-model="actionDesc" placeholder="请输入"></Input>
		</Modal>
		<Modal title="新增" @on-ok="handlePerson" v-model="personShowAdd" class-name="vertical-center-modal">
			<Input v-model="personName" placeholder="请输入名称"></Input>
		</Modal>
		<Modal title="新增" @on-ok="handleAddMusic" v-model="showMusicModal" class-name="vertical-center-modal">
			<Spin fix v-if="uploadmusic">
				<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
				<div>正在上传中，请稍后...</div>
			</Spin>
			<Input class="margin-top-20" v-model="musicdesc" placeholder="请输入新增音乐的名称"></Input>
			<Upload :show-upload-list='false' :before-upload="handleUpload" :on-success="handleSuccess3" action="http://39.107.78.100:8080/banaworld_admin/User/uploadAll?type=2">
				<Button type="primary" icon="ios-cloud-upload-outline">请选择上传的音乐</Button>
			</Upload>
			<!-- <Input class="margin-top-20" v-model="musicurl" placeholder="请输入新增音乐的网络地址"></Input> -->
		</Modal>
		<Col span="24" class="demo-tabs-style1" style="background: #e3e8ee;padding:10px;">
		<Tabs type="card" @on-click="loadingHot">
			<Tab-pane label="基础">
				<Card>
					<p slot="title">
						<Icon type="paper-airplane"></Icon>
						基础设置
					</p>
					<a href="#" slot="extra" @click.prevent="modal6 = true">
						<Icon type="checkmark"></Icon>
						保存
					</a>
					<Row :gutter="10">
						<Col span="8">
						<Card>
							<div style="text-align:center">
								<img :src="resultValue.panoMainpic" width="200" height="200">
								<Upload ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048"
								 :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple
								 type="drag" action="http://39.107.78.100:8080/banaworld_admin/User/uploadAll?type=1" style="display: inline-block;width:198px;">
									<div style="width: 198px;height:198px;line-height: 198px;">
										<Icon type="camera" size="20"></Icon>
									</div>
								</Upload>
							</div>
						</Card>
						</Col>
						<Col span="16">
						<Card>
							<p>
								<Select v-model="resultValue.panoType" placeholder="请选择分类">
									<Option v-for="item in category" :value="item.typeId" :key="item.typeId">{{ item.typeName }}</Option>
								</Select>
							</p>
							<p class="margin-top-10">
								<Input v-model="resultValue.panoName" placeholder="请输入标题"></Input>
							</p>
							<p class="margin-top-10">
								<Input v-model="resultValue.panoContent" type="textarea" :rows="5" placeholder="请输入简介"></Input>
							</p>
						</Card>
						</Col>
					</Row>
				</Card>
				<Card>
					<p slot="title">
						<Icon type="paper-airplane"></Icon>
						主页封面设置
					</p>
					<Row :gutter="10">
						<div class="demo-upload-list" v-for="item in uploadList">
							<template v-if="item.status === 'finished'">
								<img :src="item.url">
								<div class="demo-upload-list-cover">
									<Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
									<Icon type="ios-trash-outline" @click.native="handleRemovepic(item)"></Icon>
								</div>
							</template>
							<template v-else>
								<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
							</template>
						</div>
						<Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess2" :format="['jpg','jpeg','png']"
						 :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload"
						 multiple type="drag" action="http://39.107.78.100:8080/banaworld_admin/User/uploadAll?type=1" style="display: inline-block;width:98px;">
							<div style="width: 98px;height:98px;line-height: 98px;">
								<Icon type="camera" size="20"></Icon>
							</div>
						</Upload>
						<Modal title="查看图片" v-model="visible">
							<img :src="imgName" v-if="visible" style="width: 100%">
						</Modal>
					</Row>
				</Card>
				<Row :gutter="10">
					<Col span="12">
					<Card>
						<p slot="title">
							<Icon type="paper-airplane"></Icon>
							全景位置设置
						</p>
						<Input v-model="addressName" style="width:250px;" placeholder="请输入地址名称"></Input>
						<br>
						<Input v-model="longD" style="width:150px;" placeholder="请输入经纬度"></Input>
						<!-- <Select clearable v-model="cityDefault" filterable remote :remote-method="keyUpSearch" :loading="loading1">
							<Option v-for="(option, index) in cityList" :value="option.id" :key="index">{{option.pname}}{{option.cityname}}{{option.adname}}{{option.address}}{{option.name}}</Option>
						</Select> -->
						<span>请使用此网站获取地址经纬度，并粘贴到左侧框中-></span>
						<a href="https://lbs.amap.com/console/show/picker" target="_Blank">https://lbs.amap.com/console/show/picker</a>
					</Card>
					</Col>
					<Col span="12">
					<Card>
						<p slot="title">
							<Icon type="paper-airplane"></Icon>
							全景服务电话设置
						</p>
						<Input v-model="resultValue.panoPhone" placeholder="请输入全景服务电话"></Input>
					</Card>
					</Col>
				</Row>
			</Tab-pane>
			<Tab-pane label="热点">
				<Row>
					<Col span="18">
					<Card>
						<p slot="title">
							<Icon type="paper-airplane"></Icon>
							热点设置
						</p>
						<a href="#" slot="extra" @click.prevent="showpano">
							<Icon type="checkmark"></Icon>
							显示场景
						</a>
						<div id="wrapper" :style="{height:viewHeightPanoramic}">
							<div id="pano"></div>
						</div>
					</Card>
					</Col>
					<Col span="6">
					<Card>
						<p slot="title">
							<Icon type="paper-airplane"></Icon>
							添加热点
						</p>
						<Row style="background: rgba(0, 0, 0, 0.8);margin: -16px -16px 0 -16px;">
							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot1.png?2.2.7','hotspot_4')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot1.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot2.png?2.2.7','hotspot_5')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot2.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot3.png?2.2.7','hotspot_6')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot3.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot4.png?2.2.7','hotspot_7')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot4.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot5.png?2.2.7','hotspot_8')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot5.png?2.2.7">
							</Col>


							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot6.png?2.2.7','hotspot_9')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot6.png?2.2.7">
							</Col>
						</Row>

						<Row style="background: rgba(0, 0, 0, 0.8);margin:0 -16px;">
							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot7.png?2.2.7','hotspot_10')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot7.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot8.png?2.2.7','hotspot_11')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot8.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot9.png?2.2.7','hotspot_12')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot9.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot10.png?2.2.7','hotspot_13')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot10.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot11.png?2.2.7','hotspot_14')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot11.png?2.2.7">
							</Col>


							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot12.png?2.2.7','hotspot_15')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot12.png?2.2.7">
							</Col>
						</Row>

						<Row style="background: rgba(0, 0, 0, 0.8);margin:0 -16px;">
							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot13.png?2.2.7','hotspot_16')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot13.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot14.png?2.2.7','hotspot_17')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot14.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot15.png?2.2.7','hotspot_18')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot15.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot16.png?2.2.7','hotspot_19')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot16.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot17.png?2.2.7','hotspot_20')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot17.png?2.2.7">
							</Col>


							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot18.png?2.2.7','hotspot_21')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot18.png?2.2.7">
							</Col>
						</Row>

						<Row style="background: rgba(0, 0, 0, 0.8);margin:0 -16px;">
							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot19.png?2.2.7','hotspot_22')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot19.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/hotspot/80/spotd1_gif.png','hotspot_23')" width="50" height="50" src="https://ssl-player.720static.com/hotspot/80/spotd1_gif.png">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/hotspot/80/spotd2_gif.png','hotspot_24')" width="50" height="50" src="https://ssl-player.720static.com/hotspot/80/spotd2_gif.png">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/hotspot/80/spotd3_gif.png','hotspot_25')" width="50" height="50" src="https://ssl-player.720static.com/hotspot/80/spotd3_gif.png">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/hotspot/80/spotd4_gif.png','hotspot_26')" width="50" height="50" src="https://ssl-player.720static.com/hotspot/80/spotd4_gif.png">
							</Col>


							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/hotspot/80/spotd5_gif.png','hotspot_27')" width="50" height="50" src="https://ssl-player.720static.com/hotspot/80/spotd5_gif.png">
							</Col>
						</Row>

						<Row style="background: rgba(0, 0, 0, 0.8);margin:0 -16px;">
							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/static_link.png?2.2.7','hotspot_28')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/static_link.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/static_gallery.png?2.2.7','hotspot_29')" width="50"
							 height="50" src="https://ssl-player.720static.com/@/krp/hotspot/v2/static_gallery.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/static_video.png?2.2.7','hotspot_30')" width="50"
							 height="50" src="https://ssl-player.720static.com/@/krp/hotspot/v2/static_video.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/static_txt.png?2.2.7','hotspot_31')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/static_txt.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/static_music.png?2.2.7','hotspot_32')" width="50"
							 height="50" src="https://ssl-player.720static.com/@/krp/hotspot/v2/static_music.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/hotspot/80/new_spotd1_gif.png','hotspot_33')" width="50" height="50"
							 src="https://ssl-player.720static.com/hotspot/80/new_spotd1_gif.png">
							</Col>
						</Row>

						<Row style="background: rgba(0, 0, 0, 0.8);margin:0 -16px;">
							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/hotspot/80/new_spotd2_gif.png','hotspot_34')" width="50" height="50"
							 src="https://ssl-player.720static.com/hotspot/80/new_spotd2_gif.png">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/hotspot/80/new_spotd3_gif.png','hotspot_35')" width="50" height="50"
							 src="https://ssl-player.720static.com/hotspot/80/new_spotd3_gif.png">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/hotspot/80/new_spotd4_gif.png','hotspot_36')" width="50" height="50"
							 src="https://ssl-player.720static.com/hotspot/80/new_spotd4_gif.png">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/hotspot/80/new_spotd5_gif.png','hotspot_37')" width="50" height="50"
							 src="https://ssl-player.720static.com/hotspot/80/new_spotd5_gif.png">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/hotspot/80/new_spotd6_gif.png','hotspot_38')" width="50" height="50"
							 src="https://ssl-player.720static.com/hotspot/80/new_spotd6_gif.png">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/hotspot/80/new_spotd7_gif.png','hotspot_39')" width="50" height="50"
							 src="https://ssl-player.720static.com/hotspot/80/new_spotd7_gif.png">
							</Col>
						</Row>

						<Row style="background: rgba(0, 0, 0, 0.8);margin:0 -16px;">
							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/hotspot/80/new_spotd8_gif.png','hotspot_40')" width="50" height="50"
							 src="https://ssl-player.720static.com/hotspot/80/new_spotd8_gif.png">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/hotspot/80/new_spotd9_gif.png','hotspot_41')" width="50" height="50"
							 src="https://ssl-player.720static.com/hotspot/80/new_spotd9_gif.png">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/hotspot/80/new_spotd10_gif.png','hotspot_42')" width="50" height="50"
							 src="https://ssl-player.720static.com/hotspot/80/new_spotd10_gif.png">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/hotspot/80/new_spotd11_gif.png','hotspot_43')" width="50" height="50"
							 src="https://ssl-player.720static.com/hotspot/80/new_spotd11_gif.png">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/hotspot/80/new_spotd12_gif.png','hotspot_44')" width="50" height="50"
							 src="https://ssl-player.720static.com/hotspot/80/new_spotd12_gif.png">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd1.png?2.2.7','hotspot_45')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd1.png?2.2.7">
							</Col>
						</Row>

						<Row style="background: rgba(0, 0, 0, 0.8);margin:0 -16px;">
							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd2.png?2.2.7','hotspot_46')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd2.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd3.png?2.2.7','hotspot_47')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd3.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd4.png?2.2.7','hotspot_48')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd4.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd5.png?2.2.7','hotspot_49')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd5.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd6.png?2.2.7','hotspot_50')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd6.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd7.png?2.2.7','hotspot_51')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd7.png?2.2.7">
							</Col>
						</Row>

						<Row style="background: rgba(0, 0, 0, 0.8);margin:0 -16px;">
							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd8.png?2.2.7','hotspot_52')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd8.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd9.png?2.2.7','hotspot_53')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd9.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd10.png?2.2.7','hotspot_54')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd10.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd11.png?2.2.7','hotspot_55')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd11.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd12.png?2.2.7','hotspot_56')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd12.png?2.2.7">
							</Col>

							<Col span="4">
							<img @click="addHot('https://ssl-player.720static.com/@/krp/hotspot/v2/spot21.png?2.2.7','hotspot_58')" width="50" height="50"
							 src="https://ssl-player.720static.com/@/krp/hotspot/v2/spot21.png?2.2.7">
							</Col>
						</Row>

					</Card>
					<Card>
						<p slot="title">
							<Icon type="paper-airplane"></Icon>
							选择跳转的场景
						</p>
						<Select v-model="modelpanoramic">
							<Option v-for="item in hotList" :value="item.pano_id" :key="item.pano_id">{{ item.title }}</Option>
						</Select>
					</Card>
					<Row class="margin-top-10 publish-button-con">
						<Button @click="modal7 = true" icon="ios-checkmark" long type="success">保存</Button>
					</Row>
					</Col>
				</Row>
				<Row>
					<Col span="24">
					<Card>
						<p slot="title">
							<Icon type="paper-airplane"></Icon>
							热点管理
						</p>
						<can-edit-table @on-delete="handleRemoveHot" v-model="hotspotList" :columns-list="tableColumns4"></can-edit-table>
					</Card>
					</Col>
				</Row>
			</Tab-pane>
			<Tab-pane label="背景音乐">
				<Row>
					<Card>
						<Button @click="showMusicModal = true" class="margin-left-10" type="primary" icon="plus">新增</Button>
					</Card>
				</Row>
				<Row>
					<Card>
						<Table stripe border :columns="tableColumns3" :data="resultValueMusic"></Table>
					</Card>
				</Row>
			</Tab-pane>
			<Tab-pane label="其它">
				<Row :gutter="10">
					<Col span="12">
					<Card>
						<p slot="title">
							<Icon type="paper-airplane"></Icon>
							全景附加功能设置
						</p>
						<a href="#" slot="extra" @click.prevent="commentShowAdd = true">
							<Icon type="plus"></Icon>
							新增
						</a>
						<can-edit-table @on-delete="handleRemove" v-model="resultData" :columns-list="tableColumns"></can-edit-table>
					</Card>
					</Col>
					<Col span="12">
					<Card>
						<p slot="title">
							<Icon type="paper-airplane"></Icon>
							相关人物设置
						</p>
						<a href="#" slot="extra" @click.prevent="personShowAdd = true">
							<Icon type="plus"></Icon>
							新增
						</a>
						<can-edit-table @on-delete="handleRemovePerson" v-model="resultData2" :columns-list="tableColumns2"></can-edit-table>
					</Card>
					</Col>
				</Row>
			</Tab-pane>
		</Tabs>
		</Col>
	</div>
</template>
<script>
	import panoramicService from '../../../service/panoramicService.js'
	import canEditTable from '../../util/canEditTable.vue';
	import Cookies from 'js-cookie';
	import * as panoramic from '../../../../static/vtour/panoramic.js'

	export default {
		mixins: [panoramicService],
		components: {
			canEditTable
		},
		data() {
			return {
				commentShowAdd: false,//新增控制弹窗
				uploadmusic:false,
				modelAction: '',
				actionDesc: '',
				actionName: '',
				longD:'',
				addressName:'',
				showMusicModal: false,
				modal6: false,
				modal7: false,
				actionList: [
					{
						value: '1',
						label: '电话'
					},
					{
						value: '2',
						label: '导航'
					},
					{
						value: '3',
						label: '网页'
					},
					{
						value: '4',
						label: '文本信息'
					}
				],
				personShowAdd: false,
				personName: '',
				cityDefault: '',
				resultValue: [],
				resultValueMusic: [],
				resultData: [],
				resultData2: [],
				defaultList: [],
				imgName: '',
				visible: false,
				uploadList: [],
				category: [],
				model13: '',
				loading1: false,
				cityList: [],
				list: [],
				hotList: [],
				modelpanoramic: '',
				style: '',
				musicurl: '',
				musicdesc: '',
				hotspotList: [],
				imgList: [
					{ name: 'hotspot_4', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot1.png?2.2.7' },
					{ name: 'hotspot_5', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot2.png?2.2.7' },
					{ name: 'hotspot_6', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot3.png?2.2.7' },
					{ name: 'hotspot_7', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot4.png?2.2.7' },
					{ name: 'hotspot_8', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot5.png?2.2.7' },
					{ name: 'hotspot_9', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot6.png?2.2.7' },
					{ name: 'hotspot_10', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot7.png?2.2.7' },
					{ name: 'hotspot_11', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot8.png?2.2.7' },
					{ name: 'hotspot_12', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot9.png?2.2.7' },
					{ name: 'hotspot_13', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot10.png?2.2.7' },
					{ name: 'hotspot_14', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot11.png?2.2.7' },
					{ name: 'hotspot_15', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot12.png?2.2.7' },
					{ name: 'hotspot_16', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot13.png?2.2.7' },
					{ name: 'hotspot_17', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot14.png?2.2.7' },
					{ name: 'hotspot_18', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot15.png?2.2.7' },
					{ name: 'hotspot_19', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot16.png?2.2.7' },
					{ name: 'hotspot_20', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot17.png?2.2.7' },
					{ name: 'hotspot_21', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot18.png?2.2.7' },
					{ name: 'hotspot_22', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot19.png?2.2.7' },
					{ name: 'hotspot_23', url: 'https://ssl-player.720static.com/hotspot/80/spotd1_gif.png' },
					{ name: 'hotspot_24', url: 'https://ssl-player.720static.com/hotspot/80/spotd2_gif.png' },
					{ name: 'hotspot_25', url: 'https://ssl-player.720static.com/hotspot/80/spotd3_gif.png' },
					{ name: 'hotspot_26', url: 'https://ssl-player.720static.com/hotspot/80/spotd4_gif.png' },
					{ name: 'hotspot_27', url: 'https://ssl-player.720static.com/hotspot/80/spotd5_gif.png' },
					{ name: 'hotspot_28', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/static_link.png?2.2.7' },
					{ name: 'hotspot_29', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/static_gallery.png?2.2.7' },
					{ name: 'hotspot_30', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/static_video.png?2.2.7' },
					{ name: 'hotspot_31', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/static_txt.png?2.2.7' },
					{ name: 'hotspot_32', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/static_music.png?2.2.7' },
					{ name: 'hotspot_33', url: 'https://ssl-player.720static.com/hotspot/80/new_spotd1_gif.png' },
					{ name: 'hotspot_34', url: 'https://ssl-player.720static.com/hotspot/80/new_spotd2_gif.png' },
					{ name: 'hotspot_35', url: 'https://ssl-player.720static.com/hotspot/80/new_spotd3_gif.png' },
					{ name: 'hotspot_36', url: 'https://ssl-player.720static.com/hotspot/80/new_spotd4_gif.png' },
					{ name: 'hotspot_37', url: 'https://ssl-player.720static.com/hotspot/80/new_spotd5_gif.png' },
					{ name: 'hotspot_38', url: 'https://ssl-player.720static.com/hotspot/80/new_spotd6_gif.png' },
					{ name: 'hotspot_39', url: 'https://ssl-player.720static.com/hotspot/80/new_spotd7_gif.png' },
					{ name: 'hotspot_40', url: 'https://ssl-player.720static.com/hotspot/80/new_spotd8_gif.png' },
					{ name: 'hotspot_41', url: 'https://ssl-player.720static.com/hotspot/80/new_spotd9_gif.png' },
					{ name: 'hotspot_42', url: 'https://ssl-player.720static.com/hotspot/80/new_spotd10_gif.png' },
					{ name: 'hotspot_43', url: 'https://ssl-player.720static.com/hotspot/80/new_spotd11_gif.png' },
					{ name: 'hotspot_44', url: 'https://ssl-player.720static.com/hotspot/80/new_spotd12_gif.png' },
					{ name: 'hotspot_45', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd1.png?2.2.7' },
					{ name: 'hotspot_46', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd2.png?2.2.7' },
					{ name: 'hotspot_47', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd3.png?2.2.7' },
					{ name: 'hotspot_48', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd4.png?2.2.7' },
					{ name: 'hotspot_49', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd5.png?2.2.7' },
					{ name: 'hotspot_50', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd6.png?2.2.7' },
					{ name: 'hotspot_51', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd7.png?2.2.7' },
					{ name: 'hotspot_52', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd8.png?2.2.7' },
					{ name: 'hotspot_53', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd9.png?2.2.7' },
					{ name: 'hotspot_54', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd10.png?2.2.7' },
					{ name: 'hotspot_55', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd11.png?2.2.7' },
					{ name: 'hotspot_56', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/new_spotd12.png?2.2.7' },
					{ name: 'hotspot_57', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot20.png?2.2.7' },
					{ name: 'hotspot_58', url: 'https://ssl-player.720static.com/@/krp/hotspot/v2/spot21.png?2.2.7' },
					{ name: 'new_spotd0', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd01_gif.png' },
					{ name: 'new_spotd0', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd02_gif.png' },
					{ name: 'new_spotd0', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd03_gif.png' },
					{ name: 'new_spotd0', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd04_gif.png' },
					{ name: 'new_spotd0', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd05_gif.png' },
					{ name: 'new_spotd0', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd06_gif.png' },
					{ name: 'new_spotd0', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd07_gif.png' },
					{ name: 'new_spotd0', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd08_gif.png' },
					{ name: 'new_spotd0', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd09_gif.png' },
					{ name: 'new_spotd1', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd10_gif.png' },
					{ name: 'new_spotd1', url: 'https://ssl-player.720static.com/@/krp/1.19-pr8/hotspotIcons/new_spotd11_gif.png' },
				],
				tableColumns: [  //表头
					{
						title: 'ID',
						key: 'funId',
						width: 80,
						align: 'center',
					},
					{
						title: '分类名称',
						key: 'funName',
						align: 'center',
						editable: true
					},
					{
						title: '分类类型',
						key: 'funType',
						align: 'center',
						render: (h, params) => {
							return h('span', [
								h('span', {
								}, this.handleType(params.row.funType))
							]);
						}
					},
					{
						title: '操作',
						key: 'action',
						width: 350,
						align: 'center',
						handle: ['delete']
					}
				],
				tableColumns2: [  //表头
					{
						title: 'ID',
						key: 'perId',
						width: 80,
						align: 'center',
					},
					{
						title: '姓名',
						key: 'perUserName',
						align: 'center',
						editable: true
					},
					{
						title: '操作',
						key: 'action',
						width: 350,
						align: 'center',
						handle: ['delete']
					}
				],
				tableColumns4: [  //表头
					{
						title: '样式',
						key: 'style',
						align: 'center',
						render: (h, params) => {
							return h('img', {
								attrs: {
									src: this.handleImgHot(params.row.style),
									width: 50,
									height: 50,
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
						width: 350,
						align: 'center',
						handle: ['delete']
					}
				],
				tableColumns3: [  //表头
					{
						title: 'ID',
						key: 'musicId',
						width: 80,
						align: 'center',
					},
					{
						title: '音乐名称',
						key: 'musicDesc',
						align: 'center',
					},
					{
						title: '网络地址',
						key: 'musicUrl',
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
										type: 'error',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.handleDeleteMusic(params.row.musicId)
										}
									}
								}, '删除')
							]);
						}
					}
				],
			}
		},
		computed: {
			viewHeightPanoramic: function () {
				return (window.innerHeight - 200) + 'px'
				// return '100%'
			},
		},
		beforeMount() {
			this.fetchList()
			this.getCategory().then(res => {
				this.category = res
			})
		},
		mounted() {
			// this.$nextTick(() => {
			// embedpano({ swf: "../../../../static/vtour/tour.swf", xml: this.resultValue.panoTourxml, target: "pano", html5: "auto", mobilescale: 1.0, passQueryParameters: true });
			// })
		},
		methods: {
			//获取数据
			fetchList() {
				var params = {
					panoid: this.$route.params.panoramic_id
				}
				this.getSinglePanoramic(params).then(res => {
					this.longD = res.panoLongitude + ',' + res.panoDimension
					this.addressName = res.panoAddress
					this.resultValue = res
					var params = {
						id: '1',
						name: res.panoAddress
					}
					this.cityList.push(params)
					setTimeout(() => {
						this.cityDefault = '1'
					}, 900)
					this.resultData = res.banaPanoFunction
					this.resultData2 = res.banaPanoPerson
					if (res.panoPicture) {
						this.handleImg(res.panoPicture)
					}
				})
			},
			handleImg(arg) {
				this.defaultList = []
				var data = arg.split(',')
				for (var i = 0; i < data.length; i++) {
					var result = {
						'url': data[i]
					}
					this.defaultList.push(result)
				}
				this.$nextTick(() => {
					this.uploadList = this.$refs.upload.fileList;
				})
			},
			handleView(name) {
				this.imgName = name;
				this.visible = true;
			},
			handleRemovepic(file) {
				// 从 upload 实例删除数据
				const fileList = this.$refs.upload.fileList;
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
				this.resultValue.panoPicture = ''
				for(var item of this.$refs.upload.fileList){
					this.resultValue.panoPicture = this.resultValue.panoPicture ? this.resultValue.panoPicture + "," + item.url : item.url
				}
			},
			handleSuccess(res, file) {
				file.url = res.data
				file.name = file.name
				this.resultValue.panoMainpic = res.data
			},
			handleSuccess2(res, file) {
				file.url = res.data
				file.name = file.name
				this.resultValue.panoPicture = this.resultValue.panoPicture ? this.resultValue.panoPicture + "," + res.data : res.data
				this.$nextTick(() => {
					this.uploadList = this.$refs.upload.fileList;
				})
			},
			handleSuccess3(res, file) {
				this.musicurl = res.data
				this.uploadmusic = false
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: '超出文件大小限制',
					desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
				});
			},
			handleBeforeUpload() {
				const check = this.uploadList.length < 5;
				if (!check) {
					this.$Notice.warning({
						title: '最多只能上传 5 张图片。'
					});
				}
				return check;
			},
			keyUpSearch(query) {
				this.cityList = []
				var _this = this
				AMap.service(["AMap.PlaceSearch"], function () {
					var placeSearch = new AMap.PlaceSearch({
						pageSize: 10,
						pageIndex: 1,
						panel: "temp"
					});
					//关键字查询
					placeSearch.search(query, function (status, result) {
						if (status == 'complete' && result.info == 'OK') {
							console.log(result)
							_this.cityList = result.poiList.pois
						} else {
							_this.cityList = []
						}
					})
				})
			},
			handleType(type) {
				var result = ''
				switch (type) {
					case '1':
						result = '电话'
						break;
					case '2':
						result = '导航'
						break;
					case '3':
						result = '网页'
						break;
					case '4':
						result = '文本信息'
						break;
				}
				return result
			},
			handleAddAction() {
				var params = {
					token: Cookies.get('token'),
					funPanoId: this.$route.params.panoramic_id,
					funName: this.actionName,
					funDesc: this.actionDesc,
					funType: this.modelAction
				}
				this.addActionApi(params).then(() => {
					this.fetchList()
				})
			},
			//删除全景类型
			handleRemove(val) {
				var params = {
					token: Cookies.get('token'),
					funId: val.funId,
				}
				this.DeleteActionApi(params).then(() => {
					this.fetchList()
				})
			},
			handlePerson() {
				var params = {
					token: Cookies.get('token'),
					perPanoId: this.$route.params.panoramic_id,
					perUserName: this.personName,
					perUserType: 2
				}
				this.addPersonApi(params).then(() => {
					this.fetchList()
				})
			},
			handleRemovePerson(val) {
				var params = {
					token: Cookies.get('token'),
					perId: val.perId,
				}
				this.DeletePersonApi(params).then(() => {
					this.fetchList()
				})
			},
			asyncOK() {
				this.modal6 = false
				this.handleSavePanoramic()
			},
			asyncOK7() {
				this.modal7 = false
				this.handleUpdate()
			},
			handleSavePanoramic() {
				var params = {
					token: Cookies.get('token'),
					panoid: this.$route.params.panoramic_id,
					mainpicture: this.resultValue.panoMainpic,
					picture: this.resultValue.panoPicture,
					content: this.resultValue.panoContent,
					title: this.resultValue.panoName,
					type: this.resultValue.panoType,
					address: this.addressName,
					longitude: this.longD.split(',')[0],
					dimension: this.longD.split(',')[1],
					phone: this.resultValue.panoPhone
				}
				this.savePanoramicApi(params).then(() => {
					this.closePage('panoramic_edit')
				})
			},
			loadingHot(name) {
				if (name == 1) {
					var params = {
						token: Cookies.get('token'),
						panoid: this.$route.params.panoramic_id,
					}
					this.getkrpanoGetscene(params).then(res => {
						this.hotList = res
					})
					embedpano({ swf: "../../../../static/vtour/tour.swf", xml: this.resultValue.panoTourxml, target: "pano", html5: "auto", mobilescale: 1.0, passQueryParameters: true });
					setTimeout(() => {
						this.getHotList()
					}, 700)
				} else if (name == 2) {
					var params = {
						token: Cookies.get('token'),
						musicPanoId: this.$route.params.panoramic_id,
					}
					this.getMusicList(params).then(res => {
						this.resultValueMusic = res
					})
				}
			},
			showpano() {
				var krpano = document.getElementById('krpanoSWFObject');
				krpano.call("if(layer[sltbg].y == 80, tween(layer[sltbg].y, -170); , tween(layer[sltbg].y, 80); ); ");
			},
			addHot(url, style) {
				this.style = style
				panoramic.show_comment(url);
			},
			handleUpdate() {
				var krpano = document.getElementById('krpanoSWFObject');
				var ath = $("#comment-athv").attr("data-ath")
				var atv = $("#comment-athv").attr("data-atv")
				var sname = krpano.get("scene[get(xml.scene)].name");
				var params = {
					token: Cookies.get('token'),
					panoid: this.$route.params.panoramic_id,
					scenename: sname,
					hostname: "hs" + ((Date.now() + Math.random()) | 0),
					style: this.style,
					ath: ath,
					atv: atv,
					linkedscene: this.modelpanoramic,
				}
				this.handleAddcomment(params).then(res => {
					$("#pano").empty()
					setTimeout(() => {
						embedpano({ swf: "../../../../static/vtour/tour.swf", xml: this.resultValue.panoTourxml, target: "pano", html5: "auto", mobilescale: 1.0, passQueryParameters: true });
					}, 599)
				})
			},
			handleAddMusic() {
				var params = {
					token: Cookies.get('token'),
					musicPanoId: this.$route.params.panoramic_id,
					musicUrl: this.musicurl,
					musicDesc: this.musicdesc
				}
				this.handleMusicApi(params).then(() => {
					var param = {
						token: Cookies.get('token'),
						musicPanoId: this.$route.params.panoramic_id,
					}
					this.getMusicList(param).then(res => {
						this.resultValueMusic = res
					})
				})
			},
			handleDeleteMusic(id) {
				var params = {
					token: Cookies.get('token'),
					musicId: id
				}
				this.handleDeleteMusicApi(params).then(() => {
					var param = {
						token: Cookies.get('token'),
						musicPanoId: this.$route.params.panoramic_id,
					}
					this.getMusicList(param).then(res => {
						this.resultValueMusic = res
					})
				})
			},
			closePage(name) {
				let pageOpenedList = this.$store.state.app.pageOpenedList;
				let lastPageObj = pageOpenedList[0];
				if (this.currentPageName === name) {
					let len = pageOpenedList.length;
					for (let i = 1; i < len; i++) {
						if (pageOpenedList[i].name === name) {
							if (i < (len - 1)) {
								lastPageObj = pageOpenedList[i + 1];
							} else {
								lastPageObj = pageOpenedList[i - 1];
							}
							break;
						}
					}
				}
				this.$store.commit('removeTag', name);
				this.$store.commit('closePage', name);
				pageOpenedList = this.$store.state.app.pageOpenedList;
				localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
				this.$router.push({
					name: 'panoramic',
				});
			},
			getHotList() {
				var krpano = document.getElementById('krpanoSWFObject');
				var sname = krpano.get("scene[get(xml.scene)].name");
				var params = {
					token: Cookies.get('token'),
					panoid: this.$route.params.panoramic_id,
					scenename: sname,
				}
				this.getkrpanoHotList(params).then(res => {
					this.hotspotList = res
				})
			},
			handleImgHot(img) {
				for (let i = 0; i < this.imgList.length; i++) {
					const element = this.imgList[i];
					if (element.name == img) {
						return element.url
						break;
					}
				}
			},
			handleRemoveHot(val) {
				var krpano = document.getElementById('krpanoSWFObject');
				var sname = krpano.get("scene[get(xml.scene)].name");
				var params = {
					token: Cookies.get('token'),
					panoid: this.$route.params.panoramic_id,
					scenename: sname,
					hostname: val.name
				}
				this.detkrpanoHot(params).then(res => {
					$("#pano").empty()
					setTimeout(() => {
						embedpano({ swf: "../../../../static/vtour/tour.swf", xml: this.resultValue.panoTourxml, target: "pano", html5: "auto", mobilescale: 1.0, passQueryParameters: true });
					}, 200)
					setTimeout(() => {
						this.getHotList()
					}, 2000)
				})
			},
			handleUpload(file) {
				this.musicdesc = file.name
				this.uploadmusic = true
			}
		}
	}
</script>