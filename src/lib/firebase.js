import { initializeApp } from "firebase/app";
import Constants from 'expo-constants';

// 認証
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateEmail
} from "firebase/auth";

// データベース
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    collection,
    updateDoc,
    addDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    docs
} from "firebase/firestore";

// ストレージ
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const firebaseConfig = Constants.manifest.extra.firebase;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ユーザ新規登録(メール)
export const signupUser = async (email, password) => {
    const userID = createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const userRef = doc(db, "UserInfo", user.uid);
            const userInfo = {
                name: "未設定ユーザ",
                email: user.email,
                Image: null,
                phone: "",
                birthDate: "",
            }
            await setDoc(userRef, userInfo)
            return ({ id: user.uid, ...userInfo });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    return (userID);
}

// ユーザログイン（メール）
export const loginUser = (email, password) => {
    const userID = signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const userInfo = await getUser(user.uid);
            return ({ id: user.uid, ...userInfo });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    return userID;
};

// ユーザ情報取得
export const getUser = async (userID) => {
    const UserRef = doc(db, "UserInfo", userID);
    const Users = await getDoc(UserRef);
    const UserInfo = Users.data();
    return ({ ...UserInfo, id: userID });
}

// 画像アップロード
export const uploadImage = async (uri, path) => {
    const localUri = await fetch(uri);
    const blob = await localUri.blob();

    const storageRef = ref(storage, path);

    let downloadUrl = "";
    try {
        await uploadBytes(storageRef, blob);
        downloadUrl = await getDownloadURL(storageRef);
    } catch (err) {
        console.log(err);
    }
    return downloadUrl;
}

// 画像削除
export const delImage = async (storagePath) => {
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
}

// ユーザー情報更新
export const updateUser = async (userID, userInfo) => {
    const UserRef = doc(db, "UserInfo", userID);
    await updateDoc(UserRef, userInfo);
    updateEmail(auth.currentUser, userInfo.email);
}

// 記事の保存
export const keepArticle = async (userID, article) => {
    const UserRef = doc(db, "UserInfo", userID);
    const ArticleCol = collection(UserRef, "news");
    await addDoc(ArticleCol, article);
    console.log("追加");
}

// 記事の削除
export const deleteArticle = async (userID, articleID) => {
    const UserRef = doc(db, "UserInfo", userID);
    const ArticleRef = doc(UserRef, "news", articleID);
    await deleteDoc(ArticleRef);
    console.log("削除");
}

// 記事の保存確認
export const keepCheck = async (userID, url) => {
    const UserRef = doc(db, "UserInfo", userID);
    const ArticleCol = collection(UserRef, "news");
    const urlQuery = query(ArticleCol, where("url", "==", url));
    const querySnapshot = await getDocs(urlQuery);
    const docIds = querySnapshot.docs.map((doc) => doc.id);
    return docIds;
}

// 保存記事の取得
export const getKeep = async (userID) => {
    const userRef = doc(db, "UserInfo", userID);
    const articleCol = collection(userRef, "news");
    const querySnapshot = await getDocs(articleCol);
    const articles = querySnapshot.docs.map((doc) => {
        return {
            ...doc.data(),
        };
    });
    return articles;
}
