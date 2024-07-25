import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.accounts)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.accounts)["bulk-delete"]["$post"]
>["json"];

export const useBulkAccounts = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      if (!json || json == undefined) {
        toast.error("Request payload (json) is undefined or null.");
      }
      try {
        const response = await client.api.accounts["bulk-delete"]["$post"]({
          json,
        });
        if (!response.ok) {
          toast.error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
      } catch (error: any) {
        toast.error(
          `Error in deletion: ${error.message}  ${JSON.stringify(json)}`
        );
      }
    },
    onSuccess: () => {
      toast.success("Account deleted");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error: any) => {
      console.log("error", error);
      toast.error("Failed to delete account");
    },
  });
  return mutation;
};
