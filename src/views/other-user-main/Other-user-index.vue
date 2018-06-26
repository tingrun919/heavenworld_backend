<style lang="less">
	@import '../../styles/common.less';
</style>
<template>
	<div>
		<Row>
			<Card>
				<span>三方名称：</span>
				<Input v-model="params.thirdName" placeholder="请输入标题名称" clearable style="width: 200px"></Input>
				<span class="margin-left-10">受限制状态：</span>
				<Select v-model="params.thirdState" clearable style="width:150px">
						<Option v-for="item in currentState" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				<Button @click="fetchList" class="margin-left-10" type="primary" icon="search">查询</Button>
				<Button @click="otherUserShowAdd = true" class="margin-left-10" type="success" icon="plus">新增</Button>
			</Card>
		</Row>
		<Row>
			<Card>
				<can-edit-table @on-change="handleUpdateOtherIndex" @on-delete="handleRemove" v-model="resultValue" :columns-list="tableColumns"></can-edit-table>
				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page show-elevator show-sizer @on-params-size-change="changePage" :total="pageTotal" :current="params.beginRow" @on-change="changePage"></Page>
					</div>
				</div>
			</Card>
		</Row>
		<Modal title="新增" :mask-closable="false" v-model="otherUserShowAdd" class-name="vertical-center-modal">
			<Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
				<Form-item label="公司名称" prop="thirdName">
					<Input v-model="formItem.thirdName" placeholder="请输入公司名称"></Input>
				</Form-item>
				<Form-item label="公司地址" prop="thirdAddress">
					<Input v-model="formItem.thirdAddress" placeholder="请输入公司地址"></Input>
				</Form-item>
				<Form-item label="联系方式" prop="thirdPhone">
					<Input v-model="formItem.thirdPhone" placeholder="请输入联系方式"></Input>
				</Form-item>
				<Form-item label="账号" prop="usercount">
					<Input v-model="formItem.usercount" placeholder="请输入账号"></Input>
				</Form-item>
				<Form-item label="密码" prop="password">
					<Input v-model="formItem.password" placeholder="请输入密码" type="password"></Input>
				</Form-item>
				<Form-item label="密码确认" prop="passwdCheck">
					<Input v-model="formItem.passwdCheck" placeholder="请再次输入密码" type="password"></Input>
				</Form-item>
				<Form-item>
					<Button type="primary" @click="handleAddCategory('formItem')">提交</Button>
					<Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
				</Form-item>
			</Form>
			<div slot="footer">
			</div>
		</Modal>
	</div>
</template>
<script>
	import otheruserService from '../../service/otheruserService.js';
	import canEditTable from '../util/canEditTable.vue';
	import Cookies from 'js-cookie';

	export default {
		mixins: [otheruserService],
		components: {
			canEditTable
		},
		data() {
			const validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.formItem.passwdCheck !== '') {
						// 对第二个密码框单独验证
						this.$refs.formItem.validateField('passwdCheck');
					}
					callback();
				}
			};
			const validatePassCheck = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.formItem.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				formItem: {
					thirdName: '',
					thirdAddress: '',
					thirdPhone: '',
					usercount: '',
					password: '',
					passwdCheck: '',
				},
				ruleValidate: {
					thirdName: [
						{ required: true, message: '名称不能为空', trigger: 'blur' }
					],
					thirdAddress: [
						{ required: true, message: '地址不能为空', trigger: 'blur' },
					],
					thirdPhone: [
						{ required: true, message: '联系方式不能为空', trigger: 'blur' }
					],
					usercount: [
						{ required: true, message: '账号不能为空', trigger: 'blur' }
					],
					password: [
						{ required: true, validator: validatePass, trigger: 'blur' }
					],
					passwdCheck: [
						{ required: true, validator: validatePassCheck, trigger: 'blur' }
					],
				},
				resultValue: [],//列表数据
				initResultValue: [],//列表数据
				pageTotal: null,//总页数
				params: {
					token: Cookies.get('token'),
					beginRow: 1,//当前页数
					pageSize: 10,//每页显示条数
					thirdName: '',
					thirdState: '',//0:封禁，1:未封禁
				},
				otherUserShowAdd: false,
				loading: true,//表格加载动画
				currentState: [//是否发布
					{
						value: '1',
						label: '未封禁'
					},
					{
						value: '0',
						label: '封禁中'
					}
				],
				tableColumns: [  //表头
					{
						title: 'ID',
						key: 'thirdId',
						width: 80,
						align: 'center',
					},
					{
						title: '第三方名称',
						key: 'thirdName',
						align: 'center',
						editable: true
					},
					{
						title: '第三方地址',
						key: 'thirdAddress',
						align: 'center',
						editable: true
					},
					{
						title: '联系方式',
						key: 'thirdPhone',
						align: 'center',
						editable: true
					},
					{
						title: '状态',
						key: 'thirdState',
						align: 'center',
						sortable: true,
						render: (h, params) => {
							const row = params.row;
							const type = row.thirdState == 0 ? 'error' : 'primary';
							const text = row.thirdState == 0 ? '封禁' : '正常'
							return h('Button', {
								props: {
									type: type,
								},
								on: {
									click: () => {
										this.handleUpdateOtherIndexStatus(params.row)
									}
								}
							}, text);
						},
					},
					{
						title: '操作',
						key: 'action',
						width: 250,
						align: 'center',
						handle: ['edit', 'delete'],
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
				this.getOtherUserList(this.params).then(res => {
					this.loading = false
					this.resultValue = res
					this.pageTotal = new Number(res[0].thirdCount)
				})
			},
			//分页
			changePage(pageNum) {
				this.loading = true
				this.params.beginRow = pageNum
				this.fetchList()
			},
			//新增第三方
			handleAddCategory(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
						this.formItem.token = Cookies.get('token')
						this.$Message.success('提交成功!');
						this.addUserApi(this.formItem).then(res => {
							if(res.code == '100000'){
								this.otherUserShowAdd = false
								this.fetchList()
							}
						})
                    } else {
						this.$Message.error('表单验证失败!');
                    }
				})
			},
			//重置表单
			handleReset (name) {
                this.$refs[name].resetFields();
            },
			//删除资讯
			handleRemove(val) {
				var param = {
					thirdId: val.thirdId,
					token: Cookies.get("token")
				}
				this.removeOtherUser(param).then(() => {
					this.fetchList()
				})
			},
			//修改第三方
			handleUpdateOtherIndex(val, index){
				var params = {
					token:Cookies.get('token'),
					thirdId:val[index].thirdId,
					thirdName:val[index].thirdName,
					thirdAddress:val[index].thirdAddress,
					thirdPhone:val[index].thirdPhone,
				}
				this.updateOtherUser(params).then(() => {
					this.fetchList()
				})
			},
			//修改第三方是否封禁
			handleUpdateOtherIndexStatus(val){
				var params = {
					token:Cookies.get('token'),
					thirdId:val.thirdId,
					thirdState:val.thirdState == 1 ? 0 : 1
				}
				this.updateOtherUser(params).then(() => {
					this.fetchList()
				})
			},
		}
	}
</script>