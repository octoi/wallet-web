// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { addWallet, getWallet, getWallets } from '@/lib/model/wallet.model';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    if (req.query?.id) {
      getWallet(parseInt(req.query?.id as string))
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json({ message: err?.message }));
    } else {
      getWallets()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json({ message: err?.message }));
    }
  }

  if (req.method == 'POST') {
    addWallet(req.body).then(() => {});
  }
}
