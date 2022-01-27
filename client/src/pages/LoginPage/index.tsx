import axios from 'axios';
import React, { useEffect, useState } from 'react';

import {
  LoginPageContainer,
  LoginPageForm,
  LoginPageFormButton,
  LoginPageFormButtonContainer,
  LoginPageInput,
} from './LoginPage.styles';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailInputChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(value);
  };

  const handlePasswordInputChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(value);
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post('http://localhost:3000/users/login', {
        email,
        password,
      })
      .then((data) => console.log(data.data));
  };

  return (
    <LoginPageContainer>
      <LoginPageForm onSubmit={handleLoginSubmit}>
        Please login
        <label>
          <LoginPageInput
            type="email"
            placeholder="email"
            value={email}
            onChange={handleEmailInputChange}
          ></LoginPageInput>
        </label>
        <label>
          <LoginPageInput
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordInputChange}
          ></LoginPageInput>
        </label>
        <LoginPageFormButtonContainer>
          <LoginPageFormButton type="submit">Login</LoginPageFormButton>
        </LoginPageFormButtonContainer>
      </LoginPageForm>
    </LoginPageContainer>
  );
};

export default LoginPage;
