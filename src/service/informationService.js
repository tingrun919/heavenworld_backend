import Util from '../libs/util';

export default {
	methods:{
		//资讯列表
		getInformationList(page){
			return Util.get('noinfo/selectInformationList',page).then(res => {
				var result = res.data
				return result.data
			})
		},
		//类型
		getCategory(){
			return Util.get('info/selectInformationTypeList').then(res => {
				var result = res.data
				return result.data
			})
		},
		//资讯详情
		getOneInformation(params){
			return Util.get('noinfo/selectOneInformationByInfoId',params).then(res => {
				var result = res.data
				return result.data
			})
		},
		//修改资讯
		updateInformation(params){
			return Util.post('info/updateInformation',params).then(res => {
				var result = res.data
				if(result.code == 100000){
					this.$Message.success('保存成功！');
				}else{
					this.$Message.error(result.message);
				}
			})
		},
		handleAddData(params){
			return Util.post('info/addInformation',params).then(res => {
				var result = res.data
				if(result.code == 100000){
					this.$Message.success('保存成功！');
				}else{
					this.$Message.error(result.message);
				}
			})
		},
		//删除评论
		removeComment(params){
			return Util.get('deleteInformationComment',params).then(res => {
				var result = res.data
				if(result.code == 100000){
					this.$Message.success('删除成功！');
				}else{
					this.$Message.error(result.message);
				}
			})
		},
		//删除资讯
		removeInfo(params){
			return Util.get('info/deleteInformation',params).then(res => {
				var result = res.data
				if(result.code == 100000){
					this.$Message.success('删除成功！');
				}else{
					this.$Message.error(result.message);
				}
			})
		},
		//是否置顶
		updataIfTop(params){
			return Util.get('info/iftopInformation',params).then(res => {
				var result = res.data
				if(result.code == 100000){
					this.$Message.success('修改成功！');
				}else{
					this.$Message.error(result.message);
				}
			})
		}
	}
}