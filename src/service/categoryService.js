import Util from '../libs/util';

export default {
	methods: {
		//全景类型列表
		getPanoramicCategoryList(params) {
			return Util.get('pano/panoType', params).then(res => {
				var result = res.data
				return result.data
			})
		},
		//新增全景类型
		AddCategoryPanoramicApi(params) {
			return Util.get('pano/addPanoType', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('新增成功！');
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		},
		//删除全景类型
		DeleteCategoryPanoramicApi(params) {
			return Util.get('pano/deletePanoType', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('删除成功！');
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		},
		//修改全景类型
		UpdateCategoryPanoramicApi(params) {
			return Util.get('pano/updatePanoType', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('修改成功！');
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		},
		//资讯类型列表
		getInformationCategoryList(params) {
			return Util.get('info/selectInformationTypeList', params).then(res => {
				var result = res.data
				return result.data
			})
		},
		//新增资讯类型
		AddCategoryInformationApi(params) {
			return Util.get('info/addInformationType', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('新增成功！');
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		},
		//删除资讯类型
		DeleteCategoryInformationApi(params) {
			return Util.get('info/deleteInformationType', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('删除成功！');
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		},
		//修改资讯类型
		UpdateCategoryInformationApi(params) {
			return Util.get('info/updateInformationType', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('修改成功！');
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		}
	}
}