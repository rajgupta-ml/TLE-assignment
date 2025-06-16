import React from "react";

const Error = ({ error }: { error: Error | null }) => {
  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }
};

export default Error;
