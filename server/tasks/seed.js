//const connection = require("../config/mongoConnection");
const data = require("../data/");
const reports = data.reports;

async function main() {
    const test1 = await reports.testGeo("810 Washington Street");
    console.log(test1);

    const test2 = await reports.testGeo("620 Bloomfield Street");
    console.log(test2);

    const testE = await reports.testGeo("abcd");
    console.log(testE);

    console.log('Done!');
}

main().catch((error) => {
    console.log(error);
});
  