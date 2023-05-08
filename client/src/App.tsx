import { useEffect } from "react";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../server/src/docs/server";

//     👆 **type-only** import
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});

const main = async () => {
  // Inferred types
  const user = await trpc.userById.query("1");
  const createdUser = await trpc.userCreate.mutate({ name: "sachinraja" });
};

export default function App() {
  const makeReq = async () => {
    console.log("res");
  };

  useEffect(() => {
    makeReq();
  }, []);

  return (
    <div>
      <h1>pog</h1>
    </div>
  );
}
