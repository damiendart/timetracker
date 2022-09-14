Time Tracker
============

A simple Vue-based time tracker.

I built this tool to help me record time spent on tasks at work without
too much faff. There is currently no server-side component; all of your
data is stored in your web browser using the [Web Storage API][]’s
`localStorage` mechanism.

  [Web Storage API]: <https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API>


## Building the time tracker

This project uses [Vite][] to build the project, so the usual
incantations apply.

If you have [Task][] installed, you can build the project from a fresh
copy of the source code with:

``` shell
$ task dependencies:javascript
$ task build:frontend
```

You can also create a [redbean][]-powered server that serves the time
tracker front-end:

``` shell
$ task dependencies
$ task build
$ # Start the server with "./timetracker.com"
```

Use `task --list` to see the full list of available tasks for this
project. If you do not have Task installed, the provided *Taskfile.yml*
is fairly readable if you want to see what commands are being used.

  [Vite]: <https://vitejs.dev/>
  [Task]: <https://taskfile.dev>
  [redbean]: <https://redbean.dev/>
