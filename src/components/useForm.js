import { useState } from 'react';
import { useInput } from './useInput';

export const defaultFormProps = {
	autoComplete: 'on',
};

export const useForm = (name, initialState = {}) => {
	const [formValues] = useState({ ...initialState }),
		[uiState, setUiState] = useState({ isSubmitting: false }),
		[inputs] = useState({});

	const getFormProps = (props = {}) => ({
		...defaultFormProps,
		...props,
		onSubmit: async evt => {
			evt.preventDefault();

			try {
				setUiState({ isSubmitting: true });
				props.onSubmit && (await props.onSubmit({ evt, formValues }));
			} finally {
				setUiState({ isSubmitting: false });
			}
		},
	});

	const onInputChange = (name, value) => {
		formValues[name] = value;
	};

	const addInput = ({ name, value }) => {
		const input = useInput({
			name,
			value,
			props: { onChange: onInputChange },
		});

		inputs[name] = input;
		formValues[name] = value;
		return input;
	};

	return {
		getFormProps,
		formValues,
		uiState,
		inputs,
		api: {
			addInput,
		},
	};
};
