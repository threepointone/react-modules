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

- "just works" synchronously by default
- "isomorphic", SSR friendly
- transpiles to [webpack-friendly split points](https://webpack.github.io/docs/code-splitting.html) with a plugin(`react-modules/babel`)
- leverage the structure of your app to efficiently split/load your javascript bundles 
- `include` prop to skip code splitting
- preserve server rendered html until module loads(!)
- catch errors with `onError` callback

todo
---

- tests
- react-native
- browserify compat
- analyze the app to generate optimal split and / or entry points 
