// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {

    const url = typeof(req.query.slug)==='string' ? req.query.slug : req.query.slug.join('/')

    // trim trailing slash from FE host.
    const proxyBase = `${process.env.VERCEL_URL?.replace(/\/$/, '')}/proxy`

    const response = await axios({
      method: req.method as 'GET' | 'DELETE' | 'POST',
      url: `${proxyBase}/${url}`,
      headers: {
        'X-API-KEY': process.env.GOVERNATOR_API_KEY as string
      },
      data: req.body
    })

    res.status(response.status).json(response.data)
  } catch (error) {
    // console.log({
    //   //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   status: error?.response?.status,
    //   //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   data: error?.response?.data
    // })
    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.status(error?.response?.status).json(error?.response?.data.message)
  }


}
