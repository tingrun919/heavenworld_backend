import Util from '../libs/util';

export default {
	methods:{
		//机器人列表
		getRobotList(page){
			return Util.get('staff/selectRobot',page).then(res => {
				var result = res.data
				return result.data
			})
		},
		//增加机器人
		addRobotNumber(params){
			return Util.get('staff/addRobot',params).then(res => {
				var result = res.data
				if(result.code == 100000){
					this.$Message.success('新增成功！');
				}else{
					this.$Message.error(result.message);
				}
			})
		},
		//删除机器人
		delRobotNumber(params){
			return Util.get('staff/delSysStaff',params).then(res => {
				var result = res.data
				if(result.code == 100000){
					this.$Message.success('删除成功！');
				}else{
					this.$Message.error(result.message);
				}
			})
		},
		//修改机器人
		updateRobot(params){
			return Util.get('staff/updateRobot',params).then(res => {
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