# frozen_string_literal: true

class TasksController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
  before_action :load_task!, only: %i[show update destroy]
  before_action :ensure_authorized_update_to_restricted_attrs, only: :update

=begin
  def index
    tasks = policy_scope(Task)
    # @pending_tasks = tasks.pending.as_json(include: { assigned_user: { only: %i[name id] } })
    @pending_tasks = tasks.pending.includes(:assigned_user)
    @completed_tasks = tasks.completed
    # render_json({ tasks: tasks_with_assigned_user })
  end

  def index
    tasks = policy_scope(Task)

    pending_starred = tasks.pending.starred.includes(:assigned_user).order('updated_at DESC')
    pending_unstarred = tasks.pending.unstarred.includes(:assigned_user).order('updated_at DESC')
    @pending_tasks = pending_starred + pending_unstarred

    completed_starred = tasks.completed.starred.order('updated_at DESC')
    completed_unstarred = tasks.completed.unstarred.order('updated_at DESC')
    @completed_tasks = completed_starred + completed_unstarred
  end
=end

  def index
    tasks = policy_scope(Task)
    @pending_tasks = tasks.includes(:assigned_user).of_status(:pending)
    @completed_tasks = tasks.of_status(:completed)
  end

  def create
    task = current_user.created_tasks.new(task_params)
    authorize task
    task.save!
    render_notice(t("successfully_created", entity: "Task"))
  end

  def show
    # render_json({ task: @task, assigned_user: @task.assigned_user })
    # render
    authorize @task
    @comments = @task.comments.order("created_at DESC")
  end

  def update
    authorize @task
    @task.update!(task_params)
    render_notice(t("successfully_updated", entity: "Task")) unless params.key?(:quiet)
  end

  def destroy
    authorize @task
    @task.destroy
    render_notice(t("successfully_deleted", entity: "Task")) unless params.key?(:quiet)
  end

  private

    def load_task!
      @task = Task.find_by!(slug: params[:slug])
    end

    def task_params
      params.require(:task).permit(:title, :assigned_user_id, :progress, :status)
    end

    def ensure_authorized_update_to_restricted_attrs
      is_editing_restricted_params = Task::RESTRICTED_ATTRIBUTES.any? { |a| task_params.key?(a) }
      is_not_owner = @task.task_owner_id != @current_user.id
      if is_editing_restricted_params && is_not_owner
        handle_authorization_error
      end
    end
end
