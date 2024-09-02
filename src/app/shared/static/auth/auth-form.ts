export const SIGN_IN_FIELDS = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'name@email.com',
    errorMessage: 'Enter an email address.',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password.',
    errorMessage: 'Password must be 8 characters.',
  },
];
export const ROLE_DROPDOWN_FIELDS = [{name: 'role', label: 'User Type', errorMessage: 'Select a role'}];




// export const SIGNUP_FIELDS =['fname','lname','email','password','role'];

export const IMAGE_UPLOAD=[
  {
    name: 'profilePic',
    label:'Profile Image',
    type:'file',
    placeholder: '',
    accept: 'image/*',
    errorMessage:''
  },
];
export const SIGN_UP_PERSONAL_FIELDS=[
  {
    name: 'firstName',
    label:'First Name',
    type:'text',
    placeholder: 'Enter first name.',
    errorMessage:'First name is required'
  },
  {
    name: 'lastName',
    label:'Last Name',
    type:'text',
    placeholder: 'Enter last name.',
    errorMessage:'First name is required'
  },
];
export const SIGN_UP_ADDRESS_FIELDS=[
  {
    name: 'address',
    label: 'Address',
    type: 'text',
    placeholder: '123 Main Street',
    errorMessage: 'Enter an address.',
  },
  {
    name: 'address2',
    label: 'Address 2',
    type: 'text',
    placeholder: 'Suite 100',
    errorMessage: '',
  },
  {
    name: 'city',
    label: 'City Name',
    type: 'text',
    placeholder: 'Pittsburgh',
    errorMessage: 'City is required',
  },
  {
    name: 'state',
    label: 'State',
    type: '',
    placeholder: 'Select a state',
    errorMessage: 'State is required',
  },
  {
    name: 'zip',
    label: 'Zip Code',
    type: 'text',
    placeholder: 'Enter Zip Code (15212)',
    errorMessage: ' Zipcode must be exactly 5 digits.',
  },
];
export const CONTACT_FIELDS=[
  {
    name:'email',
    label: 'Email',
    type:'email',
    placeholder: 'email@email.com',
    errorMessage:'Enter an email address.',
  },
  {
    name:'phoneNumber',
    label: 'Phone Number',
    type:'text',
    placeholder: 'Enter phone number.',
    errorMessage:'',
  },
  ];
export const PASSWORD_FIELDS=[
  { name:'role',
  label: 'User Type',
  type:'',
  placeholder: 'Select User Type',
  errorMessage:'User type is required',
},
{
  name:'password',
  label: 'Password',
  type:'password',
  placeholder: 'Password',
  errorMessage:'Must be at least 8 character and container number,symbol,uppercase',
},
{
  name:'confirmPassword',
  label: 'Confirm Password',
  type:'password',
  placeholder: 'Confirm Password',
  errorMessage:'Must must be the same.',
},];
