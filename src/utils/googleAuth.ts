/**
 * Utility functions for Google OAuth integration
 */

// Google OAuth credential payload interface
interface GoogleCredentialPayload {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
}

/**
 * Decode Google JWT credential token
 * @param credential Google JWT credential token
 * @returns Decoded payload or null if invalid
 */
export const decodeGoogleCredential = (credential: string): GoogleCredentialPayload | null => {
  try {
    // JWT tokens have 3 parts separated by dots
    const parts = credential.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decode the payload (middle part)
    const payload = parts[1];
    
    // Add padding if needed for base64 decoding
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    
    // Decode base64
    const decodedPayload = atob(paddedPayload);
    
    // Parse JSON
    const parsedPayload: GoogleCredentialPayload = JSON.parse(decodedPayload);
    
    return parsedPayload;
  } catch (error) {
    console.error('Error decoding Google credential:', error);
    return null;
  }
};

/**
 * Extract email from Google credential token
 * @param credential Google JWT credential token
 * @returns Email address or null if extraction fails
 */
export const extractEmailFromGoogleCredential = (credential: string): string | null => {
  const payload = decodeGoogleCredential(credential);
  return payload?.email || null;
};

/**
 * Extract user info from Google credential token
 * @param credential Google JWT credential token
 * @returns User info object or null if extraction fails
 */
export const extractUserInfoFromGoogleCredential = (credential: string): {
  email: string;
  name: string;
  picture: string;
} | null => {
  const payload = decodeGoogleCredential(credential);
  
  if (!payload) {
    return null;
  }
  
  return {
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
  };
};