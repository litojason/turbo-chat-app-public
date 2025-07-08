import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui/components/ui/alert-dialog";

type RegisterSuccessDialogProps = {
  visible: boolean;
  onButtonPress: () => void;
};

export default function RegisterSuccessDialog({
  visible,
  onButtonPress,
}: RegisterSuccessDialogProps) {
  return (
    <AlertDialog open={visible}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Register Successful</AlertDialogTitle>
          <AlertDialogDescription>
            Your account has been created, please login to start using our app.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction onClick={onButtonPress}>Login</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
