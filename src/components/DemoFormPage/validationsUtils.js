export const required = value => (value ? undefined:'required');

export const email = value => {
  const validEmail = value.match(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return validEmail ? undefined : 'email';
};

export const password = value => {
  const validPassword = value.match(/[0-9]/) && value.match(/[A-z]/);
  return validPassword ? undefined : 'password';
};


