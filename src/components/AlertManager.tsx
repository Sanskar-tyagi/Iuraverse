import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

const AlertManager = ({
  handleConfrim,
  header,
  trigger,
  description,
  body,
  title,
  cancel,
  confirm,
}: {
  handleConfrim: () => void;
  header?: string;
  trigger: any;
  description?: any;
  body?: any;
  title?: any;
  confirm?: string;
  cancel?: string;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger.type === Button ? (
          trigger
        ) : (
          <Button variant={"default"}>{trigger}</Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogHeader>
          <AlertDialogTitle>{header}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription className="text-black">
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        {typeof body === "function" ? body() : body}
        <AlertDialogFooter>
          <AlertDialogCancel>{cancel ? cancel : "No"}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleConfrim();
            }}
          >
            {confirm ? confirm : "Yes"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertManager;
