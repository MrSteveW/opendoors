'use server';

export async function getGuestCredentials(org: 'drake' | 'wicklewood') {
  const [identifier, password] =
    org === 'drake'
      ? ['drakeguest', process.env.GUEST_PASSWORD_DRAKE]
      : ['wickguest', process.env.GUEST_PASSWORD_WICKLEWOOD];
  if (!password) throw new Error(`Missing guest password for ${org}`);
  return { identifier, password };
}
