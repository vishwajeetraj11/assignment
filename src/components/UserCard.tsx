import clsx from "clsx";
import { users } from "../shared/constants";

type UserCardType = {
  onSuggestedUserClick: (user: (typeof users)[number]) => void;
  highlightedIndex: number;
  user: (typeof users)[number];
  query: string;
  index: number;
};

export const UserCard = (props: UserCardType) => {
  const { onSuggestedUserClick, highlightedIndex, user, query, index } = props;
  return (
    <button
      type="button"
      onClick={() => onSuggestedUserClick(user)}
      className={clsx(
        "hover:bg-slate-200 grid px-3 py-1 items-center gap-2 grid-cols-[40px_100px_110px] sm:grid-cols-[40px_100px_210px]",
        highlightedIndex === index && "bg-slate-200"
      )}
      key={user.email}
    >
      <img src={user.profilePicture} className="rounded-full" />
      <div className="flex flex-col justify-start items-start">
        <span>
          {query
            ? user.name
                .split(new RegExp(`(${query})`, "gi"))
                .map((chunk, i) => (
                  <span
                    className={clsx(
                      chunk.toLowerCase() === query.toLocaleLowerCase() &&
                        "text-neutral-400"
                    )}
                    key={i}
                  >
                    {chunk}
                  </span>
                ))
            : user.name}
        </span>
        <span className="sm:hidden block">{user.email}</span>
      </div>
      <span className="hidden sm:block">{user.email}</span>
    </button>
  );
};
