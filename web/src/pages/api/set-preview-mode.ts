import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { NEXT_PUBLIC_PREVIEW_MODE_TOKEN } = process.env

  if (!NEXT_PUBLIC_PREVIEW_MODE_TOKEN) {
    return res.status(401).json({ error: 'Preview mode not enabled' })
  }

  if (!req.query.secret || req.query.secret !== NEXT_PUBLIC_PREVIEW_MODE_TOKEN) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  res.setPreviewData(NEXT_PUBLIC_PREVIEW_MODE_TOKEN, {
    maxAge: 60 * 60 // 1 hour
  })

  res.redirect('/')
}
