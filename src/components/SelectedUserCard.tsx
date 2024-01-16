import { users } from "../shared/constants";

type SelectedUserCardType = {
  removeSelectedUser: (email: string) => void;
  user: (typeof users)[number];
};

const SelectedUserCard = (props: SelectedUserCardType) => {
  const { removeSelectedUser, user } = props;
  return (
    <div
      key={user.email}
      className="flex items-center gap-2 pr-2 bg-gray-300 rounded-full"
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
