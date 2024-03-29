import { useMutation } from "@apollo/client";
import { Button, Label, TextInput } from "flowbite-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { handleError } from "../lib/handleError";
import { BUY_POINTS, GET_POINT_REQUEST } from "../lib/query";

type Inputs = {
  points: number;
  phone: string;
  trxId: string;
  price: number;
};

export default function BuyPointForm() {
  const [buyPoints, { loading }] = useMutation(BUY_POINTS);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.price = Number(data.price) || 1;
    data.points = Math.abs(data.price * 10);
    data.phone = data.phone.includes("+88") ? data.phone : `+88${data.phone}`;

    toast.promise(
      buyPoints({
        variables: {
          createPointInput: {
            phone: data.phone,
            price: data.price,
            trxId: data.trxId,
          },
        },
        refetchQueries: [{ query: GET_POINT_REQUEST }],
        onCompleted: () => {
          reset();
          navigate(-1);
        },
      }),
      {
        loading: "Sending...",
        success: ({ data }) => data.createPoint.message,
        error: (error) => handleError(error),
      },
    );
  };

  return (
    <form
      className="mt-4 flex max-w-md flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="points" value="Your Price" />
        </div>
        <div className="flex items-center gap-4">
          <Controller
            name="price"
            control={control}
            render={({ field }) => {
              const { onChange, value } = field;
              return (
                <>
                  <TextInput
                    id="price"
                    type="number"
                    placeholder="10 points for 1 taka"
                    required
                    min={1}
                    className="w-full"
                    defaultValue={1}
                    {...field}
                  />
                  =
                  <TextInput
                    id="points"
                    type="number"
                    required
                    readOnly
                    className="ml-auto w-fit text-nowrap font-semibold"
                    placeholder="10"
                    min={10}
                    onChange={onChange}
                    value={Math.abs(value * 10).toString()}
                  />
                  Points
                </>
              );
            }}
          />
        </div>
        {errors.points && (
          <span className="text-red-500">{errors.phone?.message}</span>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="phone" value="Your bKash number" />
        </div>
        <TextInput
          id="phone"
          type="tel"
          placeholder="01871590863"
          required
          {...register("phone")}
        />
        {errors.phone && (
          <span className="text-red-500">{errors.phone.message}</span>
        )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="transactionId" value="bKash transaction number" />
        </div>
        <TextInput
          id="transactionId"
          type="text"
          required
          placeholder="TrxID 123PC2D3H4"
          {...register("trxId")}
        />
        {errors.trxId && (
          <span className="text-red-500">{errors.trxId.message}</span>
        )}
      </div>
      <Button type="submit">
        {loading ? (
          <span className="flex items-center gap-4">
            <span className="loading loading-spinner loading-xs" /> Sending
          </span>
        ) : (
          "Send Request"
        )}
      </Button>
    </form>
  );
}
