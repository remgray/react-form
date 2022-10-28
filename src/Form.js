import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from 'yup';


const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input {...props} {...field} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
};
const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label>
        <input type="checkbox" {...props} {...field} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
};


const CustomForm = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        amount: 0,
        currency: '',
        text: '',
        terms: false
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, 'Minimum 2 digits.')
          .required('Required!'),
        email: Yup.string()
          .email('Incorrect email.')
          .required('Required!'),
        amount: Yup.number()
          .min(5, 'Min amount is 5.')
          .required('Required!'),
        currency: Yup.string().required('Choose currency.'),
        text: Yup.string()
          .min(10, 'Minimum 10 digits.'),
        terms: Yup.boolean()
          .required('Accept needed!')
          .oneOf([true], 'Accept needed!')
      })}
      onSubmit={values => console.log(JSON.stringify(values, null, 2))}
    >
      <Form className="form" >
        <h2>Send donation</h2>
        <MyTextInput
          label='Ваше имя'
          id="name"
          name="name"
          type="text" />
        <MyTextInput
          label='Ваша почта'
          id="email"
          name="email"
          type="email" />
        <MyTextInput
          label='Количество'
          id="amount"
          name="amount"
          type="number" />
        <label htmlFor="currency">Currency</label>
        <Field
          id="currency"
          name="currency"
          as="select"
        >
          <option value="">Select currency</option>
          <option value="USD">USD</option>
          <option value="UAH">UAH</option>
          <option value="RUB">EUR</option>
        </Field>
        <ErrorMessage className="error" name="currency" component='div' />
        <label htmlFor="text">Your message</label>
        <Field
          id="text"
          name="text"
          as="textarea"
        />
        <ErrorMessage className="error" name="text" component='div' />
        <MyCheckbox name="terms">
          TOS Agreement
        </MyCheckbox>
        <button type="submit">Send</button>
      </Form>
    </Formik>
  )
}

export default CustomForm;