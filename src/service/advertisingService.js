import Util from '../libs/util';

export default {
	methods: {
		//查询广告列表
		getAdvertisingList() {
			return Util.get('info/selPanoNotice').then(res => {
				var result = res.data
				return result.data[0]
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
		}
	}
}