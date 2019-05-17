import { renderHook, cleanup, act } from 'react-hooks-testing-library';
import { useForm } from '../components/useForm';

const noop = () => {};

jest.useFakeTimers();

describe('useForm tests', () => {
	// afterEach(cleanup);w

	it('should return empty form props and form state', () => {
		const { result } = renderHook(() => useForm());
		const { getFormProps, formValues } = result.current;
		expect(getFormProps).toBeDefined();
		expect(formValues).toEqual({});
	});

	it('should return an initial uiState', () => {
		const { result } = renderHook(() => useForm());
		const { uiState } = result.current;
		expect(uiState).toEqual({
			isSubmitting: false,
		});
	});

	it('should support custom form props', () => {
		const { result } = renderHook(() => useForm());
		const { getFormProps } = result.current;
		const formProps = getFormProps({ foo: 'bar' });
		expect(formProps.foo).toEqual('bar');
	});
	it('should support custom onSubmit', async () => {
		const { result } = renderHook(() => useForm());
		const { getFormProps, uiState } = result.current;
		const onSubmit = jest.fn();
		const formProps = getFormProps({ onSubmit });
		expect(formProps.onSubmit).toBeDefined();
		// Could be some weirdness right now due to
		// https://github.com/facebook/react/issues/14769
		act(() => {
			formProps.onSubmit({ preventDefault: noop });
		});
		expect(uiState).toEqual({
			isSubmitting: false,
		});
		expect(onSubmit).toHaveBeenCalledTimes(1);
	});

	it('should support async onSubmit', async () => {
		const { waitForNextUpdate, result } = renderHook(() => useForm());
		const { getFormProps, uiState } = result.current;
		const onSubmit = evt =>
			new Promise(r => {
				setTimeout(() => {
					r();
				}, 1000);
			});
		const formProps = getFormProps({ onSubmit });
		expect(formProps.onSubmit).toBeDefined();
		// Could be some weirdness right now due to
		// https://github.com/facebook/react/issues/14769
		act(() => {
			formProps.onSubmit({ preventDefault: noop });
		});
		jest.runAllTimers();
		expect(result.current.uiState).toEqual({
			isSubmitting: true,
		});
		await waitForNextUpdate();
		expect(uiState).toEqual({
			isSubmitting: false,
		});
	});

	it('should gracefully handle onSubmit errors', async () => {
		const { result } = renderHook(() => useForm());
		const { getFormProps, uiState } = result.current;
		const onSubmit = evt => new Error();
		const formProps = getFormProps({ onSubmit });
		expect(formProps.onSubmit).toBeDefined();
		// Could be some weirdness right now due to
		// https://github.com/facebook/react/issues/14769
		act(() => {
			formProps.onSubmit({ preventDefault: noop });
		});
		expect(uiState).toEqual({
			isSubmitting: false,
		});
	});

	it('should gracefully handle async onSubmit errors', async () => {
		const { waitForNextUpdate, result } = renderHook(() => useForm());
		const { getFormProps, uiState } = result.current;
		const onSubmit = evt =>
			new Promise((resolve, reject) => {
				setTimeout(() => {
					reject();
				}, 1000);
			});
		const formProps = getFormProps({ onSubmit });
		expect(formProps.onSubmit).toBeDefined();
		// Could be some weirdness right now due to
		// https://github.com/facebook/react/issues/14769
		act(() => {
			formProps.onSubmit({ preventDefault: noop });
		});
		jest.runAllTimers();
		expect(result.current.uiState).toEqual({
			isSubmitting: true,
		});
		await waitForNextUpdate();
		expect(uiState).toEqual({
			isSubmitting: false,
		});
	});

	it('should be able to add inputs', () => {
		const { result } = renderHook(() => useForm());
		const { api } = result.current;
		expect(api).toBeDefined();
		renderHook(() => api.addInput({ name: 'test', value: '123' }));
		expect(result.current.formValues).toEqual({ test: '123' });
		expect(result.current.inputs.test).toBeDefined();
		let inputProps = result.current.inputs.test.getInputProps();
		expect(inputProps.id).toEqual('test');
		expect(inputProps.value).toEqual('123');
		renderHook(() => api.addInput({ name: 'secondtest', value: '234' }));
		expect(result.current.formValues).toEqual({
			test: '123',
			secondtest: '234',
		});
		expect(result.current.inputs.test).toBeDefined();
		inputProps = result.current.inputs.secondtest.getInputProps();
		expect(inputProps.id).toEqual('secondtest');
		expect(inputProps.value).toEqual('234');
	});
});
