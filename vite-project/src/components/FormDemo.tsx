import { useEffect } from 'react'
import { useForm, useFieldArray, FieldErrors } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";
import './styles.css';

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  phoneNumber: string[];
  phNumber: {
    number: string
  }[];
  age: number;
  dob: Date;
};

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

  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful} = formState;

  console.log({isSubmitting, isSubmitted, isSubmitSuccessful});

  console.log({ touchedFields, dirtyFields, isDirty, isValid })

  const { fields, append, remove } = useFieldArray({
    name: "phNumber",
    control
  });

  //watch("username") or watch(["username", "channel"])
  const watchValuesForm = watch();

  //error (enter email but nothing into channel)
  const onError = (errors: FieldErrors<FieldValue>) => {
    console.log("Errors from rhf: ", errors)
  }

  //data is visible
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  //getValues(["username", "channel"]) or getValues("username").
  const handleGetValues = () => {
    console.log("getValues : ", getValues())
  };

  //setValue
  const handleSetValue = () => {
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,  
    })
  }

  console.log("date", typeof(dob))

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset]);

  renderCount++;

  return (
    <div>

      <h1>Render : {renderCount/2}</h1>
      <h2>watchValuesForm : {JSON.stringify(watchValuesForm)}</h2>

      <form className="form" onSubmit={handleSubmit(onSubmit, onError)} noValidate>

        <div className="form-control">
          <label htmlFor="username">username</label>
          <input type="text" id="username" {...register("username",
            {required: {
              //value: true,
              message: 'Username is required'
            }})} />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">e-mail</label>
          <input type="email" id="email" {...register("email",
            {pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Invalid email format'
            }})} />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">channel (enter email before access)</label>
          <input type="text" id="channel" {...register("channel",
            {
              disabled: watch("email") === "",
              required: { value: true, message: "channel is required"
            }
          })} />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel2">channel2 (disabled)</label>
          <input type="text" id="channel2" {...register("channel2",
            {
              disabled: true,
              required: "channel2 is required"
            }
          )} />
          <p className="error">{errors.channel2?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="primary-phone">Phone number</label>
          <input type="text" id="primary-phone" {...register("phoneNumber.0")} />
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">Second Phone number</label>
          <input type="text" id="secondary-phone" {...register("phoneNumber.1")} />
        </div>

        <div className="custom--number">
          {fields.map((field, index) => (
              <div className="other-control" key={field.id}>
                <label>Another Phone number</label>
                <input type="text" {...register(`phNumber.${index}.number` as const)} />
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)} className="remove--btn">
                    Remove phone
                  </button>
                  )
                }
              </div>
            )) 
          }
          <button type="button" onClick={() => append({ number: "" })} className="add--btn">
            Add phone number
          </button>
        </div>

        <div className="form-control">
          <label htmlFor="age">age</label>
          <input type="number" id="age" {...register("age",{
            valueAsNumber: true,
            required: {
              value: true,
              message: "age is required"
            }})}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date of birthday</label>
          <input type="date" id="dob" {...register("dob",{
            valueAsDate: true,
            required: {
              value: true,
              message: "dob is required"
            }})}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>

        <div className="btn--div">
          <button disabled={!isDirty || !isValid} type="submit" className="main--button">
            Submit
          </button>
        </div>

        <div className="btn--div">
          <button type="button" onCick={() => reset()} className="main--button">Reset</button>
        </div>

        <div className="btn--div">
          <button type="button" onClick={handleGetValues} className="main--button">
            handleGetValues
          </button>
        </div>

        <div className="btn--div">
          <button type="button" onClick={handleSetValue} className="main--button">
            handleSetValue
          </button>
        </div>

        <DevTool control={control} />
      </form>
    </div>
  )
}

export default FormDemo;
