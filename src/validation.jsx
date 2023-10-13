export const schema = {
  firstName: {
    label: "First Name",
    type: "text",
    validation: {
      required: "First Name is required",
      minLength: {
        value: 3,
        message: "First Name should have at least 3 characters",
      },
    },
  },
  lastName: {
    label: "Last Name",
    type: "text",
    validation: {
      required: "Last Name is required",
    },
  },
  email: {
    label: "Email",
    type: "email",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Invalid email address",
      },
    },
  },
  Country: {
    type: "select",
    label: "Country",
    validation: {
      required: "Country Name is required",
    },
    options: [
      {
        value: "India",
        label: "India",
      },
      {
        value: "Canada",
        label: "Canada",
      },
      {
        value: "England",
        label: "England",
      },
    ],
  },
  Gender: {
    label: "Gender",
    type: "radio",
    validation: {
      required: "Gender is required",
    },
    options: [
      {
        name: "Male",
        value: "Male",
        label: "Male",
      },
      {
        name: "Female",
        value: "Female",
        label: "Female",
      },
      {
        name: "Others",
        value: "Others",
        label: "Others",
      },
    ],
  },

  Food: {
    label: "Food",
    type: "checkbox",
    validation: {
      required: "Food is required",
    },
    options: [
      {
        name: "Apple",
        value: "Apple",
        label: "Apple",
      },
      {
        name: "Orange",
        value: "Orange",
        label: "Orange",
      },
      {
        name: "Others",
        value: "Others",
        label: "Others",
      },
    ],
  },
};
