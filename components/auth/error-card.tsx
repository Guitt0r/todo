import { TriangleAlertIcon } from "lucide-react";
import { CardWrapper } from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex justify-center w-full text-destructive -mt-2 -mb-4">
        <TriangleAlertIcon />
      </div>
    </CardWrapper>
  );
};
