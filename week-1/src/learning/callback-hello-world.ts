function printWithState(name: string) {
  console.log(`Hi ${name}`);
}

// In the callback signature (), you could specify additional arguments to pass e.g. `(punctuation: string) => void`.
// Both kwargs and args are supported.
function run(callback: () => void) {
  callback(); // there is no knowlege of passing the name here
}

const printWithNamePredefined = () => printWithState("michael"); // effectively a partial in python
run(printWithNamePredefined);
