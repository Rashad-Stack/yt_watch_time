import { useMutation } from "@apollo/client";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { handleError } from "../lib/handleError";
import { GET_SESSION, LOGIN } from "../lib/query";

type Inputs = {
  email: string;
  password: string;
  remember: boolean;
};

const email =
  document.cookie.includes("email") &&
  document.cookie.split(";")[0].split("=")[1];
const password =
  document.cookie.includes("pwd") &&
  document.cookie.split(";")[1].split("=")[1];

const initialState = {
  email: email || "",
  password: password || "",
  remember: false,
};

export default function Login() {
  const { setUser } = useAuth();
  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: () => setUser(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: initialState });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    toast.promise(
      login({
        variables: {
          loginInput: {
            email: data.email,
            password: data.password,
          },
        },
        refetchQueries: [{ query: GET_SESSION }],
        onQueryUpdated: () => {
          const dialog = document.getElementById(
            "authForm",
          ) as HTMLDialogElement;
          dialog.close();
        },
      }),
      {
        loading: "Logging in...",
        success: ({ data }) => data.login,
        error: (error) => handleError(error),
      },
    );

    if (data.remember) {
      document.cookie = `email=${data.email};path=${import.meta.env.VITE_WEB_URL}`;
      document.cookie = `pwd=${data.password};path=${import.meta.env.VITE_WEB_URL}`;
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput
          id="email"
          type="email"
          placeholder="name@flowbite.com"
          required
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput
          id="password"
          type="password"
          required
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" {...register("remember")} />
        <Label htmlFor="remember">Remember me</Label>
      </div>
      <Button type="submit">
        {loading ? (
          <span className="flex items-center gap-4">
            <span className="loading loading-spinner loading-xs" /> Loading
          </span>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
}
