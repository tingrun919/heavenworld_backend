import Util from '../libs/util';

export default {
	methods:{
		//全景列表
		getPanoramicList(page){
			return Util.get('pano/selPano',page).then(res => {
				var result = res.data
				return result.data
			})
		},
		//获取类型
		getCategory(){
			return Util.get('pano/panoType').then(res => {
				var result = res.data
				return result.data
			})
		},
		//获取全景上传码
		getPanoramicCode(){
			return Util.get('krpano/picCode').then(res => {
				return res.data
			})
		},
		//生成全景
		PanoramicApi(param){
			return Util.get('krpano/makeKrpano',param).then(res => {
				return res.data
			})
		},
		getSinglePanoramic(params){
			return Util.get('pano/selPanoPFM', params).then(res => {
				var result = res.data
				return result.data
			})
		},
		addActionApi(params){
			return Util.get('pano/addpanoFunction', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('新增成功！');
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		},
		DeleteActionApi(params){
			return Util.get('pano/deletepanoFunction', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('删除成功！');
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		},
		addPersonApi(params){
			return Util.get('pano/addpanoPerson', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('新增成功！');
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		},
		DeletePersonApi(params){
			return Util.get('pano/deletepanoPerson', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('删除成功！');
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		},
		savePanoramicApi(params){
			return Util.post('krpano/updateKrpano', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('保存成功！');
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		},
		getkrpanoGetscene(params){
			return Util.get('krpano/krpanoGetscene', params).then(res => {
				var result = res.data
				return result.data
			})
		},
		getMusicList(params){
			return Util.get('pano/selpanoMusic', params).then(res => {
				var result = res.data
				return result.data
			})
		},
		handleAddcomment(params){
			return Util.post('krpano/krpanoHostpot', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('修改成功！');
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		},
		handleMusicApi(params){
			return Util.get('pano/addpanoMusic', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('保存成功！');
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		},
		handleDeleteMusicApi(params){
			return Util.get('pano/deletepanoMusic ', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('删除成功！');
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		},
		updataIfTop(params){
			return Util.get('krpano/updownKrpano', params).then(res => {
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