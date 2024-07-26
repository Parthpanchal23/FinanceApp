"use client";

import { useMountedState } from "react-use";
import NewAccountSheet from "@/app/features/accounts/componnets/new-account-sheet";
import EditAccountSheet from "@/app/features/accounts/componnets/edit-account-sheet";
export const SheetProvider = () => {
  const isMounted = useMountedState();
  if (!isMounted) return null;
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  );
};
