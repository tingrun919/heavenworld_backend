<style lang="less">
	@import "./home.less";
	@import "../../styles/common.less";
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
	<div class="home-main">
		<!-- <Row :gutter="10">
			<Col :md="24" :lg="8">
			<Row class-name="home-page-row1" :gutter="10">
				<Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
				<Card>
					<Row type="flex" class="user-infor">
						<Col span="8">
						<Row class-name="made-child-con-middle" type="flex" align="middle">
							<img class="avator-img" :src="avatorPath" />
						</Row>
						</Col>
						<Col span="16" style="padding-left:6px;">
						<Row class-name="made-child-con-middle" type="flex" align="middle">
							<div>
								<b class="card-user-infor-name">Admin</b>
								<p>super admin</p>
							</div>
						</Row>
						</Col>
					</Row>
					<div class="line-gray"></div>
					<Row class="margin-top-8">
						<Col span="8">
						<p class="notwrap">上次登录时间:</p>
						</Col>
						<Col span="16" class="padding-left-8">2017.09.12-13:32:20</Col>
					</Row>
					<Row class="margin-top-8">
						<Col span="8">
						<p class="notwrap">上次登录地点:</p>
						</Col>
						<Col span="16" class="padding-left-8">北京</Col>
					</Row>
				</Card>
				</Col>
				<Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
				<Card>
					<p slot="title" class="card-title">
						<Icon type="android-checkbox-outline"></Icon>
						待办事项
					</p>
					<a type="text" slot="extra" @click.prevent="addNewToDoItem">
						<Icon type="plus-round"></Icon>
					</a>
					<Modal v-model="showAddNewTodo" title="添加新的待办事项" @on-ok="addNew" @on-cancel="cancelAdd">
						<Row type="flex" justify="center">
							<Input v-model="newToDoItemValue" icon="compose" placeholder="请输入..." style="width: 300px" />
						</Row>
						<Row slot="footer">
							<Button type="text" @click="cancelAdd">取消</Button>
							<Button type="primary" @click="addNew">确定</Button>
						</Row>
					</Modal>
					<div class="to-do-list-con">
						<div v-for="(item, index) in toDoList" :key="'todo-item' + (toDoList.length - index)" class="to-do-item">
							<to-do-list-item :content="item.title"></to-do-list-item>
						</div>
					</div>
				</Card>
				</Col>
			</Row>
			</Col>
			<Col :md="24" :lg="16">
			<Row :gutter="5">
				<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
				<infor-card id-name="user_created_count" :end-val="count.createUser" iconType="android-person-add" color="#2d8cf0" intro-text="今日新增用户"></infor-card>
				</Col>
				<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
				<infor-card id-name="visit_count" :end-val="count.visit" iconType="ios-eye" color="#64d572" :iconSize="50" intro-text="今日浏览量"></infor-card>
				</Col>
				<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
				<infor-card id-name="collection_count" :end-val="count.collection" iconType="upload" color="#ffd572" intro-text="今日数据采集量"></infor-card>
				</Col>
				<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
				<infor-card id-name="transfer_count" :end-val="count.transfer" iconType="shuffle" color="#f25e43" intro-text="今日服务调用量"></infor-card>
				</Col>
			</Row>
			<Row>
				<Card :padding="0">
					<p slot="title" class="card-title">
						<Icon type="map"></Icon>
						今日服务调用地理分布
					</p>
					<div class="map-con">
						<Col span="10">
						<map-data-table :cityData="cityData" height="281" :style-obj="{margin: '12px 0 0 11px'}"></map-data-table>
						</Col>
						<Col span="14" class="map-incon">
						<Row type="flex" justify="center" align="middle">
							<home-map :city-data="cityData"></home-map>
						</Row>
						</Col>
					</div>
				</Card>
			</Row>
			</Col>
		</Row>
		<Row :gutter="10" class="margin-top-10">
			<Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
			<Card>
				<p slot="title" class="card-title">
					<Icon type="android-map"></Icon>
					上周每日来访量统计
				</p>
				<div class="data-source-row">
					<visite-volume></visite-volume>
				</div>
			</Card>
			</Col>
			<Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
			<Card>
				<p slot="title" class="card-title">
					<Icon type="ios-pulse-strong"></Icon>
					数据来源统计
				</p>
				<div class="data-source-row">
					<data-source-pie></data-source-pie>
				</div>
			</Card>
			</Col>
			<Col :md="24" :lg="8">
			<Card>
				<p slot="title" class="card-title">
					<Icon type="android-wifi"></Icon>
					各类用户服务调用变化统计
				</p>
				<div class="data-source-row">
					<user-flow></user-flow>
				</div>
			</Card>
			</Col>
		</Row> -->
		<Spin fix v-if="loading">
			<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
			<div>推送中...</div>
		</Spin>
		<Modal title="新增" @on-ok="handleAddNotice" v-model="commentShowAdd" class-name="vertical-center-modal">
			<Input v-model="title" placeholder="请输入新增系统消息的标题"></Input>
			<Input class="margin-top-20" v-model="content" placeholder="请输入新增系统消息的内容"></Input>
		</Modal>
		<Row class="margin-top-10">
			<Card>
				<p slot="title" class="card-title">
					<Icon type="ios-shuffle-strong"></Icon>
					系统推送消息
				</p>
				<a href="#" slot="extra" @click.prevent="commentShowAdd = true">
					<Icon type="plus"></Icon>
					发布系统消息
				</a>
				<div class="map-con">
					<Col span="24">
					<Table :columns="columns" :data="resultValue"></Table>
					</Col>
				</div>
			</Card>
		</Row>
	</div>
