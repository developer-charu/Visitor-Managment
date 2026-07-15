// import { useAuthContext } from "@/context/Auth";
// import useFirestore from "@/hooks/useFirestore";
// import Icon from "@expo/vector-icons/MaterialIcons";
// import React, { useEffect, useState } from "react";
// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const RequestCard = ({ item }: { item: any }) => {
//   return (
//     <View style={styles.card}>
//       <View style={styles.infoContainer}>
//         <Text style={styles.name}>{item.name}</Text>

//         <View style={styles.row}>
//           <Text style={styles.label}>Reason:</Text>
//           <Text style={styles.value}>{item.reason}</Text>
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>Contact:</Text>
//           <Text style={styles.value}>{item.contact}</Text>
//         </View>
//       </View>
//       <View style={styles.actions}>
//         <TouchableOpacity
//           style={[styles.iconButton, styles.acceptButton]}
//         >
//           <Icon name="check" size={24} color="#fff" />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.iconButton, styles.rejectButton]}
//         >
//           <Icon name="close" size={24} color="#fff" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const PendingRequest = () => {
//   const { getAllRequestByHno } = useFirestore();
//   const { user } = useAuthContext();
//   const [requests, setrequests] = useState<any>("");

//   useEffect(() => {
//     const fetchRequest = async (hNo: string) => {
//       const data=await getAllRequestByHno(hNo);
//          setrequests(data)
//     };
//     if (user) {
//       fetchRequest(user?.hNo);
//     }
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Visitor Requests</Text>

//       <FlatList
//         data={requests}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => <RequestCard item={item} />}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// export default PendingRequest;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F7FB",
//     padding: 16,
//   },

//   header: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 16,
//     color: "#1E293B",
//   },

//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 14,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",

//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//     elevation: 3,
//   },

//   infoContainer: {
//     flex: 1,
//     paddingRight: 12,
//   },

//   name: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 10,
//   },

//   row: {
//     flexDirection: "row",
//     marginBottom: 6,
//   },

//   label: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#475569",
//     width: 70,
//   },

//   value: {
//     fontSize: 14,
//     color: "#334155",
//     flex: 1,
//   },

//   actions: {
//     justifyContent: "space-between",
//     alignItems: "center",
//     height: 90,
//   },

//   iconButton: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   acceptButton: {
//     backgroundColor: "#22C55E",
//   },

//   rejectButton: {
//     backgroundColor: "#EF4444",
//   },
// });
