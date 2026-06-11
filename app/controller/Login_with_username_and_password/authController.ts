import { Router, Request, Response } from 'express';
import {
  authFailureSchema,
  authSuccessSchema,
  googleCallbackSchema,
  loginSchema
} from '../../data/Login_with_username_and_password/authSchemas.js';
import { authenticateGoogle, authenticateUser } from '../../data/Login_with_username_and_password/authService.js';

const authController = Router();

async function handleLoginRequest(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      status: 'failed',
      status_code: 400,
      error_message: 'Invalid request body',
      data: []
    });
  }

  const result = authenticateUser(parsed.data.username, parsed.data.password);

  if (result.status === 'success') {
    return res.status(200).json(result);
  }

  return res.status(result.status_code).json({
    status: 'failed',
    status_code: result.status_code,
    error_message: result.error_message,
    data: []
  });
}

async function handleGoogleCallback(req: Request, res: Response) {
  const parsed = googleCallbackSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      status: 'failed',
      status_code: 400,
      error_message: 'Invalid Google callback payload',
      data: []
    });
  }

  const result = authenticateGoogle(parsed.data);

  if (result.status === 'success') {
    return res.status(200).json(result);
  }

  return res.status(result.status_code).json({
    status: 'failed',
    status_code: result.status_code,
    error_message: result.error_message,
    data: []
  });
}

authController.post('/login/auth', handleLoginRequest);
authController.post('/auth/login', handleLoginRequest);
authController.post('/auth/google/callback', handleGoogleCallback);

export default authController;
