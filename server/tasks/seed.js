const { ObjectId } = require("mongodb");
const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const reports = data.reports;

async function main() {
	const db = await dbConnection.connectToDb();
	await db.dropDatabase();

	let date = new Date();
	let paddedDate = date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
	const report1 = {
		name: "Christopher Moon",
		date: paddedDate,
		address: "123 Washington Street, Hoboken, NJ, USA",
		issueType: "nowater",
		description: "There is no water",
		email: "test1@gmail.com",
	};

	const newReport1 = await reports.createReport(
		report1.name,
		report1.date,
		report1.address,
		report1.issueType,
		report1.description,
		report1.email
	);

	const report2 = {
		name: "Jan Gabriel Del Rosario",
		date: paddedDate,
		address: "456 Washington Street, Hoboken, NJ, USA",
		issueType: "nopower",
		description: "There is no power",
		email: "test1@gmail.com",
	};

	const newReport2 = await reports.createReport(
		report2.name,
		report2.date,
		report2.address,
		report2.issueType,
		report2.description,
		report2.email
	);

	const report3 = {
		name: "Ayo Omokanwaye",
		date: paddedDate,
		address: "1 Castle Point Terrace, Hoboken, NJ, USA",
		issueType: "noise",
		description: "There is lots of noise",
		email: "test1@gmail.com",
	};

	const newReport3 = await reports.createReport(
		report3.name,
		report3.date,
		report3.address,
		report3.issueType,
		report3.description,
		report3.email
	);

	const report4 = {
		name: "Cameron Conway",
		date: paddedDate,
		address: "900 Madison Street, Hoboken, NJ, USA",
		issueType: "flooding",
		description: "The area is flooded",
		email: "test1@gmail.com",
	};

	const newReport4 = await reports.createReport(
		report4.name,
		report4.date,
		report4.address,
		report4.issueType,
		report4.description,
		report4.email
	);

	const report5 = {
		name: "Zane Thummborst",
		date: paddedDate,
		address: "422 Monroe Street, Hoboken, NJ, USA",
		issueType: "airquality",
		description: "The area has bad air quality",
		email: "test1@gmail.com",
	};

	const newReport5 = await reports.createReport(
		report5.name,
		report5.date,
		report5.address,
		report5.issueType,
		report5.description,
		report5.email
	);

	const report6 = {
		name: "Christopher Moon",
		date: paddedDate,
		address: "1422 Grand Street, Hoboken, NJ, USA",
		issueType: "nowater",
		description: "There is no water",
		email: "test1@gmail.com",
	};

	const newReport6 = await reports.createReport(
		report6.name,
		report6.date,
		report6.address,
		report6.issueType,
		report6.description,
		report6.email
	);

	const report7 = {
		name: "Jan Gabriel Del Rosario",
		date: paddedDate,
		address: "1420 Sinatra Dr N, Hoboken, NJ, USA",
		issueType: "nopower",
		description: "There is no power",
		email: "test1@gmail.com",
	};

	const newReport7 = await reports.createReport(
		report7.name,
		report7.date,
		report7.address,
		report7.issueType,
		report7.description,
		report7.email
	);

	const report8 = {
		name: "Ayo Omokanwaye",
		date: paddedDate,
		address: "770 Jackson Street, Hoboken, NJ, USA",
		issueType: "noise",
		description: "There is lots of noise",
		email: "test1@gmail.com",
	};

	const newReport8 = await reports.createReport(
		report8.name,
		report8.date,
		report8.address,
		report8.issueType,
		report8.description,
		report8.email
	);

	const report9 = {
		name: "Cameron Conway",
		date: paddedDate,
		address: "700 1st Street, Hoboken, NJ, USA",
		issueType: "flooding",
		description: "The area is flooded",
		email: "test1@gmail.com",
	};

	const newReport9 = await reports.createReport(
		report9.name,
		report9.date,
		report9.address,
		report9.issueType,
		report9.description,
		report9.email
	);

	const report10 = {
		name: "Zane Thummborst",
		date: paddedDate,
		address: "400 Newark Street, Hoboken, NJ, USA",
		issueType: "airquality",
		description: "The area has bad air quality",
		email: "test1@gmail.com",
	};

	const newReport10 = await reports.createReport(
		report10.name,
		report10.date,
		report10.address,
		report10.issueType,
		report10.description,
		report10.email
	);

	const report11 = {
		name: "Christopher Moon",
		date: paddedDate,
		address: "308 Willow Ave, Hoboken, NJ, USA",
		issueType: "construction",
		description: "There is construction going on",
		email: "test1@gmail.com",
	};

	const newReport11 = await reports.createReport(
		report11.name,
		report11.date,
		report11.address,
		report11.issueType,
		report11.description,
		report11.email
	);

	const report12 = {
		name: "Jan Gabriel Del Rosario",
		date: paddedDate,
		address: "309 1st Street, Hoboken, NJ, USA",
		issueType: "construction",
		description: "There is construction going on",
		email: "test1@gmail.com",
	};

	const newReport12 = await reports.createReport(
		report12.name,
		report12.date,
		report12.address,
		report12.issueType,
		report12.description,
		report12.email
	);

	const report13 = {
		name: "Ayo Omokanwaye",
		date: paddedDate,
		address: "59 Washington Street, Hoboken, NJ, USA",
		issueType: "potholes",
		description: "There are potholes on the road",
		email: "test1@gmail.com",
	};

	const newReport13 = await reports.createReport(
		report13.name,
		report13.date,
		report13.address,
		report13.issueType,
		report13.description,
		report13.email
	);

	const report14 = {
		name: "Cameron Conway",
		date: paddedDate,
		address: "213 Bloomfield Street, Hoboken, NJ, USA",
		issueType: "potholes",
		description: "There are potholes",
		email: "test1@gmail.com",
	};

	const newReport14 = await reports.createReport(
		report14.name,
		report14.date,
		report14.address,
		report14.issueType,
		report14.description,
		report14.email
	);

	const report15 = {
		name: "Zane Thummborst",
		date: paddedDate,
		address: "704 Jefferson Street, Hoboken, NJ, USA",
		issueType: "nowater",
		description: "The area no water",
		email: "test1@gmail.com",
	};

	const newReport15 = await reports.createReport(
		report15.name,
		report15.date,
		report15.address,
		report15.issueType,
		report15.description,
		report15.email
	);

	console.log("Done seeding datebase");

	await dbConnection.closeConnection();
}

main().catch((error) => {
	console.log(error);
});
