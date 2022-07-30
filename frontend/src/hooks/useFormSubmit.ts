import { useCallback, FormEventHandler, useMemo } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import handleLoginPost from "../store/features/auth/thunk/handleLoginPost";
import handleRegisterPost from "../store/features/auth/thunk/handleRegisterPost";
import { ILoginType, IRegisterType, ValidationErrors } from "../store/features/auth/thunk/type";
import { useAppDispatch, RootState } from "../store/store";

type SupportFormTypes = ILoginType | IRegisterType;
type FormSubmitTypes = "login" | "register";

interface UseFormSubmitInterface {
  handleSubmit: UseFormHandleSubmit<SupportFormTypes>;
  formSubmitType: FormSubmitTypes;
}

const useFormSubmit = ({ handleSubmit, formSubmitType }: UseFormSubmitInterface) => {
  const dispatch = useAppDispatch();
  const postLogin = useCallback(
    async (body: ILoginType | IRegisterType) => {
      try {
        switch (formSubmitType) {
          case "login":
            await dispatch(handleLoginPost(body as ILoginType)).unwrap();
            break;
          default:
            await dispatch(handleRegisterPost(body as IRegisterType)).unwrap();
        }
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch, formSubmitType]
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = useMemo(() => {
    return handleSubmit(async (data) => {
      await postLogin(data);
    });
  }, [handleSubmit, postLogin]);

  return [onSubmit];
};

export default useFormSubmit;
