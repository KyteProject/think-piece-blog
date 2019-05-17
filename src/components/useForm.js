import { useState } from 'react';

export const defaultFormProps = {
	autoComplete: 'on',
};
export const useForm = (name, initialState = {}, props) => {
	const [formState, setFormState] = useState({ values: initialState }),
		[formSummary, setFormSummary] = useState({ isSubmitting: false });

	const getFormProps = (props = {}) => ({
		...defaultFormProps,
		...props,
		onSubmit: async event => {
			event.preventDefault();
			try {
				setFormSummary({ isSubmitting: true });
				props.onSubmit && (await props.onSubmit({ event, formState }));
			} finally {
				setFormSummary({ isSubmitting: false });
			}
		},
	});

	return {
		getFormProps,
		formState: formState,
		formSummary,
	};
};
