import HouseDropdown from "@/components/HouseDropdown";
import useFirestore from "@/hooks/useFirestore";
import useNotifications from "@/hooks/useNotifications";
import { Link, useRouter } from "expo-router";
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

const { width } = Dimensions.get("window");

const VisitorRequests = () => {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [contact, setContact] = useState("");
  const [hNo, setHno] = useState("");
  const { raiseRequest, getUserDataByHno } = useFirestore();
  const router = useRouter();
  const { sendPushNotification } = useNotifications();

  const handleReset = () => {
    setName("");
    setReason("");
    setContact("");
    setHno("");
  };

  const handleSubmit = async () => {
    if (!name || !reason || !contact || !hNo) {
      Alert.alert("Please Fill All Fields");
    }
    await raiseRequest({ name, reason, contact, hNo });

    const res: any = await getUserDataByHno(hNo);
    if (res) {
      const msg = `Name:${name} \n Reason:${reason}`;
      sendPushNotification(res.pushToken, msg);
    }

    router.push({
      pathname: "/request/[requests]",
      params: { requests: "guard" },
    });
    handleReset();
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
            <Text style={styles.title}>Visitor Request Form</Text>
            <Text style={styles.subtitle}></Text>

            <View style={styles.card}>
              <TextInput
                style={styles.input}
                placeholder="Visitor Name"
                placeholderTextColor="#94a3b8"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Contact number"
                placeholderTextColor="#94a3b8"
                value={contact}
                onChangeText={setContact}
              />

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Reason"
                  placeholderTextColor="#94a3b8"
                  value={reason}
                  onChangeText={setReason}
                  multiline
                  numberOfLines={10}
                />
              </View>
              <HouseDropdown value={hNo} setValue={setHno} />

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitText}>Send Request</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={handleSubmit}
                >
                  <Link
                    href={{
                      pathname: "/request/[requests]",
                      params: { requests: "guard" },
                    }}
                  >
                    <Text style={styles.submitText}>
                      View all Request
                    </Text>
                  </Link>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default VisitorRequests;

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
