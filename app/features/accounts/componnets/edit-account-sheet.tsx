import { useNewAccount } from "@/app/features/accounts/hooks/use-new-account";
import { AccountForm } from "@/app/features/accounts/componnets/account-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useOpenAccount } from "../hooks/use-open-account";
import { useGetAccount } from "../api/use-get-account";
// import { useCreateAccount } from "../api/use-create-account";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "../api/use-edit-account ";
import { useDeleteAccount } from "../api/use-delete-account ";
import { useConfirm } from "@/hooks/use-confirm";

const EditAccountSheet = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction"
  );
  const formSchema = insertAccountSchema.pick({
    name: true,
  });
  type FormVales = z.input<typeof formSchema>;
  const { id, isOpen, onClose } = useOpenAccount();
  const accountQuery = useGetAccount(id);
  // const mutation = useCreateAccount();
  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = accountQuery.isLoading;
  const onSubmit = (values: FormVales) => {
    console.log("values", values);

    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: "",
      };

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };
  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Accounts</SheetTitle>
            <SheetDescription>
              Edit existing account to track your transactions
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0  flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <AccountForm
              id={id}
              onSubmit={onSubmit}
              defaultValues={defaultValues}
              disabled={isPending}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditAccountSheet;
