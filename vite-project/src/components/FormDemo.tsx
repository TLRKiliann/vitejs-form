import { useForm, useFieldArray } from 'react-hook-form';
//import { DevTool } from "@hookform/devtools";
import './FormDemo.css';

//let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  phoneNumber: string[];
  phNumber: {
    number: string
  }[];
};

const FormDemo = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      phoneNumber: ["", ""],
      phNumber: [{ number: '' }]
    },
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phNumber",
    control
  })

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  //renderCount++;
  // <h1>Render : {renderCount/2}</h1>
  return (
    <div>
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
          <input type="text" id="channel" {...register("channel")} />
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

        <div>
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

        <button type="submit" className="button">Submit</button>

      </form>
    </div>
  )
}

export default FormDemo;
//      <DevTool control={control} />