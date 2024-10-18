import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Validation schema for form fields
const AddBookSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  isbn: Yup.string().required('ISBN is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
});

const AddBook = () => {
  return (
    <Formik
      initialValues={{ title: '', author: '', isbn: '', price: '' }}
      validationSchema={AddBookSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          // Update the URL to point to your Flask backend
          await axios.post('http://127.0.0.1:5000/api/books', values);
          alert('Book added successfully!');
          resetForm(); // Reset form fields after successful submission
        } catch (error) {
          console.error('Error adding book:', error);
          alert('Failed to add book. Please try again.');
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <label>Title</label>
            <Field name="title" />
            {errors.title && touched.title ? <div>{errors.title}</div> : null}
          </div>

          <div>
            <label>Author</label>
            <Field name="author" />
            {errors.author && touched.author ? <div>{errors.author}</div> : null}
          </div>

          <div>
            <label>ISBN</label>
            <Field name="isbn" />
            {errors.isbn && touched.isbn ? <div>{errors.isbn}</div> : null}
          </div>

          <div>
            <label>Price</label>
            <Field name="price" type="number" />
            {errors.price && touched.price ? <div>{errors.price}</div> : null}
          </div>

          <button type="submit">Add Book</button>
        </Form>
      )}
    </Formik>
  );
};

export default AddBook;