import { useMutation } from "@apollo/client";
import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { handleError } from "../lib/handleError";
import { GET_VIDEOS, POST_VIDEO } from "../lib/query";

type Props = {
  setVideoUrl: React.Dispatch<React.SetStateAction<string>>;
  videoLength: boolean;
};

type Inputs = {
  title: string;
  url: string;
};

export default function AddVideoForm({ setVideoUrl, videoLength }: Props) {
  const [addVideo, { loading }] = useMutation(POST_VIDEO);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const urls = ["youtu.be", "youtube"];

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    toast.promise(
      addVideo({
        variables: {
          createVideoInput: data,
        },
        refetchQueries: [{ query: GET_VIDEOS }],
        onCompleted: () => {
          reset();
          setVideoUrl("");
          navigate(-1);
        },
      }),
      {
        loading: "adding...",
        success: ({ data }) => data.createVideo.message,
        error: (error) => handleError(error),
      },
    );
  };

  return (
    <form
      className="mt-6 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your video title" />
        </div>
        <TextInput
          id="title"
          type="text"
          required
          {...register("title", {
            required: true,
            minLength: 5,
            maxLength: 200,
          })}
          placeholder="Example tips for React beginners"
        />
        {errors.title && (
          <span className="text-red-500">{errors.title?.message}</span>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="url" value="Your video url" />
        </div>
        <Controller
          name="url"
          control={control}
          rules={{
            required: true,
            validate: (value) => {
              if (!videoLength) return "video length is too short!";
              return (
                urls.some((url) => value.includes(url)) || "Invalid youtube URL"
              );
            },
          }}
          render={({ field }) => {
            const { onChange, value } = field;
            return (
              <TextInput
                id="url"
                type="text"
                placeholder="www.youtube.com/watch?v=y8bRLf3SFBI"
                required
                {...field}
                onChange={(e) => {
                  setVideoUrl(e.target.value);
                  onChange(e);
                }}
                value={value}
              />
            );
          }}
        />
        {errors.url && (
          <span className="text-red-500">{errors.url?.message}</span>
        )}
      </div>
      <Button type="submit">
        {loading ? (
          <span className="flex items-center gap-4">
            <span className="loading loading-spinner loading-xs" /> Loading
          </span>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}
