import Util from '../libs/util';

export default {
	methods: {
		//节日列表
		getFestivalList(params) {
			return Util.get('other/holidayList', params).then(res => {
				var result = res.data
				return result.data
			})
		},
		//新增节日
		AddFestivalApi(params) {
			return Util.post('other/addHoliday', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('新增成功！');
				} else {
					this.$Message.error(result.message);
				}
				return result.data
			})
		},
		//删除节日
		DeleteFestivalApi(params) {
			return Util.get('other/delHoliday', params).then(res => {
				var result = res.data
				if (result.code == 100000) {
					this.$Message.success('删除成功！');
				} else {
					this.$Message.error(result.message);
				}
			})
		},
		//查询单个节日
		getOneFestivalApi(params){
			return Util.get('other/holidayOne',params).then(res => {
				var result = res.data
				return result.data
			})
		},
		//修改节日
		updateFestivalApi(params){
			return Util.post('other/upHoliday',params).then(res => {
				var result = res.data
				if(result.code == 100000){
					this.$Message.success('保存成功！');
				}else{
					this.$Message.error(result.message);
				}
			})
		}
	}
}