import useFirestore from "@/hooks/useFirestore";
import useNotifications from "@/hooks/useNotifications";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import HouseDropdown from "./HouseDropdown";
import useAuth from "./hooks/useAuth";

const { width } = Dimensions.get("window");

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hNo, sethNo] = useState("");
  const [secureText, setSecureText] = useState(true);
  const { signupResidents } = useAuth();
  const { create, updateResidentUser } = useFirestore();
  const router = useRouter();
  const { registerForPushNotificationsAsync } = useNotifications();

  const handleReset = () => {
    setName("");
    setEmail("");
    setPassword("");
    sethNo("");
  };

  const handleSubmit = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Error", "Please fill all fields");
        return;
      }
      const res = await signupResidents(email, password);

      // if (res?.user) {
      //   await create({
      //     uid: res.user.uid,
      //     name,
      //     email,
      //     hNo,
      //   });
      // }

      if (res?.user) {
        let pushToken;
        try {
          pushToken =
            (await registerForPushNotificationsAsync()) || "";
          const payload = { pushToken };
          await updateResidentUser(payload, res.user.uid);
        } catch (error: any) {
          console.log("55,Firebase token error", error.msg);
        }
        const payload = {
          userId: res?.user.uid,
          name,
          email,
          hNo,
          pushToken,
        };
        await create(payload);
        router.push("/profile");
        handleReset();
      }
      Alert.alert("Success,Signed up successfully!");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f0fdf4" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f0fdf4" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.title}>Sigma Greens</Text>
            <Text style={styles.subtitle}>
              Visitor Management Register
            </Text>

            <View style={styles.card}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#94a3b8"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#94a3b8"
                value={email}
                onChangeText={setEmail}
              />

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={secureText}
                  value={password}
                  onChangeText={setPassword}
                />

                <TouchableOpacity
                  onPress={() => setSecureText(!secureText)}
                >
                  <Text style={styles.toggle}>
                    {secureText ? "Show" : "Hide"}
                  </Text>
                </TouchableOpacity>
              </View>

              <HouseDropdown value={hNo} setValue={sethNo} />

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitText}>
                    Create your Account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  container: {
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    color: "#166534",
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 25,
  },

  card: {
    width: width * 0.9,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
    elevation: 4,
  },

  input: {
    backgroundColor: "#f1f5f9",
    color: "#111",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#d1fae5",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#d1fae5",
  },

  passwordInput: {
    flex: 1,
    padding: 14,
    color: "#111",
  },

  toggle: {
    color: "#16a34a",
    fontWeight: "600",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  resetBtn: {
    flex: 1,
    padding: 14,
    backgroundColor: "#e5e7eb",
    borderRadius: 12,
    marginRight: 10,
    alignItems: "center",
  },

  submitBtn: {
    flex: 1,
    padding: 14,
    backgroundColor: "#16a34a",
    borderRadius: 12,
    alignItems: "center",
  },

  resetText: {
    color: "#374151",
    fontWeight: "600",
  },

  submitText: {
    color: "#fff",
    fontWeight: "700",
  },
});
