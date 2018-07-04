import Util from '../libs/util';

export default {
	methods: {
		//查询广告列表
		getCommentList(params) {
			return Util.get('info/selAllComment', params).then(res => {
				var result = res.data
				return result.data
			})
		},
		handleSaveAdv(params){
			return Util.post('info/upPanoNotice', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('保存成功！');
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		},
		handleDeleteComment(params){
			return Util.get('info/delAllComment', params).then(res => {
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