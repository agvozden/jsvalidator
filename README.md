jsvalidator
===========

simple js validator
use required attribute in input fields, like:

`input`
	`type=”text, email, number, tel, password, checkbox”`
	`required=”required” / class=”required”`
	`minvalue=”min_value” maxvalue=”max_value”`
	`data-confirm=”ref_field_id”`

create call:

`var checkinform = document.getElementById('check-in-form');`
`if (checkForm(checkinform)) checkinform.submit();`

create jQuery call:

`$().ready(function() {`
	`$("form").submit(function() {`
		`return checkForm($(this));`
	`});`
`});`