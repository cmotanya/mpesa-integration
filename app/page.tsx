import { Suspense } from "react";
import FoodMenuOrder from "./menu/page";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center gap-4">
            <span className="border-secondary size-12 animate-spin rounded-full border-4 border-t-transparent" />
            <p className="text-text/80 font-bold uppercase">Loading menu...</p>
          </div>
        }
      >
        <FoodMenuOrder />
      </Suspense>
    </main>
  );
}
