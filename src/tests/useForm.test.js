import { renderHook, cleanup, act } from 'react-hooks-testing-library';
import { useForm } from '../components/useForm';
const noop = () => {};
jest.useFakeTimers();
describe('useForm tests', () => {
	// afterEach(cleanup);
	it('should return empty form state', () => {
		const { result } = renderHook(() => useForm());
		const { getFormProps, formState } = result.current;
		expect(getFormProps).toBeDefined();
		expect(formState.values).toEqual({});
	});
	it('should return an initial formSummary', () => {
		const { result } = renderHook(() => useForm());
		const { getFormProps, formSummary } = result.current;
		expect(getFormProps).toBeDefined();
		expect(formSummary).toEqual({
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
		const { getFormProps, formSummary } = result.current;
		const onSubmit = jest.fn();
		const formProps = getFormProps({ onSubmit });
		expect(formProps.onSubmit).toBeDefined();
		// Could be some weirdness right now due to
		// https://github.com/facebook/react/issues/14769
		act(() => {
			formProps.onSubmit({ preventDefault: noop });
		});
		expect(formSummary).toEqual({
			isSubmitting: false,
		});
		expect(onSubmit).toHaveBeenCalledTimes(1);
	});
	it('should support async onSubmit', async () => {
		const { waitForNextUpdate, result } = renderHook(() => useForm());
		const { getFormProps, formSummary } = result.current;
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
		expect(result.current.formSummary).toEqual({
			isSubmitting: true,
		});
		await waitForNextUpdate();
		expect(formSummary).toEqual({
			isSubmitting: false,
		});
	});
	it('should gracefully handle onSubmit errors', async () => {
		const { result } = renderHook(() => useForm());
		const { getFormProps, formSummary } = result.current;
		const onSubmit = evt => new Error();
		const formProps = getFormProps({ onSubmit });
		expect(formProps.onSubmit).toBeDefined();
		// Could be some weirdness right now due to
		// https://github.com/facebook/react/issues/14769
		act(() => {
			formProps.onSubmit({ preventDefault: noop });
		});
		expect(formSummary).toEqual({
			isSubmitting: false,
		});
	});
	it('should gracefully handle async onSubmit errors', async () => {
		const { waitForNextUpdate, result } = renderHook(() => useForm());
		const { getFormProps, formSummary } = result.current;
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
		expect(result.current.formSummary).toEqual({
			isSubmitting: true,
		});
		await waitForNextUpdate();
		expect(formSummary).toEqual({
			isSubmitting: false,
		});
	});
});
