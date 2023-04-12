import './FormDemo.css';

let rerender = 0;

const FormDemo = () => {
  rerender++;
  return (
    <form className="form">

      <h1>rerendering : {rerender/2}</h1>

      <label htmlFor="username">username</label>
      <input type="text" id="username" name="username" />

      <label htmlFor="email">e-mail</label>
      <input type="email" id="email" name="email" />

      <label htmlFor="channel">channel</label>
      <input type="text" id="channel" name="channel" />

      <button className="button">Submit</button>

    </form>
  )
}

export default FormDemo;