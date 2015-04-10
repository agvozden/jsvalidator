/**
 * script to set checkboxes required 
 * if field checked, remove attribut required 
 */
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