import type { NextApiRequest, NextApiResponse } from 'next'
import nookies from 'nookies'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { PREVIEW_MODE_TOKEN } = process.env
  const { accessToken } = nookies.get({ req })

  if (!PREVIEW_MODE_TOKEN || !accessToken) {
    return res.status(401).json({ error: 'Preview mode not enabled' })
  }

  if (!req.query.secret || req.query.secret !== process.env.PREVIEW_MODE_TOKEN) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  res.setPreviewData({})
  res.redirect('/')
}
