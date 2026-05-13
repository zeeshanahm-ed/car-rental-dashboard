
import { useMutation } from '@tanstack/react-query';
import { login } from '../_requests';
import type { ISignInForm } from '../_models';

const useSignIn = () => {

  const { mutate: signInMutate, isError, error, isPending, isSuccess } = useMutation({
    mutationFn: (body: ISignInForm) => login(body),
  });

  return { signInMutate, isError, error, isPending, isSuccess };
}

export default useSignIn;
