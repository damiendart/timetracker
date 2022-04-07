Time Tracker
============

This project consists of:

- a simple Vue-based time tracker; and
- a basic application, written in Go, that serves the time tracker.

The server application is optional; you can serve the frontend however
you want as all data used by the time tracker is stored in your
web browser using the [Web Storage API][]'s `localStorage` mechanism.

This project currently doesn't have a proper home on the Internet, so
for now you'll have to build and run it yourself (this project uses Go,
Node, and [Task][]):

```shell
$ task dependencies
$ task build
$ ./timetracker
```

Running `task build:frontend` will build just the frontend.

If you do not have Task installed, the accompanying *Taskfile.yml* is
fairly readable if you want to see what incantations are used to build
and develop this project.

  [Web Storage API]: <https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API>
  [Task]: <https://taskfile.dev>
