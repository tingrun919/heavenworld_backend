<template>
	<div :style="styleObj">
		<Table :columns="columns" :data="cityData"></Table>
	</div>
</template>

<script>
	import homeService from '../../../service/homeService.js'

	export default {
		name: 'mapDataTable',
		mixins:[homeService],
		data() {
			return {
				columns: [
					{
						title: '标题',
						align: 'center',
						key: 'noticeName'
					},
					{
						title: '内容',
						align: 'center',
						key: 'noticeContent'
					},
					{
						title: '发布时间',
						align: 'center',
						key: 'noticeCreatetime'
					},
					{
						title: '操作',
						width: 200,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Poptip', {
									props: {
										confirm: true,
										title: '您确定要删除这条数据吗?',
										transfer: true
									},
									on: {
										'on-ok': () => {
											console.log(123)
											this.deleteNotice(params.row.noticeId)
										}
									}
								}, [
										h('Button', {
											style: {
												marginRight: '5px'
											},
											props: {
												size: 'small',
												type: 'error',
												placement: 'top'
											}
										}, '删除')
									])
							]);
						}
					}
				]
			};
		},
		props: {
			cityData: Array,
			styleObj: Object,
			height: String
		},
		methods:{
			deleteNotice(id){
				var params = {
					noticeId:id
				}
				console.log(id)
				this.deleteNoticeApi(params)
			}	
		}
	};
</script>