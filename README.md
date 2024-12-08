# svelte-lazy-components

Lazy wrapper for Svelte components inspired by [React.lazy()](https://react.dev/reference/react/lazy)

## Installation

```bash
npm install -D svelte-lazy-components
```

## Usage

These utilities expect a function that returns a promise with the component to be loaded as the default export.

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

  const LazyComponent = lazy(() => import('./LazyComponent.svelte'));
</script>

<Lazy provider={() => import('./LazyComponent.svelte')} props={{name: 'World!'}}>
  {#snippet fallback()}
    <p>Loading...</p>
  {/snippet}
</Lazy>
```


## License
Apache-2.0

