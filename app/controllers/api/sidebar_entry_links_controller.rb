class API::SidebarEntryLinksController < ApplicationController
  before_action :authenticate_user!

  def index
    entry = current_user.entries.sidebar_links
    render json: entry.to_json
  end
end
