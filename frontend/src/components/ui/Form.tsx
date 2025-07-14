// Libraries
import * as React from 'react';
import * as RHF from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export interface UseFormProps<
  S extends z.ZodTypeAny,
  TContext = any
> extends Omit<
    RHF.UseFormProps<z.infer<S> & RHF.FieldValues, TContext>,
    'resolver'
  > {
  schema: S;
  onSubmit: (
    values: z.infer<S> & RHF.FieldValues,
    form: RHF.UseFormReturn<z.infer<S> & RHF.FieldValues, TContext>
  ) => Promise<void>;
  defaultValues?: RHF.UseFormProps<z.infer<S> & RHF.FieldValues>['defaultValues'] &
    Record<string, any>;
}

export const useForm = <S extends z.ZodTypeAny>({
  schema,
  onSubmit,
  defaultValues,
  ...props
}: UseFormProps<S>) => {
  const form = RHF.useForm<z.infer<S> & RHF.FieldValues>({
    ...props,
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmitHandler = React.useCallback(async () => {
    await form.handleSubmit(async (values) => {
      try {
        await onSubmit(values, form);
      } catch (error) {
        console.error(
          'Something went wrong. If this error persists please contact administrator.'
        );
        return;
      }
    })();
  }, [onSubmit, form]);

  return { ...form, onSubmit: onSubmitHandler };
};

const formSubmitContext = React.createContext<{
  onSubmit: () => Promise<void>;
}>({
  onSubmit: () => Promise.resolve(),
});

export const useFormSubmit = () => {
  return React.useContext(formSubmitContext).onSubmit;
};

export interface FormProps<S extends z.ZodTypeAny> extends UseFormProps<S> {
  children:
    | React.ReactNode
    | ((
        form: RHF.UseFormReturn<z.infer<S> & RHF.FieldValues> & {
          onSubmit: () => Promise<void>;
        }
      ) => React.ReactNode);
}

const Form = <S extends z.ZodTypeAny>({ children, ...props }: FormProps<S>) => {
  const { onSubmit, ...form } = useForm(props);

  return (
    <RHF.FormProvider {...form}>
      <formSubmitContext.Provider value={{ onSubmit }}>
        {typeof children === 'function'
          ? children({ ...form, onSubmit })
          : children}
      </formSubmitContext.Provider>
    </RHF.FormProvider>
  );
};

export default Form;
