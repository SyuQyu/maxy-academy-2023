import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import app from './firebase';

const db = getFirestore(app);

const q = query(collection(db, "note"));

const querySnapshot = getDocs(q);

export default querySnapshot;