</template>

<script>
	import cityData from './map-data/get-city-value.js';
	import homeMap from './components/map.vue';
	import dataSourcePie from './components/dataSourcePie.vue';
	import visiteVolume from './components/visiteVolume.vue';
	import serviceRequests from './components/serviceRequests.vue';
	import userFlow from './components/userFlow.vue';
	import countUp from './components/countUp.vue';
	import inforCard from './components/inforCard.vue';
	import mapDataTable from './components/mapDataTable.vue';
	import toDoListItem from './components/toDoListItem.vue';
	import homeService from '../../service/homeService.js'
	import Cookies from 'js-cookie';

	export default {
		name: 'home',
		mixins: [homeService],
		components: {
			homeMap,
			dataSourcePie,
			visiteVolume,
			serviceRequests,
			userFlow,
			countUp,
			inforCard,
			mapDataTable,
			toDoListItem
		},
		data() {
			return {
				loading: false,
				columns: [
					{
						title: '标题',
						align: 'center',
						key: 'noticeName'
					},
					{
						title: '内容',
						align: 'center',
						key: 'noticeContent'
					},
					{
						title: '发布时间',
						align: 'center',
						key: 'noticeCreatetime'
					},
					{
						title: '操作',
						width: 200,
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
											this.deleteNotice(params.row.noticeId)
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
				toDoList: [
					{
						title: '去iView官网学习完整的iView组件'
					},
					{
						title: '去iView官网学习完整的iView组件'
					},
					{
						title: '去iView官网学习完整的iView组件'
					},
					{
						title: '去iView官网学习完整的iView组件'
					},
					{
						title: '去iView官网学习完整的iView组件'
					}
				],
				count: {
					createUser: 496,
					visit: 3264,
					collection: 24389305,
					transfer: 39503498
				},
				cityData: cityData,
				resultValue: [],
				showAddNewTodo: false,
				newToDoItemValue: '',
				commentShowAdd: false,
				title: '',
				content: '',
			};
		},
		beforeMount() {
			this.fetchList()
		},
		computed: {
			avatorPath() {
				return localStorage.avatorImgPath;
			}
		},
		methods: {
			fetchList() {
				this.getSysList().then(res => {
					this.resultValue = res
					this.loading = false
				})
			},
			addNewToDoItem() {
				this.showAddNewTodo = true;
			},
			addNew() {
				if (this.newToDoItemValue.length !== 0) {
					this.toDoList.unshift({
						title: this.newToDoItemValue
					});
					setTimeout(() => {
						this.newToDoItemValue = '';
					}, 200);
					this.showAddNewTodo = false;
				} else {
					this.$Message.error('请输入待办事项内容');
				}
			},
			cancelAdd() {
				this.showAddNewTodo = false;
				this.newToDoItemValue = '';
			},
			handleAddNotice() {
				this.loading = true
				var params = {
					token: Cookies.get('token'),
					noticeName: this.title,
					noticeContent: this.content
				}
				this.AddNoticeApi(params).then(() => {
					this.fetchList()
					this.title = ''
					this.content = ''
				})
			},
			deleteNotice(id) {
				var params = {
					noticeId: id,
					token: Cookies.get('token')
				}
				this.deleteNoticeApi(params).then(() => {
					this.fetchList()
				})
			}
		}
	};
</script>