# svelte-lazy-components

Lazy wrapper for Svelte components inspired by [React.lazy()](https://react.dev/reference/react/lazy).

*Only supports Svelte 5 components.*

## Features
- Lazy load Svelte components
- Show a loading [Snippet](https://svelte.dev/docs/svelte/snippet) while the lazy component is loading
- Supports Svelte 5 components
- SSR compatible
- Retains components type information

## Installation

```bash
npm i -D svelte-lazy-components
```

## Usage

These utilities expect a function that returns a `Promise` with the component to be loaded as the `default` export.

`lazy()` returns a regular Svelte component, that will load the component upon first render.

### In JS/TS files

```ts

import { lazy } from 'svelte-lazy-components';

const LazyComponent = lazy(() => import('./LazyComponent.svelte'));

```

### In components
In your Svelte components:
```svelte
<script>
  import { lazy, Lazy } from 'svelte-lazy-components';

  const LazyComponent = lazy(() => import('./LazyComponent.svelte'));
</script>

<LazyComponent name="World!" />

<!-- or with Lazy  -->
<Lazy provider={() => import('./LazyComponent.svelte')} props={{name: 'World'}} />
```

You can also use `fallback` prop to show a loading component while the lazy component is loading:
```svelte
<script>
  import { Lazy } from 'svelte-lazy-components';
  import Loading from './Loading.svelte';
</script>

<Lazy provider={() => import('./LazyComponent.svelte')} props={{name: 'World!'}}>
  {#snippet fallback()}
    <p>Loading...</p>
  {/snippet}
</Lazy>
```

## Use cases

## Lazy loading components

```svelte
<script>
  import { lazy } from 'svelte-lazy-components';
  
  let condition = $state(false);

  // HeavyComponent.svelte will be loaded only when condition is true
  const HeavyComponent = lazy(() => import('./HeavyComponent.svelte'));
</script>

{#if condition}
  <HeavyComponent name="World!" />
{/if}
```

### Building component libraries

You can use `lazy()` to load components from a library only when they are needed:
```ts

import { lazy } from 'svelte-lazy-components';

const mappedComponents = {
  ComponentA: lazy(() => import('my-library/ComponentA.svelte')),
  ComponentB: lazy(() => import('my-library/ComponentB.svelte')),
};

```

### AB testing
You can use `lazy()` to load different components based on some condition:
```svelte
<script>
  import { lazy } from 'svelte-lazy-components';
  
  const isFeatureEnabled = Math.random() > 0.5;

  const LazyComponent = lazy(() => {
    if (isFeatureEnabled) {
      return import('./ComponentA.svelte');
    } else {
      return import('./ComponentB.svelte');
    }
  });
</script>

<LazyComponent />
```

__or__

```svelte
<script>
  import { lazy } from 'svelte-lazy-components';
  
  const isFeatureEnabled = Math.random() > 0.5;

  const ComponentA = lazy(() => import('./ComponentA.svelte'));
  const ComponentB = lazy(() => import('./ComponentB.svelte'));
  
</script>

{#if isFeatureEnabled}
  <ComponentA />
{:else}
  <ComponentB />
{/if}
```

## Credits
- [React.lazy()](https://react.dev/reference/react/lazy)

## License
Apache-2.0

