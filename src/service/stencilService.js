import Util from '../libs/util';

export default {
	methods: {
		getPanoramicStencil(params) {
			return Util.get('krpano/selTemplet', params).then(res => {
				var result = res.data
				return result.data
			})
		},
		handleDeleteBlessing(params) {
			return Util.get('krpano/delTemplet', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('删除成功！');
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		},
		handleAddstencil(params) {
			return Util.get('krpano/addTemplet', params).then(res => {
				var result = res.data
				return result.data
			})
		},
	}
}