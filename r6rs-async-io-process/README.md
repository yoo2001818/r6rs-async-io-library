# r6rs-async-io-process
Wrapper of child-process for r6rs-async-io

# Commands
- process/exec (command options) -> ((message code signal) stdout stderr)
- process/spawn ((command args) options) -> (processId)
- process/writeStdin (processId data) -> ()
- process/onStdout (processId) -> (data closed)
- process/onStderr (processId) -> (data closed)
- process/onClose (processId) -> (code)
- process/onError (processId) -> (error)
- process/kill (processId signal) -> ()
