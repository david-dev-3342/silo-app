import React, {createElement, useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {PlaidLink, LinkExit, LinkSuccess} from 'react-native-plaid-link-sdk';
import {useSelector} from 'react-redux';
import {CTAButton, Divider, ScreenContainer} from '../../../global/components';
import CreateLinkToken from '../../../services/API_actions';
import {bankAccount, userCollation} from '../../../services/FirebaseSerives';
import AccountList from './AccountList';
import ChartSection from './ChartSection';
import NetWorthBox from './components/NetWorthBox';

export default () => {
  const [linkToken, setLinkToken] = useState(null);
  const user = useSelector(state => state.userReducer?.userDetails);
  const [userDetails, setUserDetails] = useState(null);
  const [bankList, setBankList] = useState([]);
  const getUserDetails = async () => {
    const userDocRef = userCollation.doc(user?._id);
    const doc = await userDocRef.get();
    const userData = doc?._data;
    setUserDetails(userData);
    setBankList(userData?.bankDetails);
  };
  console.log('bank details >>> ', bankList);
  useEffect(() => {
    createLinkToken();
    getUserDetails();
  }, []);

  const [accessToken, setAccessToken] = useState(null);

  const createLinkToken = async () => {
    await fetch(
      `https://us-central1-silo-40612.cloudfunctions.net/createPayment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: user?.name, id: user?._id}),
      },
    )
      .then(response => response.json())
      .then(data => {
        console.log('data?.link_token  ', data?.link_token);
        setLinkToken(data?.link_token);
      })
      .catch(err => {
        console.log('errr>>. ', err);
      });
  };

  const getBankDetails = (AToken, accountData) => {
    const acDetails = accountData?.account;
    // console.log('accountData ??? ', accountData);
    // console.log(' accountData?.accounts >>  ', acDetails);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = {
      accessToken: AToken?.accessToken,
    };

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(raw),
    };

    fetch(
      'https://us-central1-silo-40612.cloudfunctions.net/accountsDetails',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        const responseData = JSON.parse(result);
        // console.log('accountsDetails response ', responseData.accounts);
        const bank = {
          userName: acDetails.name,
          balance: responseData.accounts[0]?.balances?.available,
          bankName: accountData.institution?.name,
        };
        const ud = {...userDetails};
        let bd = [...ud?.bankDetails];
        const bnk = {
          bankDetails: [ud?.bankDetails !== undefined ? bd.push(bank) : bank],
        };
        console.log('bnk >>> ', bd);

        const updateData = {
          ...ud,
          ...bnk,
        };
        // const update = (ud.bankAccounts = updateData);
        if (ud?.bankDetails !== undefined) {
          userCollation.doc(userDetails?._id).update({bankDetails: bd});
        } else {
          userCollation.doc(userDetails?._id).set(updateData);
        }

        console.log('Update bank details >> ', updateData);
        getUserDetails();
        // console.log('bank obj>>> ', ud);
        // userCollation.doc(userDetails?._id).set({
        //   ...userDetails,
        //   bankDetails: [ud?.bankDetails, ...bank],
        // });
      })
      .catch(error => console.log('error', error));
  };

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.first_section}
        showsVerticalScrollIndicator={false}>
        <NetWorthBox netWorth="216,201.97" />
        <ChartSection />
        <Divider />
        <AccountList bankList={bankList} />
      </ScrollView>
      <Divider />
      <View style={styles.btn_section}>
        {/* <CTAButton
          label="Add New Account"
          onPress={() => createLinkToken()}
          style={styles.btnStyle}
        /> */}
        {linkToken && (
          <PlaidLink
            tokenConfig={{
              token: linkToken,
              noLoadingState: false,
            }}
            onSuccess={async (success: LinkSuccess) => {
              console.log('LinkSuccess ', success);
              // const ac = success.metadata.accounts;
              const accountData = JSON.parse(success.metadata.metadataJson);
              // bankAccount.doc(userDetails?._id).set(bankDetails),
              console.log(
                'metadataJson',
                JSON.parse(success.metadata.metadataJson),
              );
              // console.log(
              //   '>> metadataJson >> ',
              //   JSON.stringify(success.metadata.metadataJson, null, 4),
              // ),
              // );
              await fetch(
                `https://us-central1-silo-40612.cloudfunctions.net/ExchangePublic_token`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({public_token: success.publicToken}),
                },
              )
                .then(response => response.text())
                .then(result => {
                  const res = JSON.parse(result);
                  console.log('acccc >> ', res?.accessToken);
                  setAccessToken(res?.accessToken);
                  getBankDetails(res, accountData);
                })
                .catch(err => {
                  console.log(err);
                });

              // navigation.navigate('Success', success);
            }}
            onExit={(response: LinkExit) => {
              console.log('LinkExit', response);
            }}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Add New Account</Text>
            </View>
          </PlaidLink>
        )}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  first_section: {},
  btn_section: {height: 96, justifyContent: 'center'},
  btnStyle: {
    height: 48,
  },
  buttonContainer: {
    backgroundColor: '#A586DD',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
});
