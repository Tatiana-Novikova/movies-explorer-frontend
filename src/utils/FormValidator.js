import React from 'react';

export const useValidation = (value, validations) => {
  const [isInputValid, setIsInputValid] = React.useState(false);
  const [isNameValid, setIsNameValid] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmailValid':
          const reForEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
          if (reForEmail.test(String(value).toLowerCase())) {
            setIsEmailValid(true);
            setErrorMessage('');
          } else {
            setIsEmailValid(false);
            setErrorMessage('Неправильный формат почты');
          };
          break;
        case 'isNameValid':
          const reForName = /^[А-Яа-я/A-Za-z -]+$/;
          if (!reForName.test(String(value))) {
            setIsEmailValid(false);
            setErrorMessage('Используйте только латиницу, кириллицу, дефис и пробел');
          } else {
            setIsEmailValid(true);
            setErrorMessage('');
          };
          break;
        case 'isPasswordValid':
          if (value.length < 6) {
            setIsPasswordValid(false);
            setErrorMessage('Пароль должен включать не менее 6 символов');
          } else {
            setIsPasswordValid(true);
            setErrorMessage('');
          };
          break;
        default:
          setIsNameValid(false);
          setIsEmailValid(false);
          setIsPasswordValid(false);
      }
    }
  }, [value])

  React.useEffect(() => {
    if (isNameValid || isEmailValid || isPasswordValid) {
      setIsInputValid(true);
    } else {
      setIsInputValid(false);
    }
  }, [isNameValid, isEmailValid, isPasswordValid])

  return {
    isInputValid,
    isNameValid,
    isEmailValid,
    isPasswordValid,
    errorMessage,
  }
}

export const useInput = (initialValue, validations) => {
  const [isDirty, setIsDirty] = React.useState(false);
  const [value, setValue] = React.useState(initialValue);
  const valid = useValidation(value, validations);

    const onChange = (e) => {
      setValue(e.target.value);
    }

    const onFocus = (e) => {
      setIsDirty(true);
    }
  
  return {
    value,
    onChange,
    onFocus,
    isDirty,
    ...valid
  }
}
