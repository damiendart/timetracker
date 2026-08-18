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
$ task dependencies
$ task build
```

Use `task --list` to see the full list of available tasks for this
project. If you do not have Task installed, the provided *Taskfile.yml*
is fairly readable if you want to see what commands are being used.

As there is no server-side component, the Time Tracker front-end can be
hosted using the server of your choice. An example *Dockerfile* is
provided which will build the Tracker front-end and serve it using the
[BusyBox httpd server][]:

``` shell
$ docker build -t timetracker .
$ docker run -it -p 3000:3000 timetracker:latest
```

  [Vite]: <https://vitejs.dev/>
  [Task]: <https://taskfile.dev>
  [BusyBox httpd server]: <https://github.com/vda-linux/busybox_mirror/blob/master/networking/httpd.c>
