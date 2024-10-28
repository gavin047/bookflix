import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './Login.css'; // Import CSS file for styling

// Validation schema
const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required.'),
    password: Yup.string().required('Password is required.'),
});

const Login = () => {
    const handleSubmit = async (values) => {
        try {
            // Replace with your actual API endpoint
            const response = await axios.post('http://127.0.0.1:5000/api/login', values);
            console.log('Login successful:', response.data);
            // Handle successful login (e.g., redirect or update state)
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div>
                            <label>Username</label>
                            <Field name="username" />
                            {errors.username && touched.username ? <div>{errors.username}</div> : null}
                        </div>

                        <div>
                            <label>Password</label>
                            <Field name="password" type="password" />
                            {errors.password && touched.password ? <div>{errors.password}</div> : null}
                        </div>

                        <button type="submit">Login</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;