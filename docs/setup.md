# Local Development Setup

## Versions and deployments

Opendoorsv4 repo serves 3 different deployments:

Vercel opendoorsv4 (live production)
linked to seperate OpenDoorsv4 Supabase db (RLS to Clerk OpenDoors Application)
& Clerk OpenDoors Application

Vercel demo-opendoorsv4 (live demo production)
linked to DemoOpenDoors Supabase db (RLS to Clerk Demo Application)
& Demo OpenDoors Clerk Application

Local development
linked to DemoOpenDoors Supabase db (RLS to OpenDevelopment Application)
& OpenDevelopment Clerk Application

## How to run locally

- [x] .env.local file contains NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY to Clerk OpenDevelopment Application. This Application has been added to Supabase API to Third-party Auth. This creates separate RLS rows for Local development Admin Organization.
- [x] npm run dev as normal will begin local app server
