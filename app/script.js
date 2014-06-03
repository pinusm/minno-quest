define([], function(){
	return {
		pages: [],
		questions:[],
		settings: {
			logger: {
				pulse: 3,
				url: 'mine/sps',
				DEBUG:true
			},
			onEnd: function(){
				location.href = location.href;
			}
		},
		sequence: [
			{
				header: 'This Royal Questionnaire of mine.',
				decline:true,
				questions: [
					{
						stem: "First question",
						required: true
					},
					{
						stem: "Second question"
					}
				]
			},
			{
				header: 'This Royal Questionnaire of mine.',
				questions: [
					{
						stem: "Third question"
					},
					{
						stem: "Fourth question"
					}
				]
			}


		]
	};
});