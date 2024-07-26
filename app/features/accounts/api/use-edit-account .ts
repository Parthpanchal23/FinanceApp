import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.accounts)[":id"]["$patch"]
>["json"];

export const useEditAccount = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      if (!json || json == undefined) {
        toast.error("Request payload (json) is undefined or null.");
      }
      try {
        const response = await client.api.accounts[":id"]["$patch"]({
          param: { id },
          json,
        });
        if (!response.ok) {
          toast.error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
      } catch (error: any) {
        toast.error(
          `Error in mutationFn: ${error.message}  ${JSON.stringify(json)}`
        );
      }
    },
    onSuccess: () => {
      toast.success("Account Updated");
      queryClient.invalidateQueries({ queryKey: ["account", { id }] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error: any) => {
      console.log("error", error);
      toast.error("Failed to Updation account");
    },
  });
  return mutation;
};
