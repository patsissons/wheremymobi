import isofetch from 'isomorphic-fetch';
import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const {uri} = req.query;

    if (typeof uri !== 'string') {
      throw new Error('Invalid request');
    }

    const result = await isofetch(uri);

    const output = await result.json();

    res.status(200).json(output);
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('Unable to fetch stations', error, req);
    res.status(500).write(error.toString());
  }
}
