import { useUser } from "@clerk/clerk-react";

export function useUserRole() {
  const { user } = useUser();

  const userRole = user?.publicMetadata?.role;

  return {
    isAdmin: userRole === "admin",
    isEditor: userRole === "editor",
    isMember: userRole === "viewer",
    hasWriteAccess: userRole === "admin" || userRole === "editor",
    role: ["admin", "editor", "viewer"].includes(userRole) ? userRole : null,
  };
}
