// pages/api/auth/error-handler.js
import { NextApiRequest, NextApiResponse } from 'next';

const errorHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const error = req.query.error;
  console.error(`Error: ${error}`);
  res.status(500).json({ error: 'Server error' });
};

export default errorHandler;