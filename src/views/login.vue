<style lang="less">
	@import './login.less';
</style>

<template>
	<div class="login" @keydown.enter="handleSubmit">
		<div class="login-con">
			<Card :bordered="false">
				<p slot="title">
					<Icon type="log-in"></Icon>
					欢迎登录
				</p>
				<div class="form-con">
					<Form ref="loginForm" :model="form" :rules="rules">
						<FormItem prop="phone">
							<Input v-model="form.phone" placeholder="请输入用户名">
							<span slot="prepend">
								<Icon :size="16" type="person"></Icon>
							</span>
							</Input>
						</FormItem>
						<FormItem prop="password">
							<Input type="password" v-model="form.password" placeholder="请输入密码">
							<span slot="prepend">
								<Icon :size="14" type="locked"></Icon>
							</span>
							</Input>
						</FormItem>
						<FormItem>
							<Button @click="handleSubmit" type="primary" long>登录</Button>
						</FormItem>
					</Form>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
	import Cookies from 'js-cookie';
	import loginService from '../service/loginService.js';
	export default {
		mixins: [loginService],
		data() {
			return {
				form: {
					phone: '',
					password: ''
				},
				rules: {
					phone: [
						{ required: true, message: '账号不能为空', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '密码不能为空', trigger: 'blur' }
					]
				}
			};
		},
		methods: {
			handleSubmit() {
				this.$refs.loginForm.validate((valid) => {
					if (valid) {
						this.loginAction(this.form).then(result => {
							Cookies.set('user', result.staffName);
							Cookies.set('token',result.staffToken);
							Cookies.set('staffId',result.staffId);
							this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
							if (result.staffDictValue === '2') {//系统管理员
								Cookies.set('access', 0); 
								this.$router.push({
									name: 'home_index'
								});
							} else {							//三方用户
								Cookies.set('access', 1);
								Cookies.set('orgid',result.staffOrgid)
								this.$router.push({
									name: 'other_index'
								});
							}
						})
					}
				});
			}
		}
	};
</script>

<style>
</style>