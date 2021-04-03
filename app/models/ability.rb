class Ability

  include CanCan::Ability

  def initialize(user)
    if !user
      can [:index, :show], :all
    elsif user
      can [:new, :create, :edit, :update, :destroy], Topic do |topic|
        topic.user_id.include? @user.id
      end
      can [:new, :create, :edit, :update, :destroy], Comment do |comment|
        comment.user_id.include? @user.id
      end
    elsif user.superadmin_role?
      can [:index, :show, :new, :create, :edit, :update, :destroy], :all
    end
  end

end