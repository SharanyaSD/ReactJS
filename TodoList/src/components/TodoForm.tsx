import { Field, Form, Formik, FormikValues } from "formik";
import React from "react";
import * as Yup from "yup";
import "./styles.css";

const TodoForm = () => {
  const initialValues = {
    title: "",
    description: "",
    assignee: "", // Changed to match initialValues and validationSchema
    dueDate: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Title should be atleast 2 characters")
      .max(10, "Title is too long")
      .required("Title is required"),
    description: Yup.string()
      .min(5, "Atleast 5 words description")
      .max(50, "Description limit 50!")
      .required("Description is required"),
    assignee: Yup.string()
      .min(2, "Assignee name atleast 2 characters")
      .max(50, "Too long")
      .required("Assignee is required"), // Changed to match initialValues
    dueDate: Yup.date()
      .min(new Date(), "Due Date should be future")
      .required("Due Date is required"), // Changed to match initialValues
  });

  const handleSubmit = (values: FormikValues) => {
    console.log(values);
    alert(JSON.stringify(values));
  };

  return (
    <div className="main">
      <div className="main-container">
        <h1>Todo Form</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <label
                  htmlFor="title"
                  className="mt-2.5 block mb-2 text-sm font-medium text-gray-900"
                >
                  Title
                </label>
                <Field
                  id="title"
                  name="title"
                  placeholder="Enter task title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {errors.title && touched.title ? (
                  <span className="mt-2 text-sm text-red-500">
                    {errors.title}
                  </span>
                ) : null}

                <label
                  htmlFor="description"
                  className="mt-2.5 block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <Field
                  id="description"
                  name="description"
                  placeholder="Enter task description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {errors.description && touched.description ? (
                  <span className="mt-2 text-sm text-red-500">
                    {errors.description}
                  </span>
                ) : null}

                <label
                  htmlFor="assignee"
                  className="mt-2.5 block mb-2 text-sm font-medium text-gray-900"
                >
                  Assignee
                </label>
                <Field
                  id="assignee"
                  name="assignee"
                  placeholder="Enter task assignee"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {errors.assignee && touched.assignee ? (
                  <span className="mt-2 text-sm text-red-500">
                    {errors.assignee}
                  </span>
                ) : null}

                <label
                  htmlFor="dueDate"
                  className="mt-2.5 block mb-2 text-sm font-medium text-gray-900"
                >
                  Due Date
                </label>
                <Field
                  id="dueDate"
                  name="dueDate"
                  placeholder="Enter task due date"
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {errors.dueDate && touched.dueDate ? (
                  <span className="mt-2 text-sm text-red-500">
                    {errors.dueDate}
                  </span>
                ) : null}

                <button id="submit" type="submit" className="button">
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TodoForm;
