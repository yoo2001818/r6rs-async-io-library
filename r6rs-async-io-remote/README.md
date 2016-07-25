# r6rs-async-io-remote
Wrapper of node-ipc for r6rs-async-io

This package allows other processes to emit event to running r6rs-async-io
instance, using node-ipc.

This package ships with `r6rs-remote` command, which can be used to remotely
trigger registered event. Of course, it must be installed with
`npm install r6rs-async-io-remote -g`

**Note that** only one instance of r6rs-async-io can be run at the same time,
since they will run as a server.

- remote/start ()  
  Starts the IPC server. Note that this function **never** calls the callback.

- remote/listen eventName  
  Listens to the specified channel.

```scheme
(io-exec "remote/start" '())
(io-on "remote/listen" "test" (lambda args
  (display args)
  (newline)
))
```

Then, executing following command from your terminal will trigger the event.

`r6rs-remote test hello world`
