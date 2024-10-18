import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './SignUp.css'; // Import CSS
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // For navigation

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const SignUp = () => {
    const navigate = useNavigate(); // Moved useNavigate inside the component

    const notify = () => {
        toast.success('Signed up successfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClose: () => navigate('/signin') // Navigate after toast closes
        });
    };

    return (
        <div className="signup-container">
            <div className="form-wrapper">
                <h2>Sign Up</h2>
                <Formik
                    initialValues={{ email: '', password: '', confirmPassword: '' }}
                    validationSchema={SignUpSchema}
                    onSubmit={async (values) => {
                        // Handle sign-up logic here
                        notify();
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="form-control">
                                <label>Email</label>
                                <Field name="email" type="email" />
                                {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
                            </div>

                            <div className="form-control">
                                <label>Password</label>
                                <Field name="password" type="password" />
                                {errors.password && touched.password ? <div className="error">{errors.password}</div> : null}
                            </div>

                            <div className="form-control">
                                <label>Confirm Password</label>
                                <Field name="confirmPassword" type="password" />
                                {errors.confirmPassword && touched.confirmPassword ? <div className="error">{errors.confirmPassword}</div> : null}
                            </div>

                            <button type="submit">Sign Up</button>
                        </Form>
                    )}
                </Formik>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='dark'
                />
                <footer>
                    Already have an account? <a href="/signin">Sign in now</a>
                </footer>
            </div>
        </div>
    );
};

export default SignUp;
