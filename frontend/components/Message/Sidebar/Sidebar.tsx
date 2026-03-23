"use client";

import "./sidebar.css";
import { Avatar, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";

type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  auth?: { isActive?: boolean };
};

export default function Sidebar({
  users,
  selectedUser,
  setSelectedUser,
  search,
  setSearch,
}: any) {

  return (
    <div className="sidebarr">
      <div className="sidebar-header">
        <Typography fontWeight={600}>Messaging</Typography>

        <div>
          <IconButton size="small">
            <MoreHorizIcon />
          </IconButton>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar-search">
        <SearchIcon fontSize="small" />
        <input
          placeholder="Search users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="sidebar-users">
        {users
          .filter((u: User) =>
            `${u.firstName ?? ""} ${u.lastName ?? ""}`
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((user: User) => (
            <div
              key={user.id}
              className={`sidebar-user ${
                selectedUser?.id === user.id ? "active" : ""
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="avatar-wrapper">
                <Avatar src={user.profilePicture} />
                {user.auth?.isActive && <span className="online-dot" />}
              </div>

              <span>
                {user.firstName} {user.lastName}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}