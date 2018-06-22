<style lang="less">
	@import '../../styles/common.less';
</style>
<template>
	<div>
		<Row>
			<Card>
				<span>分类名称：</span>
				<Input v-model="params.name" placeholder="请输入类型名称" clearable style="width: 200px"></Input>
				<Button @click="fetchList" class="margin-left-10" type="primary" icon="search">查询</Button>
				<Button @click="commentShowAdd = true" class="margin-left-10" type="success" icon="plus">新增</Button>
			</Card>
		</Row>
		<Row>
			<Card>
				<can-edit-table :loading="loading" @on-change="handleUpdatePanoramicCategory" @on-delete="handleRemove" v-model="resultValue" :columns-list="tableColumns"></can-edit-table>
			</Card>
		</Row>
		<Modal title="新增" @on-ok="handleAddCategory" v-model="commentShowAdd" class-name="vertical-center-modal">
			<span class="margin-left-10">一级分类：</span>
			<Select v-model="typePid" clearable style="width:150px">
				<Option v-for="item in fCategory" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			<Input class="margin-top-20" v-model="typeName" placeholder="请输入新增类型的名称"></Input>
		</Modal>
	</div>
</template>
<script>
	import categoryService from '../../service/categoryService.js';
	import canEditTable from '../util/canEditTable.vue';
	import Cookies from 'js-cookie';

	export default {
		mixins: [categoryService],
		components: {
			canEditTable
		},
		data() {
			return {
				resultValue: [],//列表数据
				params: {
					token: Cookies.get('token'),
					name: '',//类型名称
				},
				typePid:'',
				typeName: '',//内容
				loading: true,//表格加载动画
				fCategory: [],
				commentShowAdd: false,
				tableColumns: [  //表头
					{
						title: 'ID',
						key: 'typeId',
						width: 80,
						align: 'center',
					},
					{
						title: '上级分类',
						key: 'typePName',
						align: 'center',
					},
					{
						title: '分类名称',
						key: 'typeName',
						align: 'center',
						editable: true
					},
					{
						title: '默认展示',
						key: 'typeIfedit',
						align: 'center',
						render: (h, params) => {
							const row = params.row;
							const type = row.typeIfedit === '0' ? 'success' : 'primary';
							const text = row.typeIfedit === '0' ? '默认' : '未默认';
							return h('Button', {
								props: {
									type: type,
								},
								on: {
									click: () => {
										this.handleUpdateInformationCategoryIf(row.typeId, row.typeIfedit, row.typeName)
									}
								}
							}, text);
						},
					},
					{
						title: '操作',
						key: 'action',
						width: 350,
						align: 'center',
						handle: ['edit', 'delete']
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
				this.getInformationCategoryList(this.params).then(res => {
					this.loading = false
					this.fCategory = []
					this.resultValue = this.handleCategory(res)
				})
			},
			//处理分类
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
				for (var index in res) {
					if (res[index].typePid === 0) {
						res.splice(index, 1)
					}
				}
				for (var index in res) {
					if (res[index].typePid === 0) {
						res.splice(index, 1)
					}
				}
				return res
			},
			//新增全景类型
			handleAddCategory() {
				var params = {
					token: Cookies.get('token'),
					typeName: this.typeName,
					typePid: this.typePid,
					typeDesc: this.typeName,
				}
				this.AddCategoryInformationApi(params).then(() => {
					this.typeName = ''
					this.typePid = ''
					this.fetchList()
				})
			},
			//删除全景类型
			handleRemove(val) {
				var params = {
					token: Cookies.get('token'),
					typeId: val.typeId,
				}
				this.DeleteCategoryInformationApi(params).then(() => {
					this.fetchList()
				})
			},
			//修改类型名称
			handleUpdatePanoramicCategory(val, index) {
				var params = {
					token: Cookies.get('token'),
					typeId: val[index].typeId,
					typeName: val[index].typeName
				}
				this.UpdateCategoryInformationApi(params).then(() => {
					this.fetchList()
				})
			},
			//修改是否默认展示
			handleUpdateInformationCategoryIf(typeId, typeIfedit, typeName) {
				var params = {
					token: Cookies.get('token'),
					typeId: typeId,
					typeIfedit: typeIfedit == '0' ? '1' : '0',
					typeName: typeName
				}
				this.UpdateCategoryInformationApi(params).then(() => {
					this.fetchList()
				})
			}
		}
	}
</script>