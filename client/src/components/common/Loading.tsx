import React from "react";

interface IProps {
  isLoading: boolean;
  error: Error | null;
}
const Loading = ({ isLoading, error }: IProps) => {
  if (isLoading && !error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }
};

export default Loading;
