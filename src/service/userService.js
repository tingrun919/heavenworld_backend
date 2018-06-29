import Util from '../libs/util';

export default {
	methods:{
		getUserList(params){
			return Util.get('staff/selectSysStaff',params).then(res => {
				var result = res.data
				if(result.code == 100000){
					return result.data
				}else{
					this.$Message.error(result.message);
				}
			})
		},
		updateUserState(params){
			return Util.post('staff/updateSysStaffToIsEffective', params).then(res => {
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
		removeUser(params) {
			return Util.get('staff/delSysStaff', params).then(res => {
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