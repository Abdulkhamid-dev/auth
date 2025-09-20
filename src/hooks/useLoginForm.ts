import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type LoginFormValues = {
  email: string;
  password: string;
};

type ApiError = {
  message: string;
};

const mockLoginApi = async (values: LoginFormValues) => {
  return new Promise<{ success: boolean }>((resolve, reject) => {
    setTimeout(() => {
      if (
        values.email === "test@mail.ru" &&
        values.password === "password123"
      ) {
        resolve({ success: true });
      } else if (values.email === "blocked@mail.ru") {
        reject({ message: "User is blocked" });
      } else {
        reject({ message: "Invalid email or password" });
      }
    }, 1200);
  });
};

export const useLoginForm = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const { mutate, isPending } = useMutation<
    { success: boolean },
    ApiError,
    LoginFormValues
  >({
    mutationFn: mockLoginApi,
    onSuccess: () => {
      navigate("/verify");
    },
    onError: (error) => {
      const message = error.message || "An unexpected error occurred.";
      setError("root.serverError", { message });
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    mutate(values);
  };

  return {
    control,
    errors,
    isValid,
    isPending,
    onSubmit: handleSubmit(onSubmit),
    serverError: errors.root?.serverError?.message,
  };
};
