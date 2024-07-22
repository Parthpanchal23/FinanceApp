import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <p>This is Autheticated Route</p>
      <UserButton afterSignOutUrl="/" />
    </>
  );
}
