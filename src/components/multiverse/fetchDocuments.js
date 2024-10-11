import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../../firebase-config";

const fetchDocuments = async () => {
  try {
    const colRef = collection(db, "exhibits");
    const q = query(colRef, where("category", "==", "Technology"));
    const docsSnap = await getDocs(q);
    const documents = [];

    docsSnap.forEach((doc) => {
      documents.push({
        id: doc.id,
        imageUrl: doc.imageUrl,
        title: doc.title,
        description: doc.description,
        category: doc.category,
        dateAdded: doc.dateAdded,
        reference: doc.reference,
        ...doc.data(),
      });
    });

    return documents;
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return [];
  }
};

export { fetchDocuments };
