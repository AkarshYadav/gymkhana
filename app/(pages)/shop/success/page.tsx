import { Suspense } from "react";
import SuccessComponent from "./SuccessComponent"; // Import the client component

export default function SuccessPage() {
  return (
    <div>
      {/* Suspense ensures that the component using `useSearchParams()` loads properly */}
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessComponent />
      </Suspense>
    </div>
  );
}
