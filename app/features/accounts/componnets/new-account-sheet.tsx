import { useNewAccount } from "@/app/features/accounts/hooks/use-new-account";
import { AccountForm } from "@/app/features/accounts/componnets/account-form";
import { useCreateAccount } from "@/app/features/accounts/api/use-create-account";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
const NewAccountSheet = () => {
  const formSchema = insertAccountSchema.pick({
    name: true,
  });
  type FormVales = z.input<typeof formSchema>;
  const { isOpen, onClose } = useNewAccount();

  const mutation = useCreateAccount();

  const onSubmit = (values: FormVales) => {
    console.log("values", values);

    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Accounts</SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          onDelete={() => {}}
          defaultValues={{ name: "" }}
          disabled={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
};

export default NewAccountSheet;
