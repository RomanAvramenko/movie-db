import React from "react";
import { Input } from "../UI/Input/Input";
import { reduxForm, Form, Field } from "redux-form";
import axios from "axios";
import { SubmissionError } from "redux-form";
import {
  required,
  email,
  minLength,
  confirmPass,
} from "../../utils/validators";
import { FIREBASE_URL, FIREBASE_API_KEY } from "../../constants";
import { useDispatch } from "react-redux";
import { setSignUp, userData } from "../../store/actions/auth";

const SignUpForm = (props) => {
  const { error, submitting, handleSubmit } = props;
  const dispatch = useDispatch();
  const signUp = async (values) => {
    const signUpData = {
      email: values.email,
      password: values.password,
      returnSecureToken: true,
    };
    await axios
      .post(`${FIREBASE_URL}:signUp?key=${FIREBASE_API_KEY}`, signUpData)
      .then(
        async (response) =>
          await dispatch(
            userData(
              response.data.localId,
              values.username,
              response.data.idToken
            )
          )
      )
      .then(dispatch(setSignUp(false)))
      .catch((e) => {
        if (e.response.data.error.message === "EMAIL_EXISTS") {
          throw new SubmissionError({
            username: "This email address already exists",
          });
        }
      });
  };
  return (
    <Form className="auth" onSubmit={handleSubmit(signUp)}>
      <Field
        name="username"
        type="text"
        component={Input}
        label="Username"
        validate={[required]}
      />
      <Field
        name="email"
        type="email"
        component={Input}
        label="Email"
        validate={[required, email]}
      />
      <Field
        name="password"
        type="password"
        component={Input}
        label="Password"
        validate={[required, minLength, confirmPass]}
      />
      <Field
        name="confirm"
        type="password"
        component={Input}
        label="Confirm password"
        validate={[confirmPass]}
      />
      {error && <strong className="text">{error}</strong>}
      <div>
        <button type="submit" disabled={submitting} className="button">
          Sign Up
        </button>
      </div>
    </Form>
  );
};

export default reduxForm({ form: "submitValidation" })(SignUpForm);
