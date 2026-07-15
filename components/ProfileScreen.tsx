import { useAuthContext } from "@/context/Auth";
import useFirestore from "@/hooks/useFirestore";
import { Link } from "expo-router";
import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useAuth from "./hooks/useAuth";

export default function ProfileScreen() {
  const { logOut } = useAuth();
  const { user } = useAuthContext();
  const { deletePushToken } = useFirestore();

  const handleLogout = async (hNo: string) => {
    if (user) {
      await deletePushToken(hNo);
    }
    await logOut();
    Alert.alert("Sucessfully Signed Out");
  };

  return (
    <View style={styles.container}>
      <Link
        href={{
          pathname: "/request/[requests]",
          params: { requests: "pending" },
        }}
        style={styles.card}
      >
        <Text>Pending Approvals\n12</Text>
      </Link>
      <Link
        href={{
          pathname: "/request/[requests]",
          params: { requests: "total" },
        }}
        style={styles.card}
      >
        <Text>Total Visitors\n120</Text>
      </Link>
      <Link
        href={{
          pathname: "/request/[requests]",
          params: { requests: "approved" },
        }}
        style={styles.card}
      >
        <Text>Visitors Approved\n85</Text>
      </Link>
      <Link
        href={{
          pathname: "/request/[requests]",
          params: { requests: "disapproved" },
        }}
        style={styles.card}
      >
        <Text>Visitors Disapproved\n23</Text>
      </Link>
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleLogout(user?.hNo)}
      >
        <View>
          <Text>Logout</Text>
        </View>
      </TouchableOpacity>
      <Link href={"/VisitorRequests"} style={styles.card}>
        <Text>Raise Request </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    height: 120,
    backgroundColor: "#3b82f6",
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
