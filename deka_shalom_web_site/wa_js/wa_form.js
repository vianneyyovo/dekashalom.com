



///formulaires
wa$().ready(function() {

	var prefix_wa_form = "wa-form-";

	var forms = wa$("form[id^='"+prefix_wa_form+"']")
	wa$.each(forms, function( index, value ) {
		var form = wa$(value)
	    form.validate({
	        submitHandler: function(form) 
	        {
				if (wa$(form).data("busy"))
				{
					return false;
				}

				wa$(form).data("busy",true);
				var id = wa$(form).attr('id');
				var waId = id.substring(prefix_wa_form.length)
				
				var wa_post_url = wa$(form).attr('action');
				if (wa_post_url === undefined)
				{
					wa_post_url = WaJsVariable.form_post_url;//
				}
			



					
				wa_post_url = wa_post_url.replace("{{waId}}", waId);


				if (WaContext.preview)
				{
										
					WaGui.alert(WaTranslator.tr("Feature no available in preview"));
					wa$(form).data("busy",false);
					return;
				}
				wa$.ajax({type:"POST", data: wa$(form).serialize()+"&lng="+WaPageContext.lang+"&message_error_recaptcha="+encodeURI(WaTranslator.tr("Recaptcha not validated !")), url:wa_post_url, 
								success: function(code_html, statut)
								{
									var json = code_html;

									if (json.success==undefined)
									{
										json = JSON.parse(code_html); 
									}
									if (json.success==true)
									{
										wa$(form).find('input:text, input:password, input:file, select, textarea').val('');
										wa$(form).find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
						
										if (json.success_message.length>0)
										{
											WaGui.alert(json.success_message);	
										}
										else
										{
											WaGui.alert(WaTranslator.tr("Form successfully sended !"));	
										}
										
									}
									else
									{
										WaGui.alert(json.error)
										//WaGui.alert("json.code_html="+code_html)


									}
									wa$(form).data("busy",false);
									
								},
		                        error: function(resultat, statut, erreur)
								{
					        		WaGui.alert('Error during send form...');
					        		wa$(form).data("busy",false);
							
								},
								complete : function(resultat, statut)
								{
									//alert('complete')
									wa$(form).data("busy",false);
			       				}
				});				
				
				return false;
	        }
	    });
	});

});
/////
