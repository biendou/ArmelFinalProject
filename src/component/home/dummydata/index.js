// const createDummyData = id => {
//   // Generate a random user ID.
//   const userID = id; //Math.floor(Math.random() * 10);

//   // Generate a random user name.
//   const userName = `user_${userID}@gmail.com`;

//   // Generate a random longitude.
//   const longitude = Math.floor(Math.random() * 180) - 90;

//   // Generate a random latitude.
//   const latitude = Math.floor(Math.random() * 90) - 45;

//   // Generate a random place name.
//   const placeName = `Place_${userID}`;

//   // Create the dummy data.
//   const dummyData = {
//     userID: userID,
//     userName: userName,
//     longitude: longitude,
//     latitude: latitude,
//     placeName: placeName,
//     author: 'Biendou',
//   };

//   return dummyData;
// };
// const postdatadummy = data => {
//   firestore()
//     .collection('Test')
//     .add({
//       userId: data?.userID,
//       userName: data?.userName,
//       longitude: data.longitude,
//       latitude: data.latitude,
//       placeName: data.placeName,
//       author: 'Biendou',
//     })
//     .then(() => {
//       console.log('dummy added!', data.userName);
//     });
// };

// useEffect(() => {
// const filler = () => {
//   for (let x = 0; x < 6; x++) {
//     let j = Math.floor(Math.random() * 10);
//     let pion = createDummyData(x);
//     for (let i = 0; i < j; i++) {
//       postdatadummy(pion);
//     }
//   }
// };
// filler(); //          <----------------- uncomment this to fill the database with dummy data
///
