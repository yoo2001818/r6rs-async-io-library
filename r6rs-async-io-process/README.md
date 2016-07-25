# r6rs-async-io-process
Wrapper of child-process for r6rs-async-io

# Commands
- process/exec (command options) -> ((message code signal) stdout stderr)
- process/spawn ((command args) options) -> (processId)  
  **Note:** this method must be called with `io-on` to work correctly, since
  it uses cancel event to clean-up the process.
- process/writeStdin (processId data) -> ()
- process/onStdout (processId) -> (data closed)
- process/onStderr (processId) -> (data closed)
- process/onClose (processId) -> (code)
- process/onError (processId) -> (error)
- process/kill (processId signal) -> ()
