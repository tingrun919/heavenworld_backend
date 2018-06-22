import Util from '../libs/util';

export default {
	methods: {
		//模版回复列表
		getCommentModelList(page) {
			return Util.get('info/selectRobotComment', page).then(res => {
				var result = res.data
				return result.data
			})
		},
		//新增回复模版
		AddCommentApi(params) {
			return Util.get('info/addRobotComment', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('新增成功！');
				} else {
					this.$Message.error(result.message);
				}
			})
		},
		//删除回复模版
		DeleteCommentApi(params) {
			return Util.get('info/deleteRobotComment', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('删除成功！');
				} else {
					this.$Message.error(result.message);
				}
			})
		},
		//修改回复模版
		EditCommentApi(params) {
			return Util.get('info/updateRobotComment', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('修改成功！');
				} else {
					this.$Message.error(result.message);
				}
			})
		}
	}
}