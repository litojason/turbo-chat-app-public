import { ComponentProps } from "react";

import { Button } from "../ui/button";
import Loading from "../loader/loading";

interface ButtonLoadingProps extends ComponentProps<typeof Button> {
  loading?: boolean;
}

export default function ButtonLoading({
  loading,
  children,
  ...props
}: ButtonLoadingProps) {
  return (
    <Button disabled={loading} {...props}>
      {loading && <Loading />}
      {children}
    </Button>
  );
}
