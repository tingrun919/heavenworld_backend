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
		PanoramicApi(param){
			return Util.get('krpano/makeKrpano',param).then(res => {
				return res.data
			})
		}
	}
}