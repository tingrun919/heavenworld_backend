import Util from '../libs/util';

export default {
	methods: {
		getSysList(params) {
			return Util.get('info/selectSystemNotice', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					return result.data
				} else {
					this.$Message.error(result.message);
				}
			})
		},
		AddNoticeApi(params) {
			return Util.get('info/addSystemNotice', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('新增成功！');
				} else {
					this.$Message.error(result.message);
				}
			})
		},
		deleteNoticeApi(params) {
			return Util.get('info/deleteSystemNotice', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('删除成功！');
				} else {
					this.$Message.error(result.message);
				}
			})
		}
	}
}