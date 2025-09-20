import React from "react";
import { Controller } from "react-hook-form";
import { Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Logo from "../../assets/Logo.svg";
import { useLoginForm } from "../../hooks/useLoginForm";

const Login: React.FC = () => {
  const { control, errors, isValid, isPending, onSubmit, serverError } =
    useLoginForm();

  return (
    <div className="w-full h-full flex items-center justify-center min-h-screen bg-[#F5F5F5]">
      <div className="w-full max-w-[440px] bg-white p-8 rounded-xl shadow-md">
        <div className="flex flex-col items-center mb-6">
          <div className="w-full p-[20px]">
            <img src={Logo} alt="logo" className="m-auto" />
          </div>
          <h2 className="mt-[4px] text-[28px] font-semibold text-center">
            Sign in to your account to continue
          </h2>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {serverError && (
            <p className="text-center text-red-500 text-sm">{serverError}</p>
          )}

          <Controller
            name="email"
            control={control}
            rules={{
              required: "Please enter your email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email",
              },
            }}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  size="large"
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="info@mail.com"
                  status={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: "Please enter your password" }}
            render={({ field }) => (
              <div>
                <Input.Password
                  {...field}
                  size="large"
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="**********"
                  status={errors.password ? "error" : ""}
                />
                {errors.password && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}
          />

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full bg-blue-500 hover:bg-blue-600"
            disabled={!isValid || isPending}
            loading={isPending}
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
