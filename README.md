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
  - TODO - `entry={name}` - optional, include chunk into `name` entry. works in tandem with `extractEntries`


## html persistence helpers

a set of helpers to preserve server/static-rendered html, until its 'parent' module loads.

- `preserve(id, DOMelement) : DOMelement`
- `preserved(id) : DOMelement`
- `preserved(id, tag, props) : DOMelement`
- `hydrate()`

## plugin 

- `react-modules/babel` - wraps `Modules` components' `load` props with `require.ensure` boilerplate, generating code splits

## extractEntries

- TODO - `extractEntries(glob)` - statically analyze files and generate webpack entries 

todo
---

- docs
- tests
- detect entry points
- browserify compat
- react-native
