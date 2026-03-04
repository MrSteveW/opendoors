'use client';

import { useOrganization } from '@clerk/nextjs';

export default function SchName() {
  const { organization } = useOrganization();
  return <span>{organization?.name ?? ''}</span>;
}
