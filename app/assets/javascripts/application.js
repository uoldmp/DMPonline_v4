// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require v1.js
//= require select2.min.js
//= require jquery.placeholder.js


$( document ).ready(function() {

	$(function(){
		$('.dropdown-toggle').dropdown()
	});

	$('.accordion-body').on('show', function() {
		var plus = $(this).parent().children(".accordion-heading").children(".accordion-toggle").children(".icon-plus").removeClass("icon-plus").addClass("icon-minus");
	}).on('hide', function(){
		var minus = $(this).parent().children(".accordion-heading").children(".accordion-toggle").children(".icon-minus").removeClass("icon-minus").addClass("icon-plus");
	});

	//accordion home page
	$('.accordion-home').on('show', function() {
		var plus = $(this).parent().find(".plus-laranja").removeClass("plus-laranja").addClass("minus-laranja");
	}).on('hide', function(){
		var minus = $(this).parent().find(".minus-laranja").removeClass("minus-laranja").addClass("plus-laranja");
	});

	//accordion project details page when project has more than 1 plan
	$('.accordion-project').on('show', function() {
		var plus = $(this).parent().find(".plus-laranja").removeClass("plus-laranja").addClass("minus-laranja");
	}).on('hide', function(){
		var minus = $(this).parent().find(".minus-laranja").removeClass("minus-laranja").addClass("plus-laranja");
	});

	//$('#3-or-4-splash').modal();

	$('.typeahead').select2({
		width: "element",
		allowClear: true
	});

	$(".help").popover();

	$('.has-tooltip').tooltip({
    placement: "right",
    trigger: "focus"
	});

	$(".show-edit-toggle").click(function () {
		$(".edit-project").toggle();
		$(".view-project").toggle();
	});

	$(".toggle-existing-user-access").change(function(){
		$(this).closest("form").submit();
	});

	$("#user_email.text_field.reg-input").blur(function () {
		if (validateEmail($(this).val())) {
			$(this).parent().children("div").hide();
		}
		else {
			$(this).parent().children("div").show();
		}
	});

	$("#user_password.text_field.reg-input").blur(function () {
		if ($(this).val().length >= 8) {
			$(this).parent().children("div").hide();
		}
		else {
			$(this).parent().children("div").show();
		}
	});

	$("#user_password_confirmation.text_field.reg-input").blur(function () {
		if ($(this).val() == $("#user_password.text_field.reg-input").val()) {
			$(this).parent().children("div").hide();
		}
		else {
			$(this).parent().children("div").show();
		}
	});

	$('#user_organisation_id').on("change", function(e) {
		e.preventDefault();
		var selected_org = $(this).select2("val");
		var other_orgs = $("#other-organisation-name").attr("data-orgs").split(",");
		var index = $.inArray(selected_org, other_orgs);
		if (index > -1) {
			$("#other-organisation-name").show();
			$("#user_other_organisation").focus();
		}
		else {
			$("#other-organisation-name").hide();
		}
	});

	$("#other-org-link > a").click(function(e){
		e.preventDefault();
		var other_org = $("#other-organisation-name").attr("data-orgs").split(",");
		$("#user_organisation_id").select2("val", other_org);
		$("#other-org-link").hide();
		$("#user_organisation_id").change();
	});

	/*$('#continue-to-new').click(function(e){
		var destination = $(this).attr("href");
		var n = destination.lastIndexOf('=');
		destination = decodeURIComponent(destination.substring(n + 1));
		$.post('splash_logs', {destination: destination} );
		$("#3-or-4-splash").modal('hide');
		return false;
	});*/

});

function validateEmail(sEmail) {
  var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
  if (filter.test(sEmail)) {
    return true;
  }
  else {
    return false;
  }
}
