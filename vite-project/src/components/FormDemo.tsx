import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";
import './FormDemo.css';

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const FormDemo = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  renderCount++;
  return (
    <div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>

        <h1>Render : {renderCount/2}</h1>

        <label htmlFor="username">username</label>
        <input type="text" id="username" {...register("username",
          {required: {
            //value: true,
            message: 'Username is required'
          }})} />
        <p className="error">{errors.username?.message}</p>

        <label htmlFor="email">e-mail</label>
        <input type="email" id="email" {...register("email",
          {pattern: {
            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: 'Invalid email format'
          }})} />
        <p className="error">{errors.email?.message}</p>

        <label htmlFor="channel">channel</label>
        <input type="text" id="channel" {...register("channel")} />
        <p className="error">{errors.channel?.message}</p>

        <button type="submit" className="button">Submit</button>

      </form>
      <DevTool control={control} />
    </div>
  )
}

export default FormDemo;