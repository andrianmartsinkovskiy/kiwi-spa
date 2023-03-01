import * as Yup from "yup";



export const registerLegalEntitySchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(2)
    .max(80),
  password: Yup.string()
    .required()
    .min(6)
    .max(30),
  confirmPassword: Yup.string()
    .required()
    .min(6)
    .max(80)
    .test(
      'equal',
      'Passwords do not match!',
      function(confirmed) { // Don't use arrow functions
        const pass = Yup.ref('password');
        return confirmed === this.resolve(pass);
      }
    ),
  file: Yup.mixed().required(),
});
