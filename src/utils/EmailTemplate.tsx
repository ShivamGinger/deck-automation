import * as React from 'react';

interface EmailTemplateProps {
  first_name: string;
  email: string;
  password: string;
}

export const EmailTemplate = ({
  first_name,
  email,
  password,
}: EmailTemplateProps) => (
  <div>

    <h1>Welcome, {first_name}!</h1>
    <h2>Use the following credentials to access the website!</h2>
    <h3>Email: {email}</h3>
    <h3>Password: {password}</h3>
  </div>
);
