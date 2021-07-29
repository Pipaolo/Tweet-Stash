// created_at: 'Tue Nov 20 11:08:20 +0000 2018',
//     id: 1064837844370284500,
//     id_str: '1064837844370284544',
//     text: 'Pano mag code, *Thinking emoji... HAHAHAHA',
//     truncated: false,
//     entities: { hashtags: [], symbols: [], user_mentions: [], urls: [] },
//     source: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
//     in_reply_to_status_id: null,
//     in_reply_to_status_id_str: null,
//     in_reply_to_user_id: null,
//     in_reply_to_user_id_str: null,
//     in_reply_to_screen_name: null,
//     user: {
//       id: 3062701063,
//       id_str: '3062701063',
//       name: 'Pipaolo',
//       screen_name: 'PeeEmGeeeeTeee',
//       location: 'National Capital Region',
//       description: 'I can do all things through Christ who strengthens me. Philippians 4:13 \n' +
//         '\n' +
//         '💕 Madelyne Rome 💕',
//       url: null,
//       entities: [Object],
//       protected: false,
//       followers_count: 194,
//       friends_count: 427,
//       listed_count: 0,
//     coordinates: null,
//     place: null,
//     contributors: null,
//     is_quote_status: false,
//     retweet_count: 1,
//     favorite_count: 2,
//     favorited: false,
//     retweeted: false,
//     lang: 'tl'
//   }

export interface ReTweet {
  created_at: string
  id: number
  id_str: string
  text: string
  truncated: boolean
  source: string
  in_reply_to_status_id: number
  in_reply_to_status_id_str: string
  in_reply_to_user_id: number
  in_reply_to_user_id_str: string
  retweet_count: number
  favorite_count: number
  favorited: boolean
  retweeted: boolean
}
