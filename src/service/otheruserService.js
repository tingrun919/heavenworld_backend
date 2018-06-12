import Util from '../libs/util';

export default {
	methods:{
		getUserinfo(form){
			return Util.get('info/selectThirdPartyOne',form).then(res => {
				var result = res.data
				if(result.code == 100000){
					return result.data
				}else{
					this.$Message.error(result.message);
				}
			})
		}
	}
}