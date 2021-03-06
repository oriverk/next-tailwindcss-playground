// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function helloAPI(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
