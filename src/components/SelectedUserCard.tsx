import clsx from "clsx";
import { users } from "../shared/constants";

type SelectedUserCardType = {
  removeSelectedUser: (email: string) => void;
  user: (typeof users)[number];
  index: number;
  highlightLastUser: boolean;
};

const SelectedUserCard = (props: SelectedUserCardType) => {
  const { removeSelectedUser, user, highlightLastUser } = props;
  return (
    <div
      key={user.email}
      className={clsx(
        "flex items-center gap-2 pr-2 rounded-full",
        highlightLastUser ? "bg-blue-100" : "bg-gray-300"
      )}
    >
      <img src={user.profilePicture} className="rounded-full" />
      <span className="text-base">{user.name}</span>
      <button
        onClick={() => {
          removeSelectedUser(user.email);
        }}
        type="button"
      >
        &times;
      </button>
    </div>
  );
};

export default SelectedUserCard;
