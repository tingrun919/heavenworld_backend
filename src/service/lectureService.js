import Util from '../libs/util';

export default {
	methods: {
		getBlessingList(params) {
			return Util.get('other/selForumList', params).then(res => {
				var result = res.data
				return result.data
			})
		},
		handleDeleteBlessing(params) {
			return Util.get('http://39.107.78.100:8080/banaworld_show/other/delOneForum', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('删除成功！');
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		},
		getDetailone(params) {
			return Util.get('other/selForumList', params).then(res => {
				var result = res.data
				return result.data
			})
		},
	}
}