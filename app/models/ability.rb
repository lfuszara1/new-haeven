class Ability

  include CanCan::Ability

  def initialize(user)
    if !user
      can [:index, :show], :all
    elsif user.superadmin_role?
      can [:index, :show, :new, :create, :edit, :update, :destroy], :all
    elsif user
      can [:index, :show, :new, :create, :edit, :update, :destroy], Topic do |topic|
        topic.user_id.include? user.id
      end
      can [:index, :show, :new, :create, :edit, :update, :destroy], Comment do |comment|
        comment.user_id.include? user.id
      end
    end
  end

end