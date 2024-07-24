"use client";

import { Button } from "@/components/ui/button";
import { useNewAccount } from "../features/accounts/hooks/use-new-account";

// import { useGetAccounts } from "../features/accounts/api/use-get-accounts";

export default function Home() {
  // const { data: accounts, isLoading } = useGetAccounts();
  // if (isLoading) {
  //   return <div>loading...</div>;
  // }
  const { onOpen } = useNewAccount();
  return (
    <>
      <Button onClick={() => onOpen()}>+ Account </Button>
      <p>This is Autheticated Route</p>
      {/* <p>
        {accounts?.map((account) => (
          <div key={account.id}>{account.name}</div>
        ))}
      </p> */}
    </>
  );
}
