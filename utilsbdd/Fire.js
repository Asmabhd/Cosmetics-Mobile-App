import firebase from "firebase";

import firebaseConfig from "../config/Firebase/firebaseConfig";
class Fire {
  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  addPost = async ({ text, localUri }) => {
    const remoteUri = await this.uploadPhotoAsync(localUri);

    return new Promise((res, rej) => {
      this.firestore
        .collection("posts")
        .add({
          text,
          uid: 3,
          timestamp: this.timestamp,
          image: remoteUri,
        })

        .then((ref) => {
          res(ref);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };
  getPosts = async () => {
    return firebase
      .firestore()
      .collection("posts")
      .get()
      .then(function (querySnapshot) {
        let posts = querySnapshot.docs.map((doc) => doc.data());
        // console.log(posts)
        return posts;
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

  uploadPhotoAsync = async (uri) => {
    const path = `photos/${this.uid}/${Date.now()}.jpg`;

    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase.storage().ref(path).put(file);

      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
