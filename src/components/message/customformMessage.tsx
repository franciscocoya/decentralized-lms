import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CustomFormMessageProps } from "@/types";

const CustomFormMessage: React.FC<CustomFormMessageProps> = ({
  msg,
  type,
  closeable,
}) => {
    let title;
    if (type === "error") {
        title = "Error";
    } else if (type === "warning") {
        title = "Warning";
    } else if (type === "info") {
        title = "Info";
    } else {
        title = "Success";
    }

    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{msg}</AlertDescription>
        </Alert>
    );
};

export default CustomFormMessage;
