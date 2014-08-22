/**
 * js auto validation
 * Copyright info-g 
 * @author: agvozden
 * www.gvozden.info
 */
var checkForm = function(forma){
	var status = true;
	$(".error", forma).remove();
	$(".require", forma).removeClass('require');
	$(".error_message", forma).hide();
	var addClass = true;
	var addSpan = true;
	
	var req_ptrn = ".required:enabled, *[required='required']";
	$(req_ptrn, forma).each(function(){
		var elem = $(this);
		if (elem.is(":disabled") || elem.is(":hidden")) return;
		var minlength = Math.max(elem.attr('minlength'), 1);
		var value = elem.val();

		if (elem.attr('type')=='checkbox' && !elem.is(':checked')) value = '';
		if (value.length<minlength || value==0) {
			status = false;
			if (addClass) elem.addClass("require");
			if (addSpan){
				title = (elem.data('errmsg')) ? elem.data('errmsg') : "";
				elem.after('<span class="error">'+title+'</span>');
			}
		} else {
			if (elem.attr('type')=='email'){
				var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
				if (!filter.test(value)) {
					status = false;
					if (addClass) elem.addClass("require");
					if (addSpan){
						title = (elem.data('errmsg')) ? elem.data('errmsg') : "";
						elem.after('<span class="error">'+title+'</span>');
					}
				}
			} else			
			if (elem.attr('type')=='number'){
				var numericExpression = /^[0-9]+$/;
				if(!value.match(numericExpression)){
					status = false;
					if (addClass) elem.addClass("require");
					if (addSpan){
						title = (elem.data('errmsg')) ? elem.data('errmsg') : "";
						elem.after('<span class="error">'+title+'</span>');
					}
				}
			} else
			if (elem.attr('type')=='tel'){
				var filter = /^[0-9-+\/\ ]+$/;
				if (!filter.test(value)) {
					status = false;
					if (addClass) elem.addClass("require");
					if (addSpan){
						title = (elem.data('errmsg')) ? elem.data('errmsg') : "";
						elem.after('<span class="error">'+title+'</span>');
					}
				}
			}
			
			var minvalue = elem.attr('minvalue');
			if (minvalue && (parseInt(value) < parseInt(minvalue)) ){
				status = false;
				if (addClass) elem.addClass("require");
				if (addSpan){
					title = (elem.data('errmsg')) ? elem.data('errmsg') : "";
					elem.after('<span class="error"> min! '+title+'</span>');
				}
			}
			var maxvalue = elem.attr('maxvalue');
			if (maxvalue && (parseInt(value) > parseInt(maxvalue)) ){
				status = false;
				if (addClass) elem.addClass("require");
				if (addSpan){
					title = (elem.data('errmsg')) ? elem.data('errmsg') : "";
					elem.after('<span class="error">max! '+title+'</span>');
				}
			}
			
			// check 2 way input field (password confirm, email confirm)
			if (elem.data("confirm")){
				var elemt = $("#"+elem.data("confirm"));
				var test = elemt.val();
				if (test!=value) {
					status = false;
					if (addClass) elemt.addClass("require");
					title = (elemt.attr('title')) ? elemt.attr('title') : "";
					elemt.after('<span class="error">'+title+'</span>');					
				}
			}

			// external plugin error (email exists check)
			if (elem.data('checkerror')){
				status = false;
				if (addSpan){
					title = elem.data('check_error');
					elem.after('<span class="error">'+title+'</span>');
				}				
			}
				
		}
	});
	if (!status) $(".error_message", forma).show();
	return status;
};
