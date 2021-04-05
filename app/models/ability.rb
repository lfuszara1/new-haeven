class Ability

  include CanCan::Ability

  def initialize(user)
    if !user
      can [:index, :show], :all
    elsif user.superadmin_role?
      can [:index, :show, :new, :create, :edit, :update, :destroy], :all
    elsif user
      can [:index, :show, :new, :create, :edit, :update, :destroy], Topic, user_id: user.id
      can [:index, :show, :new, :create, :edit, :update], Comment
      can [:index, :show, :new, :create, :edit, :update, :destroy], Comment, user_id: user.id
    end
  end

end