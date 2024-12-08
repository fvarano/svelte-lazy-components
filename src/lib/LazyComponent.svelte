<script lang="ts" module>
	const componentsCache = new Map<() => Promise<Component>, Promise<Component>>();

	type ComponentModule<
		Props extends Record<string, any>,
		Exports extends Record<string, any>,
		Bindings extends '' | keyof Props
	> = {
		default: Component<Props, Exports, Bindings>;
	};

	function resolveComponent<
		Props extends Record<string, any>,
		Exports extends Record<string, any>,
		Bindings extends '' | keyof Props
	>(
		provider: () => Promise<ComponentModule<Props, Exports, Bindings>>
	): Promise<ComponentModule<Props, Exports, Bindings>> {
		const castedProvider = provider as unknown as () => Promise<Component>;
		if (!componentsCache.has(castedProvider)) {
			const promise = castedProvider();
			componentsCache.set(castedProvider, promise);
			return promise as unknown as Promise<ComponentModule<Props, Exports, Bindings>>;
		}
		return componentsCache.get(castedProvider)! as unknown as Promise<
			ComponentModule<Props, Exports, Bindings>
		>;
	}
</script>

<script
	lang="ts"
	generics="Props extends Record<string, any>,
	Exports extends Record<string, any>,
	Bindings extends '' | keyof Props"
>
	import type { Component, Snippet } from 'svelte';
	import Dummy from '$lib/components/Dummy.svelte';

	type C = Component<Props, Exports, Bindings>;

	let {
		provider,
		fallback,
		props: componentProps
	}: { provider: () => Promise<{ default: C }>; props: Props; fallback?: Snippet } = $props();
</script>

{#await resolveComponent(provider)}
	{#if fallback}
		{@render fallback()}
	{/if}
{:then { default: Component }}
	<Component {...componentProps}></Component>
{/await}
