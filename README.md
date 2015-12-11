jsvalidator
===========

simple js validator
use required attribute in input fields, like:

input
	type=”text, email, number, tel, password, checkbox”
	required=”required” / class=”required”
	minvalue=”min_value” maxvalue=”max_value”
	data-confirm=”ref_field_id”

create call:
$().ready(function() {
	$("form").submit(function() {
		return checkForm($(this));
	});
});
