import React from "react";
import { UserButton } from "@clerk/clerk-react";
import { useUserRole } from "./useUserRole";

export default function Header() {
  const { role } = useUserRole();

  return (
    <div className="header-bar">
      <div className="header-title">
        Radio Drake{" "}
        {role && (
          <span style={{ fontSize: "1rem", color: "#666" }}>
            ({role.charAt(0).toUpperCase() + role.slice(1)})
          </span>
        )}
      </div>
      <div className="user-button-right">
        <UserButton />
      </div>
    </div>
  );
}
