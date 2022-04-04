import {
  RETWEET_COLLECTION,
  USER_COLLECTION,
  LIKE_COLLECTION,
} from "@/firebase";

export default async (tweet, currentUser) => {
  // 유저 정보 추가
  const doc = await USER_COLLECTION.doc(tweet.uid).get();
  tweet.profile_image_url = doc.data().profile_image_url;
  tweet.email = doc.data().email;
  tweet.username = doc.data().username;

  // 리트윗 했는지 안했는지 정보 추가
  const retweetSnapshot = await RETWEET_COLLECTION.where(
    // 트윗 아이디가 같은지
    "from_tweet_id",
    "==",
    tweet.id
  ) // uid가 같은지
    .where("uid", "==", currentUser.uid)
    .get();

  // retweetSnapshot이 비었으면 isRetweeted가 false
  if (retweetSnapshot.empty) {
    tweet.isRetweeted = false;
  } else {
    tweet.isRetweeted = true;
  }

  // 좋아요 했는지 안했는지 정보 추가
  const likeSnapshot = await LIKE_COLLECTION.where(
    // 트윗 아이디가 같은지
    "from_tweet_id",
    "==",
    tweet.id
  ) // uid가 같은지
    .where("uid", "==", currentUser.uid)
    .get();

  // likeSnapshot이 비었으면 isLiked false
  if (likeSnapshot.empty) {
    tweet.isLiked = false;
  } else {
    tweet.isLiked = true;
  }
  return tweet;
};
