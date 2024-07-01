// not-found.tsx
import React from "react";

const NotFound = () => {
  return (
    <section className="relative z-10 container h-[636px] bg-bcenter rounded-lg overflow-y-auto shadow-sm mt-12 p-6 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-lg">The page you are looking for does not exist.</p>
      </div>
    </section>
  );
};

export default NotFound;
