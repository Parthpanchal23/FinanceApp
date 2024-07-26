import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[":id"]["$delete"]
>;

export const useDeleteAccount = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      try {
        const response = await client.api.accounts[":id"]["$delete"]({
          param: { id },
        });
        if (!response.ok) {
          toast.error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
      } catch (error: any) {
        toast.error(`Error in mutationFn: ${error.message} }`);
      }
    },
    onSuccess: () => {
      toast.success("Account Deleted");
      queryClient.invalidateQueries({ queryKey: ["account", { id }] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error: any) => {
      console.log("error", error);
      toast.error("Failed to Delete account");
    },
  });
  return mutation;
};
