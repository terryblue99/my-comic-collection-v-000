module Api
  module V4
      class ApplicationController < ApplicationController::API
          skip_before_action :verify_authenticity_token # skip Cross-Site Request Forgery(csrf) token validation 
          include ActionConroller::Cookies
          protect_from_forgery with: :null_session
          respond_to :json
      end
  end
end