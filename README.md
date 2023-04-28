# vitejs-form

Vite form with best practices with React-Hook-Form

## Install

└─ $ ▶ pnpm create vite

(say yes for TypeScript)

└─ $ ▶ cd vite project

└─ $ ▶ pnpm install

└─ $ ▶ pnpm add react-hook-form

## Devtools

└─ $ ▶ pnpm add -D @hookform/devtools

Use:

```
import { DevTool } from "@hookform/devtools";

...

const { ..., control, ... } = form;

&

  ...
  <devtools constrol={control}>
</form>

just before form tag close

```

You've got a small pink square in top right screen of your browser.
Click it and it will show you the state of input from form.

---

The differents subjects of this project :

- Default Values
- Object & array values
- Dynamic fields
- Numeric & date values
- Watch, get & set field values
- Touched & dirty states
- Handle submission errors
- Form submission state
- Reset form
- Validation modes
- Manually trigger validations

## Watch

With watch, you can see fileds values from form.

## Errors (22)

```
import { useForm, useFieldArray, FieldErrors } from 'react-hook-form';

  //error (enter email but nothing into channel)
  const onError = (errors: FieldErrors<FieldValue>) => {
    console.log("Errors from rhf: ", errors)
  }

  ...

      <form className="form" onSubmit={handleSubmit(onSubmit, onError)} noValidate>

        <p className="error">{errors.username?.message}</p>
```

## Disabled (23)

Submit button doesn't work, if fields with "requiered" are empty.

```
	const { ... , isValid } = formState;
	
	console.log({ ... , isValid })


        <button disabled={!isDirty || !isValid} type="submit" className="button">
          Submit
        </button>
```

## Form Submission State (24)

isSubmitting is the most useful ! 
isSubmitting is true by default value & before to submit form. After submitted form, value pass to false.

```
        <button disabled={!isDirty || !isValid || isSubmitting} type="submit" className="button">
          Submit
        </button>
```

isSubmitted is false by default value & before to submit form. After submitted form value pass to true.
isSubmitSuccessful run successful after sumbmitted, without any runtime errors & return true. Otherwise, it return false.
submitCount initialy is 0. Every time that you press btn submit, the submitCount increase by 1.

```
  const { ... , isSubmitting, isSubmitted, isSubmitSuccessful, submitCount } = formState;

  console.log({isSubmitting, isSubmitted, isSubmitSuccessful, submitCount});
```

## Reset Form (25)

Rest all values to default form values.

```
<button type="button" onCick={() => reset()}>Reset</button>
```

It's possible to combine isSubmitSuccessful & reset method with useEffect hook.

```
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset]);
```

## mode : onBlur - onTouched - onChange - all - onSubmit (27)

```
const FormDemo = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      phoneNumber: ["", ""],
      phNumber: [{ number: '' }],
      age: 0,
      dob: new Date(),
    },
    mode: "onBlur",
  });
```

Unclick & error appear.

    mode: "onBlur",
    mode: "onTouched",
    mode: "onChange", (make some warning with performances)
    mode: "all", (when we are changing the filed of input)

## trigger (28)

```
...
    mode: "onSubmit",
...

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger} = form;

...

<button type="button" onCick={() => trigger()}>Trigger</button>
```
Or especify for one field:

```
<button type="button" onCick={() => trigger("channel")}>Trigger</button>
```

## Yup (YupComponent.tsx) - 29

Schema validation library

└─ $ ▶ pnpm i yup @hookform/resolvers

Look at the YupComponent

```
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Email format is not valid").required("Email is required"),
  channel: yup.string().required("Channel is required")
});

type FormValues = {
  username: string;
  email: string;
  channel: string;
}

const YupComponent = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: yupResolver(schema)
  });
  ...

```

## Zod (ZodComponent.tsx) - 30

TypeScript Schema declaration & validation library

└─ $ ▶ pnpm i zod

Look at the ZodComponent

```
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import './styles.css';

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z.string().nonempty("Email is required").email("Email format is not valid"),
  channel: z.string().nonempty("Channel is required")
});

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const ZodComponent = () => {

  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: ""
    },
    resolver: zodResolver(schema)
  });
  ...
```

Last video (31) about react-hook-form of Vishwas is about Mui.

Thanks you Vishwas !

