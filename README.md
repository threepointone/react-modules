react-modules
---

[work in progress]

`npm install react-modules babel-template --save`

code splitting as a component

```jsx
import { Modules } from 'react-modules'

<Modules   
  load={require('./App.js')}>{ 
    // or arrays, or objects, whatevs
    App => App ? 
      <div><App /></div> : 
      <span>loading...</span>
}</Modules>
```

- isomorphic / SSR friendly
- transpiles to [webpack-friendly split points](https://webpack.github.io/docs/code-splitting.html) with a plugin(`react-modules/babel`)
- with helpers to preserve server-rendered html until module loads
- leverage the structure of your app to efficiently split/load your javascript bundles 


api
---

## <Modules>
```jsx
<Modules load={[require('A'), require('B'), {c: require('C')}]}>{
  ([A, B { c:C }]) => {...}
}</Modules>
```

  - `load={reqs}` - return the required modules with `require`. with the plugin, this will be converted to webpack code split points.
  - `onError={fn}` - catch errors
  - `include={bool}` - bypasses the code split
  - `defer={bool}` - loads the scripts only in the trasnpiled version
  - `chunkName={str}` - optional, acts as third argument to the backing `require.ensure()` call for named chunks 
  - `entry={name}` - (experimental) include chunk into `name` entry. works in tandem with `extractEntries()` (TODO - accept multiple entries)


## html persistence helpers

a set of helpers to preserve server/static-rendered html, until its 'parent' module loads.
this is useful when the component is heavy, but you still want to show prerendered html while the chunk loads 

- `preserve(id, DOMelement) : DOMelement`
- `preserved(id) : DOMelement`

example - 
```jsx
<Module load={require('./a').default}>{
  A => A ? preserve('myhtml', <div><App/></div>): // on SSR, this will generate html
    preserved('myhtml') || // on browser, use the cached html, until the module loads up
    <span>loading...</span> // if neither available, show loading state
}</Module>
```

Use sparingly! This will probably break react's checksum algo, but that's the tradeoff you'll need for this behavior.  

## plugin 

- `react-modules/babel` - wraps `Modules` components' `load` props with `require.ensure` boilerplate, generating code splits

## extractEntries

- `extractEntries(filepath)` (experimental) - statically analyze module and generate webpack entries 

## extractResourceMap
- `extractResourceMap(filepath)` (experimental) - statically analyze an app and generate urlpattern -> entries map. works in tandem with react-router@4.

todo
---

- docs
- tests
- custom `<Match/>` component that accepts entry/load
- `express` helper/middleware to serve bundles
- hmr compat
- arbit file types / webpack loader compat
- browserify compat
- react-native
