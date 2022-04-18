import { TWEET_COLLECTION, USER_COLLECTION } from "@/firebase";
import firebase from "firebase/compat";

export default async (tweetBody, currentUser) => {
  // 비동기 연산이 수행되었을 때 성공, 실패 결과 값
  return new Promise(async (resolve, reject) => {
    try {
      const doc = TWEET_COLLECTION.doc();
      await doc.set({
        id: doc.id,
        tweet_body: tweetBody,
        uid: currentUser.uid,
        profile_image_url: currentUser.profile_image_url,
        created_at: Date.now(),
        num_comments: 0,
        num_retweets: 0,
        num_likes: 0,
      });

      // 트윗 수 1 증가시키기
      await USER_COLLECTION.doc(currentUser.uid).update({
        num_tweets: firebase.firestore.FieldValue.increment(1),
      });
      // 성공했을 때
      resolve(true);
    } catch (e) {
      reject(`error:`, e);
    }
  });
};
