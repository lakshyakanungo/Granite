# frozen_string_literal: true

class Preference < ApplicationRecord
  belongs_to :user

  validates :notification_delivery_hour, presence: true,
    numericality: { only_integer: true },
    inclusion: {
      in: 0..23,
      message: t("preference.notification_delivery_hour.range")
    }
end
