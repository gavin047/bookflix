import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; // For navigation
import { AuthContext } from '../AuthContext'; // Import AuthContext
import swal from 'sweetalert'; // Import SweetAlert
import './SignIn.css'; // Import CSS

// Updated validation schema: Only email validation remains
const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email!').required('Email is required!'),
    password: Yup.string(), // No password validation required
});

const SignIn = () => {
    const { login } = useContext(AuthContext); // Get login function from context
    const navigate = useNavigate(); // Hook for navigation

    return (
        <div className="form-wrapper">
            <h2>Sign In</h2>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={SignInSchema}
                onSubmit={(values, { setSubmitting }) => {
                    // Simulate successful login regardless of password
                    localStorage.setItem('token', 'dummy-token'); // Set a dummy token for authentication
                    login(values.email, values.password); // Call the login function from context
                    
                    swal("Success!", "Logged in successfully!", "success");
                    navigate('/'); // Redirect to home page immediately

                    setSubmitting(false); // Reset the form submission state
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <div className="form-control">
                            <Field name="email" type="email" placeholder="Email" />
                            {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
                        </div>

                        <div className="form-control">
                            <Field name="password" type="password" placeholder="Password" />
                            {/* Password field is still present but ignored */}
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </button>
                        
                        <div className="form-help">
                            <button type="button" onClick={() => swal("Help", "Help section coming soon!", "info")} style={{ background: 'none', color: '#b3b3b3', border: 'none', cursor: 'pointer', padding: 0 }}>
                                Need help?
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            <footer>
                New to Bookflix? <a href="/signup">Sign up now</a>
            </footer>
        </div>
    );
};

export default SignIn;