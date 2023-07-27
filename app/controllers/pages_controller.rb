class PagesController < ApplicationController
  def home
    respond_to do |format|
      format.png {}
      format.js
      format.html
    end
  end
end
