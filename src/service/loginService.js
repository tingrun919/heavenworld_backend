import Util from '../libs/util';

export default {
	methods:{
		loginAction(form){
			return Util.post('staff/login',form).then(res => {
				var result = res.data
				if(result.code == 100000){
					this.$Message.success('登陆成功！');
					return result.data[0]
				}else{
					this.$Message.error(result.message);
				}
			})
		}
	}
}