# app/controllers/registrations_controller.rb
class RegistrationsController < Devise::RegistrationsController


  # POST /resource
  def create
  	if sign_up_params[:accept_terms] != "1" then
  	  redirect_to after_sign_up_error_path_for(resource), alert: 'You must accept the terms and conditions to register.'
  	else
  		existing_user = User.find_by_email(sign_up_params[:email])
  		if !existing_user.nil? then
  			if existing_user.dmponline3 && (existing_user.password == "" || existing_user.password.nil?) && existing_user.confirmed_at.nil? then
  				@user = existing_user
  				do_update(false, true)
  			else
  			    redirect_to after_sign_up_error_path_for(resource), alert: 'That email address is already registered.'
  			end
  		else
			build_resource(sign_up_params)
			if resource.save
			  if resource.active_for_authentication?
				set_flash_message :notice, :signed_up if is_navigational_format?
				sign_up(resource_name, resource)
				respond_with resource, :location => after_sign_up_path_for(resource)
			  else
				set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_navigational_format?
				expire_session_data_after_sign_in!
				respond_with resource, :location => after_inactive_sign_up_path_for(resource)
			  end
			else
			  clean_up_passwords resource
			  redirect_to after_sign_up_error_path_for(resource), alert: 'Error processing registration. Please check that you have entered a valid email address and that your chosen password is at least 8 characters long.'
			end
		end
    end
  end

 def update
 	if user_signed_in? then
		@user = User.find(current_user.id)
		
		do_update
    else
    	render(:file => File.join(Rails.root, 'public/403.html'), :status => 403, :layout => false)
    end
  end

  private

  # check if we need password to update user data
  # ie if password or email was changed
  # extend this as needed
  def needs_password?(user, params)
    user.email != params[:user][:email] ||
      params[:user][:password].present?
  end
  
  def do_update(require_password = true, confirm = false)
  	
		if require_password then
		successfully_updated = if needs_password?(@user, params)
				@user.update_with_password(params[:user])
				else
					# remove the virtual current_password attribute update_without_password
					# doesn't know how to ignore it
					params[:user].delete(:current_password)
					@user.update_without_password(params[:user])
				end
    else
    	@user.update_attributes(:password => params[:user][:password], :password_confirmation => params[:user][:password_confirmation])
    	successfully_updated = @user.update_without_password(params[:user])
    end

    if successfully_updated
		if confirm then
			@user.skip_confirmation!
			@user.save!
		end
      set_flash_message :notice, :updated
      # Sign in the user bypassing validation in case his password changed
      sign_in @user, :bypass => true
      redirect_to({:controller => "projects", :action => "index"}, {:notice => "Details successfully updated."})
    else
      render "edit"
    end
  end

end 