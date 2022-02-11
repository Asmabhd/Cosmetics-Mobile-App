import firebase from "firebase";

import uuid from "uuid";

//import "firebase/firestore";
//import firebaseConfig from "../config/Firebase/firebaseConfig";

const Firebase = {
  uploadPost: (post) => {
    const id = uuid.v4();
    const uploadData = {
      id: id,
      postPhoto: post.photo,
      postTitle: post.title,
      postDescription: post.description,
      likes: [],
    };
    return firebase.firestore().collection("posts").doc(id).set(uploadData);
  },

  getPosts: async () => {
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
  },
  getUsers: async () => {
    return firebase
      .firestore()
      .collection("users")
      .get()
      .then(function (querySnapshot) {
        let posts = querySnapshot.docs.map((doc) => doc.data());
        // console.log(posts)
        return users;
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  },
  getcomments: async () => {
    return firebase
      .firestore()
      .collection("comments")
      .get()
      .then(function (querySnapshot) {
        let posts = querySnapshot.docs.map((doc) => doc.data());
        // console.log(posts)
        return comments;
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  },
};

export default Firebase;
