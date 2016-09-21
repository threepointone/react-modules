react-modules
---

`npm install threepointone/react-modules --save`

code splitting as a component

```jsx
import Modules from 'react-modules'

<Modules   
  load={require('./App.js')}>{ // or arrays, or objects, whatevs
    App => App ? 
      <div><App /></div> : 
      <span>loading...</span>
}</Modules>
```

- "just works" synchronously by default
- "isomorphic", SSR friendly
- transpiles to [webpack-friendly split points](https://webpack.github.io/docs/code-splitting.html) with a plugin(`react-modules/babel`)
- leverage the structure of your app to efficiently split/load your javascript bundles 


todo
---

- tests
- use error boundaries (`unstable_handleError`)
- `bypass` prop to skip code splitting
- calling `require` could be optional
- preserve server rendered html until module loads
- react-native
- analyze the app to generate optimal split and / or entry points 
