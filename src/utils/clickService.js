import { firestore } from "@/firebase"
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, setDoc, addDoc } from "firebase/firestore";
import helpers from "./helpers";

export default {
    mixins: [helpers],
    methods: {
        async addClickCountForDocument(document) {
            const foundDoc = await this.getDocumentByUrl(document)

            if (!this.isEmpty(foundDoc)) {
                const docRef = doc(firestore, 'documents', foundDoc.id);
                setDoc(docRef, { clickCount: foundDoc.data.clickCount + 1 }, { merge: true });
                console.log("Document updated with ID: ", docRef.id);
            }
            else {
                const docRef = await addDoc(collection(firestore, "documents"), {
                    url: document.url,
                    clickCount: 1
                });
                console.log("Document added with ID: ", docRef.id);
            }
        },

        async getDocumentByUrl(document) {
            const clickCountRef = collection(firestore, "documents")
            const q = query(clickCountRef, where("url", "==", document.url))
            
            const querySnapshot = await getDocs(q);
            var foundDoc = {}
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                foundDoc = { id: doc.id, data: doc.data() };
            });

            return foundDoc
        },

        async getAllDocuments() {
            const clickCountRef = collection(firestore, "documents")
            const q = query(clickCountRef)
            
            const querySnapshot = await getDocs(q);
            var docs = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                docs.push({ id: doc.id, data: doc.data() });
            });
            
            return docs
        }
    }
}