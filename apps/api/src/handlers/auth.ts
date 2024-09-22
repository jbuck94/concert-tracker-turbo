import { Request, Response } from 'express';
import { getOrThrow } from 'runtime';

import { getEnhancedDB } from 'src/db';

export const authHandler = async (req: Request, res: Response) => {
  // Define a type for the request body
  interface AuthRequestBody {
    email: string;
    family_name: string;
    given_name: string;
    user_id: string;
  }

  const { email, family_name, given_name, user_id } =
    req.body as AuthRequestBody; // Cast req.body to the defined type

  if (req.headers['x-auth0-secret'] !== getOrThrow('AUTH0_HOOK_SECRET')) {
    return res.status(403).json({ message: `You must provide the secret 🤫` });
  }

  if (email) {
    await getEnhancedDB().user.upsert({
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
