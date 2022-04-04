import { LIKE_COLLECTION, TWEET_COLLECTION } from "../firebase";
import store from "../store";
import firebase from "firebase/compat";

export default async (tweet) => {
  try {
    // 이미 좋아요한 상황
    if (tweet.isLiked) {
      // 리트윗 doc 삭제
      const snapshot = await LIKE_COLLECTION.where(
        "from_tweet_id",
        "==",
        tweet.id
      )
        .where("uid", "==", store.state.user.uid)
        .get();
      await snapshot.docs[0].ref.delete();
      // 좋아요 숫자 올리지 않기
      await TWEET_COLLECTION.doc(tweet.id).update({
        num_likes: firebase.firestore.FieldValue.increment(-1),
      });
    } else {
      // 좋아요하지 않은 상황
      // 좋아요 컬력션 가져오기
      const doc = LIKE_COLLECTION.doc();
      // 리트윗 컬렉션에 정보 저장
      await doc.set({
        id: doc.id,
        from_tweet_id: tweet.id,
        uid: store.state.user.uid,
        create_at: Date.now(),
      });
      // 좋아요 수 1 증가
      await TWEET_COLLECTION.doc(tweet.id).update({
        num_likes: firebase.firestore.FieldValue.increment(1),
      });
    }
  } catch (e) {
    console.log("hanlde retweet error:", e);
  }
};
