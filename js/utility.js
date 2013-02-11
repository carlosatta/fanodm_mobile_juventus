var utility = {
	isArray : function(obj) {
		if (!obj)
			return false;
		if ((typeof (obj) == 'object') || obj.constructor == Array)
			return true;
		return false;
	},
	inArray : function(Array, element) {
		var res = false;
		for ( var i = 0; i < Array.length; i++) {
			if (Array[i] == element) {
				res = true;
				break;
			}
		}
		return res;
	},
	addslashes : function(str) {
		str = str.replace(/\\/g, '\\\\');
		str = str.replace(/\'/g, '\\\'');
		str = str.replace(/\"/g, '\\"');
		str = str.replace(/\0/g, '\\0');
		return str;
	},
	stripslashes : function(str) {
		str = str.replace(/\\'/g, '\'');
		str = str.replace(/\\"/g, '"');
		str = str.replace(/\\0/g, '\0');
		str = str.replace(/\\\\/g, '\\');
		return str;
	},
	replaceAll : function(string, needed, replace) {

		if (utility.isArray(needed)) {
			for (i = 0; i <= needed.length; i++)
				while (string != (string = string
						.replace(needed[i], replace[i])))
					;
		} else
			while (string != (string = string.replace(needed, replace)))
				;
		return string;
	},
	urlencode : function(string) {
		string = (string + '').toString();
		return encodeURIComponent(string).replace(/!/g, '%21').replace(/'/g,
				'%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(
				/\*/g, '%2A').replace(/%20/g, '+');// .replace(/\./g, '%2E');
	}
};
