import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";

type VerifyFormValues = {
  code: string;
};

const mockFetchCode = async () => {
  return new Promise<{ code: string }>((resolve) =>
    setTimeout(() => resolve({ code: "123456" }), 1000)
  );
};

const mockVerifyCode = async (code: string) => {
  const { code: serverCode } = await mockFetchCode();
  if (code === serverCode) {
    return { success: true };
  }
  throw new Error("Invalid verification code");
};

export const useVerification = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm<VerifyFormValues>({
    mode: "onChange",
    defaultValues: { code: "" },
  });

  const [timeLeft, setTimeLeft] = useState(45);
  const code = watch("code");

  const { isFetching, refetch } = useQuery({
    queryKey: ["verificationCode"],
    queryFn: mockFetchCode,
    refetchOnWindowFocus: false,
  });

  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: mockVerifyCode,
    onSuccess: () => {
      alert("✅ Code verified successfully!");
    },
    onError: (error) => {
      setError("code", {
        type: "manual",
        message: error.message,
      });
    },
  });

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleGetNewCode = async () => {
    setTimeLeft(45);
    setValue("code", "");
    await refetch();
  };

  const onSubmit = (values: VerifyFormValues) => {
    mutate(values.code);
  };

  const showVerifyButton = code && code.length === 6;
  const countdownExpired = timeLeft === 0;

  return {
    control,
    errors,
    isValid,
    isFetching,
    isSubmitting,
    showVerifyButton,
    countdownExpired,
    timeLeft,
    onSubmit: handleSubmit(onSubmit),
    handleGetNewCode,
  };
};
