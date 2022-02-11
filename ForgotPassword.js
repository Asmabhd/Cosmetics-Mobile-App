import React, { Component, Fragment } from "react";
import { Text, SafeAreaView, View, StyleSheet, StatusBar } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "./components/Forms/FormInput.js";
import FormButton from "./components/Forms/FormButton";
import ErrorMessage from "./components/ErrorMessage";
import { withFirebaseHOC, passwordReset } from "./config/Firebase";
//import { passwordReset } from "./config/Firebase/firebase";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Entrer un email valide")
    .required("Veuillez saisir une adresse e-mail enregistrée"),
});

class ForgotPassword extends Component {
  handlePasswordReset = async (values, actions) => {
    const { email } = values;

    try {
      await passwordReset(email);
      console.log("Password reset email sent successfully");
      this.props.navigation.navigate("Login");
    } catch (error) {
      actions.setFieldError("general", error.message);
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>Mot de passe oublié ?</Text>
        <Text> {""}</Text>
        <View style={{ flex: 1, marginTop: 50 }}>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={(values, actions) => {
              this.handlePasswordReset(values, actions);
            }}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              values,
              handleSubmit,
              errors,
              isValid,
              touched,
              handleBlur,
              isSubmitting,
            }) => (
              <Fragment>
                <FormInput
                  name="email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  placeholder="Entrer un email"
                  autoCapitalize="none"
                  iconName="ios-mail"
                  iconColor="#2C384A"
                  onBlur={handleBlur("email")}
                />
                <ErrorMessage errorValue={touched.email && errors.email} />
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonType="outline"
                    onPress={handleSubmit}
                    title="envoyer un e-mail"
                    buttonColor="#039BE5"
                    disabled={!isValid || isSubmitting}
                  />
                </View>
                <ErrorMessage errorValue={errors.general} />
              </Fragment>
            )}
          </Formik>
        </View>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 150,
  },
  text: {
    paddingTop: 70,
    color: "#333",
    fontSize: 24,
    marginLeft: 25,
  },
  buttonContainer: {
    margin: 25,
  },
});

export default withFirebaseHOC(ForgotPassword);
