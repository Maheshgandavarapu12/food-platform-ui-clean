export const environment = {
  production: false,
  apiUrl: 'http://localhost:5104/api', // Your API URL
  appName: 'Food Platform',
  version: '1.0.0',
  tokenExpiryTime: 60, // minutes
  refreshTokenExpiryTime: 7, // days
  otpResendTime: 30, // seconds
  maxLoginAttempts: 5,
  lockoutDuration: 15 // minutes
};