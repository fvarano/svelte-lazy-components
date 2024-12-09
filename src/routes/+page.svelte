<script>
	import { lazy, Lazy } from '$lib';

	let LazyViaApi = lazy(() => import('./TestComponent.svelte'));
	let LazyViaApiWithProps = lazy(() => import('./TestComponentWithProps.svelte'));
</script>

<div>
	<p>
		This is a lazy component.
		<Lazy provider={() => import('./TestComponent.svelte')}></Lazy>
	</p>

	<p>
		This is a lazy component loaded via API.
		<LazyViaApi></LazyViaApi>
	</p>
</div>

<div>
	<p>
		This is a lazy component with props.
		<Lazy
			provider={() => import('./TestComponentWithProps.svelte')}
			props={{ prop1: 'Hello', prop2: 42 }}
		></Lazy>
	</p>

	<p>
		This is a lazy component with props loaded via API.
		<LazyViaApiWithProps prop1="Hello" prop2={42}></LazyViaApiWithProps>
	</p>
</div>
