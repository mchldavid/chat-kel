import TimeAgo from "javascript-time-ago"

// English.
import en from "javascript-time-ago/locale/en"

TimeAgo.addDefaultLocale(en)

export const displayChatTime = (secs) => {
  if (secs !== undefined) {
    const timeAgo = new TimeAgo("en-US")
    var t = new Date(1970, 0, 1) // Epoch
    t.setSeconds(secs)
    var hrs = t.getHours()
    t.setHours(hrs + 8)
    console.log("time:", secs)
    return timeAgo.format(t, "mini-minute")
  }
}
