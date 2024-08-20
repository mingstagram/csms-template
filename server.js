const { spawn } = require("child_process");

const reactProcess = spawn("npm.cmd", ["start"], {
  cwd: __dirname,
  shell: true,
  stdio: "inherit",
});

reactProcess.on("close", (code) => {
  console.log(`React development server process exited with code ${code}`);
});
