/**
 * js auto validation
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
	var spanClass = 'error';
	var errmsg = '';
	var errmsgelem = '#errmsg';

	forma.querySelectorAll("."+errorClass).forEach(erm => { erm.classList.remove(errorClass); });
	forma.querySelectorAll("."+spanClass).forEach(erm => { erm.parentNode.removeChild( erm ); });  
	forma.querySelectorAll(".error_message").forEach(erm => { erm.style.display = "none" })
		
	var req_ptrn = '.required:enabled, *[required="required"], *[required=""]';
	
	forma.querySelectorAll(req_ptrn).forEach( elem => {

		// var elem = document.querySelector(this);
		// if (elem.is(":disabled") || elem.is(":hidden")) return;
		if (elem.getAttribute("disabled") || window.getComputedStyle(elem).display === "none" || window.getComputedStyle(elem).visibility === "hidden") return;

		var minlength = Math.max(elem.getAttribute('minlength'), 1);
		var value = elem.value;

		if (elem.getAttribute('type')=='checkbox' && !elem.checked) value = '';
		if (elem.getAttribute('type')=='radio' && !document.querySelector('input[name="'+elem.getAttribute('name')+'"]:checked').value) value='';
		
		//if (value===null) value = 0;
		//if (value.length < minlength || value==0) {
		if (value===null || value==='' || value.length < minlength) {			
			status = false;
			if (dump) console.log(elem.getAttribute("name") ? elem.getAttribute("name") : elem.getAttribute("id"));
			if (addClass) elem.classList.add(errorClass);
			title = (elem.getAttribute('data-errmsg')) ? elem.getAttribute('data-errmsg') : "";
			if (addSpan){
				var span = document.createElement('span');
				span.className = spanClass;
				span.innerHTML = title;
				elem.after(span);
			}
			if (title) errmsg += title + "\n";
		} else {
			if (elem.getAttribute('type')=='email'){
				var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
				if (!filter.test(value)) {
					status = false;
					if (dump) console.log(elem.getAttribute("name") ? elem.getAttribute("name") : elem.getAttribute("id"));
					if (addClass) elem.classList.add(errorClass);
					title = (elem.getAttribute('data-errmsg')) ? elem.getAttribute('data-errmsg') : "";
					if (addSpan){
						var span = document.createElement('span');
						span.className = spanClass;
						span.innerHTML = title;
						elem.after(span);
					}
					if (title) errmsg += title + "\n";
				}
			} else
			if (elem.getAttribute('type')=='number'){
				var numericExpression = /^[0-9]+$/;
				if(!value.match(numericExpression)){
					status = false;
					if (dump) console.log(elem.getAttribute("name") ? elem.getAttribute("name") : elem.getAttribute("id"));
					if (addClass) elem.classList.add(errorClass);
					title = (elem.getAttribute('data-errmsg')) ? elem.getAttribute('data-errmsg') : "";
					if (addSpan){
						var span = document.createElement('span');
						span.className = spanClass;
						span.innerHTML = title;
						elem.after(span);
					}
					if (title) errmsg += title + "\n";
				}
			} else
			if (elem.getAttribute('type')=='tel'){
				var filter = /^[0-9-+\/\ ]+$/;
				if (!filter.test(value)) {
					status = false;
					if (dump) console.log(elem.getAttribute("name") ? elem.getAttribute("name") : elem.getAttribute("id"));
					if (addClass) elem.classList.add(errorClass);
					title = (elem.getAttribute('data-errmsg')) ? elem.getAttribute('data-errmsg') : "";
					if (addSpan){
						var span = document.createElement('span');
						span.className = spanClass;
						span.innerHTML = title;
						elem.after(span);
					}
					if (title) errmsg += title + "\n";
				}
			}

			var minvalue = elem.getAttribute('minvalue');
			if (minvalue && (parseInt(value) < parseInt(minvalue)) ){
				status = false;
				if (dump) console.log(elem.getAttribute("name") ? elem.getAttribute("name") : elem.getAttribute("id"));
				if (addClass) elem.classList.add(errorClass);
				title = (elem.getAttribute('data-errmsg')) ? elem.getAttribute('data-errmsg') : "";
				if (addSpan){
					var span = document.createElement('span');
					span.className = spanClass;
					span.innerHTML = 'min! '+title;
					elem.after(span);
			}
				if (title) errmsg += title + "\n";
			}
			var maxvalue = elem.getAttribute('maxvalue');
			if (maxvalue && (parseInt(value) > parseInt(maxvalue)) ){
				status = false;
				if (dump) console.log(elem.getAttribute("name") ? elem.getAttribute("name") : elem.getAttribute("id"));
				if (addClass) elem.classList.add(errorClass);
				title = (elem.getAttribute('data-errmsg')) ? elem.getAttribute('data-errmsg') : "";
				if (addSpan){
					var span = document.createElement('span');
					span.className = spanClass;
					span.innerHTML = 'max! '+title;
					elem.after(span);
			}
				if (title) errmsg += title + "\n";
			}

			// check 2 way input field (password confirm, email confirm)
			if (elem.getAttribute("data-confirm")){
				var elemt = document.querySelector("#"+elem.getAttribute("data-confirm"));
				var test = elemt.value;
				if (test!=value) {
					status = false;
					if (dump) console.log(elem.getAttribute("name") ? elem.getAttribute("name") : elem.getAttribute("id"));
					title = (elem.getAttribute('data-errmsg')) ? elem.getAttribute('data-errmsg') : "";
					if (addClass){
						elemt.classList.add(errorClass);
						elem.classList.add(errorClass);
					}
					if (addSpan){
						var span = document.createElement('span');
						span.className = spanClass;
						span.innerHTML = title;
						elem.after(span);
					}
					if (title) errmsg += title + "\n";
				}
			}

			// external plug-in error (email exists check)
			if (elem.getAttribute('data-checkerror')){
				status = false;
				if (dump) console.log(elem.getAttribute("name") ? elem.getAttribute("name") : elem.getAttribute("id"));
				if (addClass) elem.classList.add(errorClass);
				title = elem.getAttribute('data-check_error');
				if (addSpan){
					var span = document.createElement('span');
					span.className = spanClass;
					span.innerHTML = title;
					elem.after(span);
				}
				if (title) errmsg += title + "\n";
			}

		}
	});

	if (!status) {
		if (forma.querySelectorAll(".error_message").length){
			forma.querySelectorAll(".error_message").forEach(erm => { erm.style.display = "" })
		} else {
			document.querySelector('html, body').animate({ scrollTop: (document.querySelector('.'+errorClass).getBoundingClientRect().top - 300) }, 2000);	
		}
		if (errmsgelem.length && document.querySelector(errmsgelem)) document.querySelector(errmsgelem).innerHTML = (errmsg.replace(/\n/g,"<br>"));		
	}
	return status;
};