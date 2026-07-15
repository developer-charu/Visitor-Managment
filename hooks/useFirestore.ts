import { firestoreDb } from "@/config/firebaseConfig";
import {
  addDoc,
  collection,
  deleteField,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { Alert } from "react-native";

const useFirestore = () => {
  const create = async (data: any) => {
    try {
      if (!data?.hNo) {
        throw new Error("House Number is Required");
      }
      // console.log("Creating Residents:", data.hNo);
      await setDoc(
        doc(firestoreDb, "residents", String(data.hNo)),
        data,
      );
    } catch (error: any) {
      console.log("Error creating Document:", error.message || error);
    }
  };

  const raiseRequest = async (data: any) => {
    try {
      if (!data?.hNo) {
        throw new Error("House Number is required");
      }
      // data.isApproved = false;
      data.status = "pending";
      data.createdAt = new Date().toISOString();

      await addDoc(collection(firestoreDb, "request"), data);
    } catch (error: any) {
      console.log("Error creating Document:", error.message || error);
    }
  };

  // const getAllRequestByHno = async (hNo: any) => {
  //   try {
  //     const q = query(
  //       collection(firestoreDb, "resident"),
  //       where("hNo", "==", hNo),
  //     );
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //   } catch (error: any) {
  //     console.log("Error creating Document:", error.message || error);
  //   }
  // };

  const getAllRequestByHno = async (
    hNo: string,
    status: string | string[],
  ) => {
    try {
      let q;
      if (status === "pending") {
        q = query(
          collection(firestoreDb, "request"),
          where("hNo", "==", hNo),
          where("status", "==", "pending"),
        );
      } else if (status === "approved") {
        q = query(
          collection(firestoreDb, "request"),
          where("hNo", "==", hNo),
          where("status", "==", "approved"),
        );
      } else if (status === "disapproved") {
        q = query(
          collection(firestoreDb, "request"),
          where("hNo", "==", hNo),
          where("status", "==", "rejected"),
        );
      } else if (status === "total") {
        q = query(
          collection(firestoreDb, "request"),
          where("hNo", "==", hNo),
        );
      }
      if (q) {
        const querySnapshot = await getDocs(q);
        const res = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return res;
      }
    } catch (error: any) {
      console.error(
        "Error creating document:",
        error?.message || error,
      );
    }
  };

  const getUserDataByemail = async (email: any) => {
    try {
      const q = query(
        collection(firestoreDb, "residents"),
        where("email", "==", email),
      );
      const querySnapshot = await getDocs(q);
      const res = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return res;
    } catch (error: any) {
      console.log("Error creating Document:", error.message || error);
    }
  };

  const getUserDataByHno = async (hNo: any) => {
    const q = await query(
      collection(firestoreDb, "residents"),
      where("hNo", "==", hNo),
    );
    const querySnapshot = await getDocs(q);
    const res = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (res.length > 0) {
      return res[0];
    } else {
      return null;
    }
  };

  const updateRequestStatus = async (
    requestId: string,
    status: string,
  ) => {
    try {
      const res = await updateDoc(
        doc(firestoreDb, "request", requestId),
        { status },
      );
      return res;
    } catch (error: any) {
      console.log("Error creating Document:", error.message || error);
    }
  };

  const getAllRequestforguard = async () => {
    try {
      const q = query(
        collection(firestoreDb, "request"),
        orderBy("createdAt", "desc"),
      );
      const querySnapshot = await getDocs(q);
      const res = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return res;
    } catch (error: any) {
      console.log("Error creating Document:", error.message || error);
    }
  };

  const updateResidentUser = async (payload: any, userId: string) => {
    try {
      const q = query(
        collection(firestoreDb, "residents"),
        where("userId", "==", userId),
      );
      const querySnapshot = await getDocs(q);

      await Promise.all(
        querySnapshot.docs.map((docSnap) =>
          updateDoc(docSnap.ref, {
            ...payload,
          }),
        ),
      );
    } catch (error: any) {
      console.log("Error creating document:", error.message || error);
    }
  };

  const deletePushToken = async (hNo: string) => {
    if (!hNo) {
      Alert.alert("User Not found");
    }
    await updateDoc(doc(firestoreDb, "residents", String(hNo)), {
      pushToken: deleteField(),
    });
  };

  return {
    create,
    raiseRequest,
    getAllRequestByHno,
    getUserDataByemail,
    updateRequestStatus,
    getAllRequestforguard,
    getUserDataByHno,
    updateResidentUser,
    deletePushToken,
  };
};

export default useFirestore;
