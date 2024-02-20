import db from '@/src/db';

import { Request, Response } from 'express';

export const authHandler = async (req: Request, res: Response) => {
  const { email, family_name, given_name, user_id } = req.body;

  if (req.headers['x-auth0-secret'] !== process.env.AUTH0_HOOK_SECRET) {
    return res.status(403).json({ message: `You must provide the secret 🤫` });
  }

  if (email) {
    await db.user.upsert({
      where: { email },
      update: {
        firstName: given_name || '',
        lastName: family_name || '',
        email: email,
        authId: user_id,
      },
      create: {
        firstName: given_name || '',
        lastName: family_name || '',
        email: email,
        authId: user_id,
      },
    });

    return res.status(201).json({
      message: `User with email: ${email} has been created successfully!`,
    });
  }
};
