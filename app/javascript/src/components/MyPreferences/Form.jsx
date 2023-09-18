import React from "react";

import classnames from "classnames";

import Button from "components/Button";
import Input from "components/Input";

const Form = ({
  notificationDeliveryHour,
  setNotificationDeliveryHour,
  shouldReceiveEmail,
  setShouldReceiveEmail,
  loading,
  updatePreference,
  updateEmailNotification,
}) => {
  const onHandleDeliveryHourChange = event => {
    const regex = /^[0-9\b]*$/;
    const deliveryHour = event.target.value;
    if (!regex.test(deliveryHour)) return null;

    return setNotificationDeliveryHour(deliveryHour);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (shouldReceiveEmail) {
      updatePreference();
    }
  };

  const handleEmailNotificationChange = e => {
    setShouldReceiveEmail(e.target.checked);

    return updateEmailNotification(e.target.checked);
  };

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <div className="flex justify-between text-bb-gray-600 mt-10 mb-2">
        <h1 className="pb-3 mt-5 text-2xl leading-5 font-bold">
          Pending Tasks in Email
        </h1>
      </div>
      <div
        className={classnames("flex  items-baseline space-x-1", {
          "text-bb-gray-700": shouldReceiveEmail,
          "text-bb-gray-600": !shouldReceiveEmail,
        })}
      >
        <input
          checked={shouldReceiveEmail}
          id="shouldReceiveEmail"
          type="checkbox"
          onChange={handleEmailNotificationChange}
        />
        <span>
          Send me a daily email of the pending tasks assigned to me.
          <br /> No email will be sent if there are no pending tasks.
        </span>
      </div>
      <div
        className={classnames("flex space-x-4 items-center", {
          "text-bb-gray-700": shouldReceiveEmail,
          "text-bb-gray-600": !shouldReceiveEmail,
        })}
      >
        <p className="text-sm font-medium mt-6 leading-5 ">
          Delivery Time (Hours)
        </p>
        <Input
          disabled={!shouldReceiveEmail}
          max={23}
          min={0}
          placeholder="Enter hour"
          type="number"
          value={notificationDeliveryHour}
          onChange={onHandleDeliveryHourChange}
        />
        <p className="mt-6 font-extrabold">(UTC)</p>
      </div>
      <div className="w-2/6">
        <Button
          buttonText="Schedule Email"
          loading={loading}
          type="submit"
          className={classnames({
            "cursor-not-allowed bg-opacity-60": !shouldReceiveEmail,
          })}
        />
      </div>
    </form>
  );
};

export default Form;
