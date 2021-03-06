/**
 * jquery auto validation
 * Copyright info-g 
 * @author: agvozden
 * www.gvozden.info
 */
var checkForm = function(forma){
	var status = true;
	var dump = true;
	var addClass = true;
	var errorClass = 'is-invalid'; // has-error / require
	var addSpan = true;
	var spannClass = 'error';
	var errmsg = '';
	var errmsgelem = '#errmsg';

	$("."+errorClass, forma).removeClass(errorClass);
	$("."+spannClass, forma).remove();
	$(".error_message", forma).hide();
		
	var req_ptrn = '.required:enabled, *[required="required"], *[required=""]';
	$(req_ptrn, forma).each(function(){
		var elem = $(this);
		if (elem.is(":disabled") || elem.is(":hidden")) return;
		var minlength = Math.max(elem.attr('minlength'), 1);
		var value = elem.val();

		if (elem.attr('type')=='checkbox' && !elem.is(':checked')) value = '';
		if (elem.attr('type')=='radio' && !$('input[name="'+elem.attr('name')+'"]:checked').val()) value='';
		
		if (value===null) value = 0;
		if (value.length<minlength || value==0) {
			status = false;
			if (dump) console.log(elem.attr("name") ? elem.attr("name") : elem.attr("id"));
			if (addClass) elem.addClass(errorClass);
			title = (elem.data('errmsg')) ? elem.data('errmsg') : "";
			if (addSpan){
				elem.after('<span class="'+spannClass+'">'+title+'</span>');
			}
			if (title) errmsg += title + "\n"; 
		} else {
			if (elem.attr('type')=='email'){
				var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
				if (!filter.test(value)) {
					status = false;
					if (dump) console.log(elem.attr("name") ? elem.attr("name") : elem.attr("id"));
					if (addClass) elem.addClass(errorClass);
					title = (elem.data('errmsg')) ? elem.data('errmsg') : "";
					if (addSpan){
						elem.after('<span class="'+spannClass+'">'+title+'</span>');
					}
					if (title) errmsg += title + "\n"; 
				}
			} else			
			if (elem.attr('type')=='number'){
				var numericExpression = /^[0-9]+$/;
				if(!value.match(numericExpression)){
					status = false;
					if (dump) console.log(elem.attr("name") ? elem.attr("name") : elem.attr("id"));
					if (addClass) elem.addClass(errorClass);
					title = (elem.data('errmsg')) ? elem.data('errmsg') : "";
					if (addSpan){
						elem.after('<span class="'+spannClass+'">'+title+'</span>');
					}
					if (title) errmsg += title + "\n"; 
				}
			} else
			if (elem.attr('type')=='tel'){
				var filter = /^[0-9-+\/\ ]+$/;
				if (!filter.test(value)) {
					status = false;
					if (dump) console.log(elem.attr("name") ? elem.attr("name") : elem.attr("id"));
					if (addClass) elem.addClass(errorClass);
					title = (elem.data('errmsg')) ? elem.data('errmsg') : "";
					if (addSpan){
						elem.after('<span class="'+spannClass+'">'+title+'</span>');
					}
					if (title) errmsg += title + "\n"; 
				}
			}
			
			var minvalue = elem.attr('min'); // minvalue
			if (minvalue && (parseInt(value) < parseInt(minvalue)) ){
				status = false;
				if (dump) console.log(elem.attr("name") ? elem.attr("name") : elem.attr("id"));
				if (addClass) elem.addClass(errorClass);
				title = (elem.data('errmsg')) ? elem.data('errmsg') : "";
				if (addSpan){
					elem.after('<span class="'+spannClass+'"> min! '+title+'</span>');
				}
				if (title) errmsg += title + "\n"; 
			}
			var maxvalue = elem.attr('max');
			if (maxvalue && (parseInt(value) > parseInt(maxvalue)) ){
				status = false;
				if (dump) console.log(elem.attr("name") ? elem.attr("name") : elem.attr("id"));
				if (addClass) elem.addClass(errorClass);
				title = (elem.data('errmsg')) ? elem.data('errmsg') : "";
				if (addSpan){
					elem.after('<span class="'+spannClass+'">max! '+title+'</span>');
				}
				if (title) errmsg += title + "\n"; 
			}
			
			// check 2 way input field (password confirm, email confirm)
			if (elem.data("confirm")){
				var elemt = $("#"+elem.data("confirm"));
				var test = elemt.val();
				if (test!=value) {
					status = false;
					if (dump) console.log(elem.attr("name") ? elem.attr("name") : elem.attr("id"));
					title = (elem.data('errmsg')) ? elem.data('errmsg') : "";
					if (addClass){
						elemt.addClass(errorClass);
						elem.addClass(errorClass);
					}
					if (addSpan){
						elem.after('<span class="'+spannClass+'">max! '+title+'</span>');
					}
					if (title) errmsg += title + "\n"; 
				}
			}

			// external plug-in error (email exists check)
			if (elem.data('checkerror')){
				status = false;
				if (dump) console.log(elem.attr("name") ? elem.attr("name") : elem.attr("id"));
				if (addClass) elem.addClass(errorClass);
				title = elem.data('check_error');
				if (addSpan){
					elem.after('<span class="'+spannClass+'">'+title+'</span>');
				}				
				if (title) errmsg += title + "\n"; 
			}
				
		}
	});
	if (!status) {
		$(".error_message", forma).show();
		if (errmsgelem.length) $(errmsgelem).html(errmsg.replace(/\n/g,"<br>"));
	}
	return status;
};

$(function(){
    var requiredCheckboxes = $(':checkbox[required]');
    requiredCheckboxes.change(function(){
        if(requiredCheckboxes.is(':checked')) {
        	requiredCheckboxes.removeAttr('required');
        }
        else {
            requiredCheckboxes.attr('required', 'required');
        }
    });
});
