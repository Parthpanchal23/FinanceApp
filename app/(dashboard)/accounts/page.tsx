"use client";
import { useNewAccount } from "@/app/features/accounts/hooks/use-new-account";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import React from "react";
import { DataTable } from "@/components/data-table";
import { columns } from "./column";
import { useGetAccounts } from "@/app/features/accounts/api/use-get-accounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkAccounts } from "@/app/features/accounts/api/use-bulk-delete";

const Accountpage = () => {
  const newAccount = useNewAccount();
  const accountQuery = useGetAccounts();
  const deleteAcconuts = useBulkAccounts();
  const accounts = accountQuery.data || [];

  const isDisabled = accountQuery.isLoading || deleteAcconuts.isPending;
  if (accountQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-20">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-20">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className=" gap-y-2 lg:flex-row lg:items-center lg:justify-between ">
          <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
          <Button size={"sm"} onClick={newAccount.onOpen}>
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <div className="container">
            <DataTable
              columns={columns}
              data={accounts}
              filterKey="status"
              onDelete={(row: any) => {
                const ids = row.map((r: any) => r.original.id);
                deleteAcconuts.mutate({ ids });
              }}
              disabled={isDisabled}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Accountpage;
