import * as yup from 'yup';

export const createAdminSchema = yup.object().shape({
    firstname: yup.string().required('Required'),
    lastname: yup.string().required('Required'),
    email: yup.string().email('Invalid Email Address').required('Required'),
    phone_number: yup.string().required('Required'),
    username: yup.string().required('Required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Required'),
    avatar: yup.mixed().required('Required')
})

export const createAccountSchema = yup.object().shape({
    firstname: yup.string().required('Required'),
    lastname: yup.string().required('Required'),
    email: yup.string().email('Invalid Email Address').required('Required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Required'),
    isAgent: yup.boolean(),
    professional_type: yup.string().required('Required for agents'),
    experience_level: yup.string().required('Required for agents'),
    phone_number: yup.string().required('Required for agents')
})

export const addPropertySchema = yup.object().shape({
    name: yup.string().required('Required'),
    address: yup.string().required('Required'),
    category: yup.string().required('Required'),
    total_price: yup.number().required('Required'),
    type: yup.string().required('Required'),
    inspection_fee: yup.number().required('Required'),
    about: yup.string().required('Required'),
    land_size: yup.string().when('type', {
        is: 'land',
        then: (schema) => schema.required('Required for Land'),
        otherwise: (schema) => schema.notRequired()
    })
})
export const addBlogSchema = yup.object().shape({
    title: yup.string().required('Required'),
    subtitle: yup.string().required('Required'),
    content: yup.string().required('Required')
})
export const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid Email Address').required('Required'),
    password: yup.string().required('Required')
})

export const resetPasswordSchema = yup.object().shape({
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Required')
})

export const step1Schema = yup.object().shape({
  title: yup.string()
    .max(50, "Maximum 50 characters")
    .required("Service title is required"),
  category: yup.string().required("Category is required"),
  location: yup.string().required("Location is required"),
  short_description: yup.string()
    .max(120, "Maximum 120 characters")
    .required("Short description is required"),
  full_description: yup.string()
    .max(1000, "Maximum 1000 characters")
    .required("Full description is required"),
});

export const step2Schema = yup.object().shape({
  pricing_type: yup.string()
    .oneOf(["fixed", "hourly", "negotiable"])
    .required("Pricing type is required"),
  base_price: yup.number()
    .positive("Price must be greater than 0")
    .required("Price is required"),
  price_includes: yup.string(),
  additional_notes: yup.string().max(200, "Maximum 200 characters"),
  images: yup.array()
    .min(3, "At least 3 photos are required")
    .required("Photos are required"),
});