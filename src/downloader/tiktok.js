const { default: fetch } = require('node-fetch')
const { expandedUrl } = require('../tools')

module.exports = {
  async tiktokDownloader(url) {
    return new Promise(async (resolve, reject) => {
      const firstUnShort = await expandedUrl(url)
      if (firstUnShort.includes('t.tiktok.com')) url = expandedUrl(firstUnShort)
      else url = firstUnShort
      const rawUrl = `https://tiktok.com/node/share/video/${url.split('/')[3]}/${url.split('/')[5]}`
      const fetc = await fetch(rawUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36 Edg/84.0.522.52',
        },
      })
      const res = await fetc.json()
      const result = res.seoProps
      const json = {
        ...result.metaParams,
        ...res.itemInfo.itemStruct,
      }
      resolve(json)
    })
  },
}
