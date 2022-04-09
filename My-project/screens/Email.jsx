import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';


export const Email = props => {
  const [status, setStatus] = useState(null)
  var P4 = ["filmarg018@pslib.cz", "jaksiln018@pslib.cz", "vojdejn@pslib.cz", "petmike018@pslib.cz", "jansmutn@pslib.cz"]
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



  const sendEmail = async (file) => {
    var options = {}
    if (file.length < 1) {
      options = {
        subject: "Sending email with attachment",
        recipients: P4,
        body: "Morodec..."
      }
    } else {
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
  return (
    <View style={styles.container}>
      <Button onPress={showAlert} title="Send Email" />

      {status !== null &&
        <View style={{ borderWidth: 2, borderColor: 'black', margin: 20, padding: 10 }}>
          <Text>{status}</Text>
        </View>
      }
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
export default Email;