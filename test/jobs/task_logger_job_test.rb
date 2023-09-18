# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class TaskLoggerJobTest < ActiveJob::TestCase
  def setup
    @task = create(:task)
  end

  def test_logger_runs_once_after_creating_a_new_task
    assert_enqueued_with(job: TaskLoggerJob, args: [@task])
    perform_enqueued_jobs
    assert_performed_jobs 1
  end

  def test_log_count_increments_on_running_task_logger
    Sidekiq::Testing.inline!
    assert_difference "Log.count", 1 do
      TaskLoggerJob.new.perform(@task)
    end
  end
end
