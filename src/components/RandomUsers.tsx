import { useEffect, useState } from "react";
import "./Loading.css";
import { getRandomUsers } from "../utils/supabaseRequests";
import { useUser } from "@clerk/clerk-react";
import { User } from "../utils/interfaces";
import { useNavigate } from "react-router-dom";

export const RandomUsers = () => {
  const { user } = useUser();
  const [randomUsers, setRandomUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    user?.id &&
      getRandomUsers(user.id).then((users) => {
        setRandomUsers(users);
      });
  }, [user]);

  return (
    <div className="h-full gap-2 flex flex-row">
      {randomUsers.map((user, index) => (
        <img
          onClick={() => navigate(`/user/${user.user_id}`)}
          key={index}
          src={user?.image_url}
          alt={"@" + user?.username + " avatar"}
          className="h-full aspect-square  rounded-xl  cursor-pointer"
        />
      ))}
    </div>
  );
};
