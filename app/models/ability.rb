class Ability

  include CanCan::Ability

  def initialize(user)
    p user
    if !user
      can [:index, :show], :all
    elsif user.superadmin_role?
      can [:index, :show, :new, :create, :edit, :update, :destroy], :all
    elsif user.user_role?
      can [:index, :show, :new, :edit], :all
      can [:create, :update, :destroy], [Topic, Comment], user_id: user.id
      can [:create, :update], Comment
      can :destroy, Comment, user_id: user.id
    end
  end

end