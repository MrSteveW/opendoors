export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      user_role?: 'admin' | 'editor' | 'guest';
    };
  }
}
