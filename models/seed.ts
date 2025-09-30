// used to seed data in to each table e.g Nin and Bvn tables

// import { Bvn } from "./Bvn";
// import { Nin } from "./Nin";
// import { User, userStatus } from "./User";
// const BvnArrays = [
//   {
//     bvnNumber: 100001,
//     firstName: "John",
//     lastName: "Doe",
//     middleName: "Michael",
//   },
//   {
//     bvnNumber: 100002,
//     firstName: "Jane",
//     lastName: "Smith",
//     middleName: "Alice",
//   },
//   {
//     bvnNumber: 100003,
//     firstName: "David",
//     lastName: "Johnson",
//     middleName: "Paul",
//   },
//   {
//     bvnNumber: 100004,
//     firstName: "Emily",
//     lastName: "Williams",
//     middleName: "Grace",
//   },
//   {
//     bvnNumber: 100005,
//     firstName: "Daniel",
//     lastName: "Brown",
//     middleName: "James",
//   },
//   {
//     bvnNumber: 100006,
//     firstName: "Sophia",
//     lastName: "Jones",
//     middleName: "Rose",
//   },
//   {
//     bvnNumber: 100007,
//     firstName: "Michael",
//     lastName: "Garcia",
//     middleName: "Anthony",
//   },
//   {
//     bvnNumber: 100008,
//     firstName: "Olivia",
//     lastName: "Martinez",
//     middleName: "Faith",
//   },
//   {
//     bvnNumber: 100009,
//     firstName: "Ethan",
//     lastName: "Davis",
//     middleName: "Robert",
//   },
//   {
//     bvnNumber: 100010,
//     firstName: "Isabella",
//     lastName: "Lopez",
//     middleName: "Marie",
//   },
//   {
//     bvnNumber: 100011,
//     firstName: "James",
//     lastName: "Wilson",
//     middleName: "Henry",
//   },
//   {
//     bvnNumber: 100012,
//     firstName: "Ava",
//     lastName: "Anderson",
//     middleName: "Kate",
//   },
//   {
//     bvnNumber: 100013,
//     firstName: "Benjamin",
//     lastName: "Taylor",
//     middleName: "George",
//   },
//   {
//     bvnNumber: 100014,
//     firstName: "Mia",
//     lastName: "Thomas",
//     middleName: "Ann",
//   },
//   {
//     bvnNumber: 100015,
//     firstName: "Lucas",
//     lastName: "Hernandez",
//     middleName: "Patrick",
//   },
//   {
//     bvnNumber: 100016,
//     firstName: "Charlotte",
//     lastName: "Moore",
//     middleName: "Ellen",
//   },
//   {
//     bvnNumber: 100017,
//     firstName: "Alexander",
//     lastName: "Martin",
//     middleName: "Charles",
//   },
//   {
//     bvnNumber: 100018,
//     firstName: "Amelia",
//     lastName: "Jackson",
//     middleName: "Claire",
//   },
//   {
//     bvnNumber: 100019,
//     firstName: "Henry",
//     lastName: "Thompson",
//     middleName: "Victor",
//   },
//   {
//     bvnNumber: 100020,
//     firstName: "Harper",
//     lastName: "White",
//     middleName: "Jane",
//   },
//   {
//     bvnNumber: 100021,
//     firstName: "Matthew",
//     lastName: "Lee",
//     middleName: "Joseph",
//   },
//   {
//     bvnNumber: 100022,
//     firstName: "Ella",
//     lastName: "Harris",
//     middleName: "May",
//   },
//   {
//     bvnNumber: 100023,
//     firstName: "Jackson",
//     lastName: "Clark",
//     middleName: "Edward",
//   },
//   {
//     bvnNumber: 100024,
//     firstName: "Lily",
//     lastName: "Lewis",
//     middleName: "Ivy",
//   },
//   {
//     bvnNumber: 100025,
//     firstName: "Sebastian",
//     lastName: "Walker",
//     middleName: "David",
//   },
// ]; // this is an array or records of bvn information

