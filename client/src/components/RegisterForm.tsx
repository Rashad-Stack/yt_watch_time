import { useMutation } from "@apollo/client";
import { Button, Label, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { handleError } from "../lib/handleError";
import { REGISTER } from "../lib/query";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const [signUp, { loading }] = useMutation(REGISTER);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    toast.promise(
      signUp({
        variables: {
          createUserInput: {
            email: data.email,
            password: data.password,
          },
        },

        onCompleted: () => {
          reset();
          navigate(-1);
        },
      }),
      {
        loading: "Registering...",
        success: ({ data }) => data.createUser.message,
        error: (error) => handleError(error),
      },
    );
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="yourEmail" value="Your email" />
        </div>
        <TextInput
          id="yourEmail"
          type="email"
          placeholder="name@flowbite.com"
          {...register("email")}
          required
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="YourPassword" value="Your password" />
        </div>
        <TextInput
          id="YourPassword"
          type="text"
          {...register("password")}
          required
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="confirmPassword" value="Confirm password" />
        </div>
        <TextInput
          id="confirmPassword"
          type="text"
          required
          {...register("confirmPassword", {
            validate: (value, formValues) =>
              value === formValues.password || "The passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </div>

      <Button type="submit">
        {loading ? (
          <span className="flex items-center gap-4">
            <span className="loading loading-spinner loading-xs" /> Loading
          </span>
        ) : (
          "Sign up"
        )}
      </Button>
    </form>
  );
}
