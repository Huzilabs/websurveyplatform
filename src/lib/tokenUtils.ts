/**
 * Token utilities for survey access validation
 */

export function isValidAccessToken(token: string | null | undefined): boolean {
  // Check if token exists and is not empty
  if (!token || typeof token !== 'string' || token.trim() === '') {
    return false;
  }
  
  // Basic validation: tokens should be a reasonable length
  // Adjust this based on your token generation strategy
  if (token.length < 10) {
    return false;
  }
  
  return true;
}

export function getAccessTokenFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  
  const params = new URLSearchParams(window.location.search);
  return params.get('token');
}
