# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  include ActionView::Helpers::TranslationHelper
  primary_abstract_class

  def errors_to_sentence
    errors.full_messages.to_sentence
  end
end