// const NinArrays = [
//   {
//     ninNumber: 100001,
//     firstName: "John",
//     lastName: "Doe",
//     middleName: "Michael",
//   },
//   {
//     ninNumber: 100002,
//     firstName: "Jane",
//     lastName: "Smith",
//     middleName: "Alice",
//   },
//   {
//     ninNumber: 100003,
//     firstName: "David",
//     lastName: "Johnson",
//     middleName: "Paul",
//   },
//   {
//     ninNumber: 100004,
//     firstName: "Emily",
//     lastName: "Williams",
//     middleName: "Grace",
//   },
//   {
//     ninNumber: 100005,
//     firstName: "Daniel",
//     lastName: "Brown",
//     middleName: "James",
//   },
//   {
//     ninNumber: 100006,
//     firstName: "Sophia",
//     lastName: "Jones",
//     middleName: "Rose",
//   },
//   {
//     ninNumber: 100007,
//     firstName: "Michael",
//     lastName: "Garcia",
//     middleName: "Anthony",
//   },
//   {
//     ninNumber: 100008,
//     firstName: "Olivia",
//     lastName: "Martinez",
//     middleName: "Faith",
//   },
//   {
//     ninNumber: 100009,
//     firstName: "Ethan",
//     lastName: "Davis",
//     middleName: "Robert",
//   },
//   {
//     ninNumber: 100010,
//     firstName: "Isabella",
//     lastName: "Lopez",
//     middleName: "Marie",
//   },
//   {
//     ninNumber: 100011,
//     firstName: "James",
//     lastName: "Wilson",
//     middleName: "Henry",
//   },
//   {
//     ninNumber: 100012,
//     firstName: "Ava",
//     lastName: "Anderson",
//     middleName: "Kate",
//   },
//   {
//     ninNumber: 100013,
//     firstName: "Benjamin",
//     lastName: "Taylor",
//     middleName: "George",
//   },
//   {
//     ninNumber: 100014,
//     firstName: "Mia",
//     lastName: "Thomas",
//     middleName: "Ann",
//   },
//   {
//     ninNumber: 100015,
//     firstName: "Lucas",
//     lastName: "Hernandez",
//     middleName: "Patrick",
//   },
//   {
//     ninNumber: 100016,
//     firstName: "Charlotte",
//     lastName: "Moore",
//     middleName: "Ellen",
//   },
//   {
//     ninNumber: 100017,
//     firstName: "Alexander",
//     lastName: "Martin",
//     middleName: "Charles",
//   },
//   {
//     ninNumber: 100018,
//     firstName: "Amelia",
//     lastName: "Jackson",
//     middleName: "Claire",
//   },
//   {
//     ninNumber: 100019,
//     firstName: "Henry",
//     lastName: "Thompson",
//     middleName: "Victor",
//   },
//   {
//     ninNumber: 100020,
//     firstName: "Harper",
//     lastName: "White",
//     middleName: "Jane",
//   },
//   {
//     ninNumber: 100021,
//     firstName: "Matthew",
//     lastName: "Lee",
//     middleName: "Joseph",
//   },
//   {
//     ninNumber: 100022,
//     firstName: "Ella",
//     lastName: "Harris",
//     middleName: "May",
//   },
//   {
//     ninNumber: 100023,
//     firstName: "Jackson",
//     lastName: "Clark",
//     middleName: "Edward",
//   },
//   {
//     ninNumber: 100024,
//     firstName: "Lily",
//     lastName: "Lewis",
//     middleName: "Ivy",
//   },
//   {
//     ninNumber: 100025,
//     firstName: "Sebastian",
//     lastName: "Walker",
//     middleName: "David",
//   },
// ]; // this is an array or records of nin information
// export const createBvns = async () => {
//   await Bvn.deleteMany(); // this wwill delete all records in the bvn table
//   console.log("bvns deleted");
//   await Bvn.insertMany(BvnArrays); // this will insert all the bvnArrays in the bvn table
//   console.log("bvns inserted");
// };
// export const createNins = async () => {
//   await Nin.deleteMany(); // this wwill delete all records in the nin table
//   console.log("nins deleted");
//   await Nin.insertMany(NinArrays); // this will insert all the ninArrays in the nin table
//   console.log("nins inserted");
// };

// export const createAdminUser = async () => {
//   await User.create({
//     email: "admin@fintech.com",
//     password: "_fintech@dev001/",
//     pin: "3879",
//     phoneNumber: 37583298642,
//     fullName: "olowo admin",
//     dateOfBirth: new Date(),
//     address: "",
//     stateOfOrigin: "Edo state",
//     bvnNumber: 234234,
//     status: userStatus.active,
//     passwordTrial: 5,
//     tier: 3,
//     accountBalance: 10000000,
//   });
// };
