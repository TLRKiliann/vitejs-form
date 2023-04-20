//import React, {useState} from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";
import './FormDemo.css';

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
      phoneNumber: ["", ""], //array
      phNumber: [{ number: '' }], //object array
      age: 0,
      dob: new Date(),
    },
  });

  const { register, control, handleSubmit, formState, watch, getValues, setValue } = form;
  const { errors, touchedFields, dirtyFields } = formState;

  console.log({ touchedFields, dirtyFields })

  const { fields, append, remove } = useFieldArray({
    name: "phNumber",
    control
  });

  //watch("username")
  //watch(["username", "channel"])
  const watchValuesForm = watch();

  //e: React.FormEvent<HTMLFormElement>
  //e.prevent.default() //prevent rerendering
  //{(e) => handleSubmit(e, onSubmit)}
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

  renderCount++;
  return (
    <div>

      <h1>Render : {renderCount/2}</h1>
      <h2>watchValuesForm : {JSON.stringify(watchValuesForm)}</h2>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>

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
          <label htmlFor="channel">channel</label>
          <input type="text" id="channel" {...register("channel",
            {required:{ value: true, message: "channel is required"}})} />
          <p className="error">{errors.channel?.message}</p>
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
              <div className="form-control" key={field.id}>
                <label>Another Phone number</label>
                <input type="text" {...register(`phNumber.${index}.number` as const)} />
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    Remove phone
                  </button>
                  )
                }
              </div>
            )) 
          }
          <button type="button" onClick={() => append({ number: "" })}>
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

        <button type="submit" className="button">Submit</button>
        <button type="button" onClick={handleGetValues}className="button">handleGetValues</button>
        <button type="button" onClick={handleSetValue}className="button">handleSetValue</button>
        <DevTool control={control} />
      </form>
    </div>
  )
}

export default FormDemo;
//      <DevTool control={control} />