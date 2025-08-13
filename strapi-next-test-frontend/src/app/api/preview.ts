import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { preview_secret, status, slug } = req.query;

  if (preview_secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid preview secret' });
  }

  // Optional: Only enable draft if actually in draft
  res.setDraftMode({ enable: status === 'draft' });

  // Example: redirect to slug or home
  const redirectUrl = slug ? `/${slug}` : '/';

  return res.redirect(307, redirectUrl);
}
