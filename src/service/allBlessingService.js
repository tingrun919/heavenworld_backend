import Util from '../libs/util';

export default {
	methods: {
		//查询广告列表
		getBlessingList(params) {
			return Util.get('info/selAllPray', params).then(res => {
				var result = res.data
				return result.data
			})
		},
		handleDeleteBlessing(params) {
			return Util.get('http://39.107.78.100:8080/banaworld_admin/nopano/delOnePray', params).then(res => {
			// return Util.get('http://192.168.10.196:8080/banaworld_show/nopano/delOnePray', params).then(res => {
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