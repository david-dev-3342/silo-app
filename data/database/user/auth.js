import {useDispatch, useSelector} from 'react-redux';
import {NativeFirebaseError} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import {ParseFirebaseError} from '../errors';
// import {StorageHelper} from '../../storage'
import axios from 'axios';
import {useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {isExistUser, userCollation} from '../../../services/FirebaseSerives';
import {setUserDetails} from '../../../redux/Actions/UserActions';

export const useAuthHook = () => {
  const [isBusy, setIsBusy] = useState(false);
  const dispatch = useDispatch();
  async function validateSignin({email, phone}) {
    setIsBusy(true);
    try {
      if (email) {
        const authResult = await auth().fetchSignInMethodsForEmail(email);
        setIsBusy(false);
        return {
          success: true,
          data: authResult,
        };
      } else if (phone) {
        const authResult = await auth().verifyPhoneNumber(phone);
        setIsBusy(false);
        return {
          success: true,
          data: authResult,
        };
      }
    } catch (ex) {
      setIsBusy(false);
      const errorCode = ex.toString().match(/\[(.*?)\]/)[1];
      return {
        error: {
          message: ParseFirebaseError[errorCode],
        },
      };
    }
  }

  async function signInWithCreds(credential) {
    setIsBusy(true);
    try {
      const authResult = await auth().signInWithCredential(credential);
      setIsBusy(false);
      return {...authResult, success: true};
    } catch (ex) {
      setIsBusy(false);
      const errorCode = ex.toString().match(/\[(.*?)\]/)[1];
      return {
        error: {
          message: ParseFirebaseError[errorCode],
        },
      };
    }
  }

  async function signInWithPhone(phoneNumber) {
    setIsBusy(true);
    try {
      const authResult = await auth().signInWithPhoneNumber(phoneNumber, true);
      setIsBusy(false);
      console.log('signInWithPhone ', authResult);
      return {data: authResult, success: true};
    } catch (ex) {
      setIsBusy(false);
      console.log('COuldnt sing in with phone:', ex);
      const errorCode = ex.toString().match(/\[(.*?)\]/)[1];
      return {
        error: {
          message: ParseFirebaseError[errorCode],
        },
      };
    }
  }
  async function signInWithEmailCreds({email, password}) {
    setIsBusy(true);
    try {
      const authResult = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const userId = authResult.user.uid;
      const userDetails = await userCollation.doc(userId).get();
      dispatch(setUserDetails(userDetails.data()));
      setIsBusy(false);
      return {...authResult, success: true};
    } catch (ex) {
      setIsBusy(false);
      console.log('COuldnt sing in:', ex);
      const errorCode = ex.toString().match(/\[(.*?)\]/)[1];
      return {
        error: {
          message: ParseFirebaseError[errorCode],
        },
      };
    }
  }

  async function signInWithLocal() {
    setIsBusy(true);
    if (!token) return;
    try {
      const authResult = await auth().signInWithCustomToken(token);
      setIsBusy(false);
      console.log('respons >> ', authResult);
      return {...authResult, success: true};
    } catch (ex) {
      setIsBusy(false);
      const errorCode = ex.toString().match(/\[(.*?)\]/)[1];
      return {
        error: {
          message: ParseFirebaseError[errorCode],
        },
      };
    }
  }

  async function signUpWithEmailCreds({email, password, name}) {
    setIsBusy(true);
    try {
      const authResult = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      setIsBusy(false);
      const user = {
        name: name,
        email: authResult.user.email,
        image:
          authResult.user.photoURL === null
            ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCVGv_UuZYSFHHJvsXgIZduF0QC1NCe_f3BXBYUwrPfw&s'
            : authResult.user.photoURL,
        _id: authResult.user.uid,
        bankDetails: [],
        created_at: new Date(),
      };

      dispatch(setUserDetails(user));
      const check = await isExistUser(authResult.user.uid);
      console.log('result.user.uid ?? ', check);
      if (!check) {
        userCollation
          .doc(authResult.user.uid)
          .set(user)
          .then(res => {
            console.log('response >> ', res);
          })
          .catch(ce => {
            console.log('catch error ', ce);
          });
      }
      return {...authResult, success: true};
    } catch (ex) {
      setIsBusy(false);
      const errorCode = ex.toString().match(/\[(.*?)\]/)[1];
      return {
        error: {
          message: ParseFirebaseError[errorCode],
        },
      };
    }
  }

  async function signInWithGoogle() {
    try {
      setIsBusy(true);
      GoogleSignin.configure({
        webClientId:
          '105634497241-tj2brn1b770b5av2pjd8g181jla0s9u0.apps.googleusercontent.com',
      });

      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const result = await signInWithCreds(googleCredential);
      setIsBusy(false);

      const user = {
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
        _id: result.user.uid,
        created_at: new Date(),
        bankDetails: [],
      };
      dispatch(setUserDetails(user));
      const check = await isExistUser(result.user.uid);
      if (!check) {
        userCollation
          .doc(result.user.uid)
          .set(user)
          .then(res => {
            console.log('response >> ', res);
          })
          .catch(ce => {
            console.log('catch error ', ce);
          });
      }
      return {...result, success: true};
      // console.log('user info for store user >. ', user);
    } catch (ex) {
      setIsBusy(false);

      return {
        error: {
          message: ex?.toString(),
        },
      };
    }
  }

  async function signOut(fireInstance) {
    try {
      await auth().signOut();
      return {success: true};
    } catch (ex) {
      const errorCode = ex.toString().match(/\[(.*?)\]/)[1];
      return {
        error: {
          message: ParseFirebaseError[errorCode],
        },
      };
    }
  }

  async function getUserIdToken(uid) {
    //   const api = process.env.REACT_APP_API_URL
    //   return axios.post(`${api}/auth/getCustomToken`, {
    //     uid,
    //   })
  }

  return {
    validateSignin,
    signInWithEmailCreds,
    signUpWithEmailCreds,
    signInWithLocal,
    signInWithCreds,
    signInWithGoogle,
    signInWithPhone,
    signOut,
    isBusy,
  };
};
