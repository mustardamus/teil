# Teil

A neat wrapper for Express.js API's.

This is a work in progress. However, the `teil` package is published at NPM
(mainly for me to use in the 2019 Nodeknockout hackathon ;)). So to try it out,
you can simply do:

```
npm install teil
```

Then you can create a controller file at `./controllers/hello.js`:

```
module.exports = {
  'GET world'({ send }) {
    send('Hello, World!')
  }
}
```

And start `teil`, it will automatically create a `/hello/world` route for you:

```
npx teil
```

That's it! Now you can visit `http://localhost:3333/hello/world` and you will
see `Hello, World!`.

Check out the `./example` folder for more features, you can start the example
by running `npm run example`.

To be continued...