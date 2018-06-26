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
		},
		getOtherUserList(params){
			return Util.get('info/selectThirdParty',params).then(res => {
				var result = res.data
				return result.data
			})
		},
		addUserApi(params){
			return Util.post('info/addThirdParty', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('新增成功！');
					return result
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		},
		updateOtherUser(params){
			return Util.post('info/updateThridParty', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('修改成功！');
					return result
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		},
		removeOtherUser(params){
			return Util.get('info/deleteThirdParty', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('删除成功！');
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		}
	}
}