import firestore from '@react-native-firebase/firestore';


const userCollation = firestore().collection('userProfile');
const bankAccount = firestore().collection('bankAccount');

const isExistUser = async docId => {
  const userDocRef = userCollation.doc(docId);
  const doc = await userDocRef.get();
  return doc.exists;
  if (!doc.exists) {
    console.log('No such document exista!');
    return false;
  } else {
    console.log('Document data:', doc.data());
    return true;
  }
};

export {userCollation, bankAccount, isExistUser};
