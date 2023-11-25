FactoryBot.define do
  factory :dream_goal do
    goal { "MyString" }
    achieved { false }
    user { nil }
  end
end
