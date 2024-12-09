import type { Component } from 'svelte';
import LazyComponent from '$lib/LazyComponent.svelte';

export function lazy<
	Props extends Record<string, any>,
	Exports extends Record<string, any>,
	Bindings extends '' | keyof Props
>(
	fn: () => Promise<{ default: Component<Props, Exports, Bindings> }>
): Component<Props, Exports, Bindings> {
	return ((internals, props) => {
		return LazyComponent(internals, {
			provider: fn,
			props
		});
	}) as Component<Props, Exports, Bindings>;
}

export { default as LazyComponent } from './LazyComponent.svelte';
