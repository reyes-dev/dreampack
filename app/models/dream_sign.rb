class DreamSign < ApplicationRecord
 validates :phrase, presence: true, uniqueness: true 
end
