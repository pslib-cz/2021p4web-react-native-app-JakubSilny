import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MailComposer from 'expo-mail-composer';
import * as React from "react";
import * as SMS from "expo-sms";

export default function App() {
  const [status, setStatus] = useState(null)
  const [SMSstatus, setSmsstatus] = useState(null)
  var P4 = ["filmarg018@pslib.cz", "jaksiln018@pslib.cz", "vojdejn@pslib.cz", "petmike018@pslib.cz", "jansmutn@pslib.cz"]
  var numbers = ["+420732428076", "+420606032398"]
  const showAlert = () =>
    Alert.alert(
      "No vyber něco",
      "Přidej file",
      [
        {
          text: "No",
          onPress: () => { sendEmail([]) },
          style: "cancel"
        },
        { text: "Yes", onPress: sendEmailWithAttachment }
      ]
    );



    const sendEmail = async(file) => {
      var options = {}
      if(file.length < 1){
        options = {
          subject: "Sending email with attachment",
          recipients: P4,
          body: "Morodec..."
        }
      }else{
        options = {
          subject: "Sending email with attachment",
          recipients: P4,
          body: "Morodec...",
          attachments: file
        }
      }
      let promise = new Promise((resolve, reject) => {
        MailComposer.composeAsync(options)
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
      })
  
      promise.then(
        result => setStatus("Status: email " + result.status),
        error => setStatus("Status: email " + error.status)
      )
    }
  const sendEmailWithAttachment = async () => {
    //get the email. 
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    let idk
    idk = setStatus("Status: email " + result.result)
    console.log(result.result)

    if (!result.cancelled) {
      console.log(result.uri)
      sendEmail([result.uri]);
    } else {
      sendEmail([])
    }

  }
  smsSender = async () => {
    try {
      const status = await SMS.sendSMSAsync(
        numbers,
        'you up?'
      )
      let result;
      result = setSmsstatus("Status: SMS " + status.result)

    } catch (error) {
      console.log(error)
    }


  };



  return (
    <View style={styles.container}>
      <Button onPress={showAlert} title="Send Email" />
      <Button onPress={smsSender} title="Send SMS" />

      {status !== null &&
        <View style={{ borderWidth: 2, borderColor: 'black', margin: 20, padding: 10 }}>
          <Text>{status}</Text>
        </View>
      }

      {SMSstatus !== null &&
        <View style={{ borderWidth: 2, borderColor: 'black', margin: 20, padding: 10 }}>
          <Text>{SMSstatus}</Text>
        </View>
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});