import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
	render(<ContactForm/>)

	const header = screen.queryByText(/Contact Form/i)

	expect(header).toBeInTheDocument();
	expect(header).toBeTruthy();
	expect(header).toHaveTextContent(/Contact Form/i)
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
	render(<ContactForm/>)

  const nameInput = screen.getByLabelText(/first name/i)
	userEvent.type(nameInput, "abcd")

	await waitFor(() => {
		const nameError = screen.getAllByTestId(/error/i)
		// expect(nameError).toBeInTheDocument();
		expect(nameError).toHaveLength(1)
	})
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm/>)

	const button = screen.getByRole("button")

	userEvent.click(button)

	await waitFor(() => {
		const errors = screen.getAllByTestId(/error/i)
		// console.log(errors);
		expect(errors).toHaveLength(3)
	})

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
	render(<ContactForm/>)

	const fNameInput = screen.getByLabelText(/first name/i)
	const lNameInput = screen.getByLabelText(/last name/i)
	const button = screen.getByRole("button")

	userEvent.type(fNameInput, 'Christopher')
	userEvent.type(lNameInput, 'Scrantom')
	userEvent.click(button)

	await waitFor(() => {
		const errors = screen.getAllByTestId(/error/i)
		expect(errors).toHaveLength(1)
	})
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
	render(<ContactForm/>)

	const emailInput = screen.getByLabelText(/email/i)

	userEvent.type(emailInput, 'thisIsNotAValidEmail')

	await waitFor(() => {
		const errors = screen.getAllByTestId(/error/i)
		expect(errors).toHaveLength(1)
		// console.log(errors[0])
		expect(errors[0]).toHaveTextContent("email must be a valid email address")
	})
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
	render(<ContactForm/>)

	const button = screen.getByRole("button")

	userEvent.click(button)

	await waitFor(() => {
		const errors = screen.getAllByTestId(/error/i)
		expect(errors[1]).toHaveTextContent("lastName is a required field")
	})
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
	render(<ContactForm/>)

	const fNameInput = screen.getByLabelText(/first name/i)
	const lNameInput = screen.getByLabelText(/last name/i)
	const emailInput = screen.getByLabelText(/email/i)

	const button = screen.getByRole("button")

	userEvent.type(fNameInput, "Chris")
	userEvent.type(lNameInput, "Scrantom")
	userEvent.type(emailInput, "test@test.com")

	userEvent.click(button)

	await waitFor(() => {
		// render(<DisplayComponent/>)

		const fName = screen.getByTestId(/firstnameDisplay/i)
		const lName = screen.getByTestId(/lastnameDisplay/i)
		const email = screen.getByTestId(/emailDisplay/i)

		// const message = screen.getByTestId(/messageDisplay/i)

		expect(fName).toBeInTheDocument
		expect(lName).toBeInTheDocument
		expect(email).toBeInTheDocument

		// expect(message).not.toBeInTheDocument
	})

});

test('renders all fields text when all fields are submitted.', async () => {
	render(<ContactForm/>)

	const fNameInput = screen.getByLabelText(/first name/i)
	const lNameInput = screen.getByLabelText(/last name/i)
	const emailInput = screen.getByLabelText(/email/i)
	const messageInput = screen.getByLabelText(/message/i)

	const button = screen.getByRole("button")

	userEvent.type(fNameInput, "Chris")
	userEvent.type(lNameInput, "Scrantom")
	userEvent.type(emailInput, "test@test.com")
	userEvent.type(messageInput, "This is a message")

	userEvent.click(button)

	await waitFor(() => {
		const fName = screen.getByTestId(/firstnameDisplay/i)
		const lName = screen.getByTestId(/lastnameDisplay/i)
		const email = screen.getByTestId(/emailDisplay/i)
		const message = screen.getByTestId(/messageDisplay/i)

		expect(fName).toBeInTheDocument
		expect(lName).toBeInTheDocument
		expect(email).toBeInTheDocument
		expect(message).toBeInTheDocument
	})
});