import Util from '../libs/util';

export default {
	methods:{
		//资讯列表
		getSearchHotWordList(params){
			return Util.get('other/searchList',params).then(res => {
				var result = res.data
				return result.data
			})
		},
		AddHotWordApi(params){
			return Util.get('other/addSearch',params).then(res => {
				var result = res.data
				return result.data
			})
		},
		RemoveHotWordApi(params){
			return Util.get('other/delSearch',params).then(res => {
				var result = res.data
				return result.data
			})	
		},
		updataHotWordApi(params){
			return Util.get('other/upSearch',params).then(res => {
				var result = res.data
				return result.data
			})	
		}
	}
}