Time Tracker
============

A simple Vue-based time tracker.

This time tracker doesn't have a server-side component and stores all
data in your web browser using the [Web Storage API][] (specifically the
`localStorage` mechanism).

This project currently doesn't have a proper home on the Internet, so
for now you'll have to build and run the project locally to use it:

```shell
$ task dependencies
$ task preview
```

If you do not have [Task][] installed, this project uses [Vite][] so the
[usual incantations][] will also do the trick.

  [Web Storage API]: <https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API>
  [Task]: <https://taskfile.dev>
  [Vite]: <https://vitejs.dev/>
  [usual incantations]: <https://vitejs.dev/guide/static-deploy.html>
