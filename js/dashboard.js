var Dashboard = {

	display_user_data : function() {
		$('#username').text(Service.user_profile.value.fbname);
		Service.get_user_coins(Service.user_profile.value.id,'Dashboard.print_user_coins();');
	},

	print_user_coins : function() {
		$('#fantacoins-number').text(Service.user_coins);
	}
};