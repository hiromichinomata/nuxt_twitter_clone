import formidable from "formidable"
import { tweetTransformer } from "~~/server/transformers/tweet.js"
import { createTweet } from "../../../db/tweets.js"
import { createMediaFile } from "../../../db/mediaFiles.js"
// import { uploadToCloudinary } from "../../../utils/cloudinary.js"

export default defineEventHandler(async (event) => {

    const form = formidable({})

    const response = await new Promise((resolve, reject) => {
        form.parse(event.req, (err, fields, files) => {
            if (err) {
                reject(err)
            }
            resolve({ fields, files })
        })
    })

    const { fields, files } = response

    // 文字列/配列/undefined を吸収して正規化
    const first = (v) => Array.isArray(v) ? v[0] : v
    const normalizeField = (v) => {
      const x = first(v)
      if (x === undefined || x === null) return null
      const s = String(x).trim()
      return (s === '' || s === 'null' || s === 'undefined') ? null : s
    }

    const text = normalizeField(fields?.text) ?? ''


    const userId = event.context?.auth?.user?.id

    const tweetData = {
        text: text,
        authorId: userId
    }

    const replyToId = normalizeField(fields?.replyTo)
    if (replyToId) {
      tweetData.replyToId = replyToId
    }

    const tweet = await createTweet(tweetData)

    const filePromises = Object.keys(files || {}).map(async key => {
        const file = files[key] // File | File[]
        const list = Array.isArray(file) ? file : [file]

        // const cloudinaryResource = await uploadToCloudinary(file.filepath)

        await Promise.all(list.filter(Boolean).map(f =>
          createMediaFile({
            url: "https://picsum.photos/200/200",
            providerPublicId: "picsum",
            userId,
            tweetId: tweet.id
          })
        ))
        return null
    })

    await Promise.all(filePromises)

    return {
        tweet: tweetTransformer(tweet)
    }
})