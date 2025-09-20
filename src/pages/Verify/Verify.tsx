import React from "react";
import { Controller } from "react-hook-form";
import { Input, Button, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Logo from "../../assets/Logo.svg";
import { useVerification } from "../../hooks/useVerification";
import { useNavigate } from "react-router-dom";

const Verify: React.FC = () => {
  const navigate = useNavigate();
  const {
    control,
    errors,
    isValid,
    isFetching,
    isSubmitting,
    showVerifyButton,
    countdownExpired,
    timeLeft,
    onSubmit,
    handleGetNewCode,
  } = useVerification();

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#F5F5F5]">
      <div className="w-full max-w-[440px] bg-white p-8 rounded-xl shadow-md">
        <div className="w-full py-[20px] flex">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/")}
          />
          <img src={Logo} alt="logo" className="m-auto" />
        </div>

        <div className="flex flex-col items-center mb-6">
          <h2 className="mx-auto text-[28px] font-semibold text-center">
            Two-Factor Authentication
          </h2>
          <p className="mt-2 text-gray-500 text-center">
            Enter the 6-digit code from the Google Authenticator app
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <Controller
            name="code"
            control={control}
            rules={{
              required: "Please enter verification code",
              minLength: { value: 6, message: "Code must be 6 digits" },
              maxLength: { value: 6, message: "Code must be 6 digits" },
            }}
            render={({ field }) => (
              <div>
                <Input.OTP
                  {...field}
                  length={6}
                  size="large"
                  status={errors.code ? "error" : ""}
                />
                {errors.code && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.code.message}
                  </p>
                )}
              </div>
            )}
          />

          {isFetching || isSubmitting ? (
            <div className="flex justify-center mt-2">
              <Spin />
            </div>
          ) : showVerifyButton ? (
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full bg-blue-500 hover:bg-blue-600"
              disabled={!isValid || isSubmitting}
            >
              Continue
            </Button>
          ) : countdownExpired ? (
            <Button
              type="default"
              onClick={handleGetNewCode}
              size="large"
              className="w-full"
            >
              Get New Code
            </Button>
          ) : (
            <p className="text-center text-gray-500">
              Get a new code in:{" "}
              <span className="font-mono">{`00:${
                timeLeft < 10 ? `0${timeLeft}` : timeLeft
              }`}</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Verify;
