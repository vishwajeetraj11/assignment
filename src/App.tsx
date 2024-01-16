import clsx from "clsx";
import { useChipInput } from "./hooks/useChipInput";
import { UserCard } from "./components/UserCard";
import SelectedUserCard from "./components/SelectedUserCard";

function App() {
  const {
    highlightedIndex,
    inputElementRef,
    onInputChange,
    onKeyDown,
    onSuggestedUserClick,
    query,
    removeSelectedUser,
    selectedUsers,
    suggestionsRef,
    suggestionsVisible,
    filteredUsers,
    onInputFocus,
    lastUserHighlighted,
    setHighlightedIndex,
  } = useChipInput();

  return (
    <main className="p-4 sm:p-10 relative">
      <h1 className="text-2xl text-center">Pick Users</h1>
      {/* Selected Users */}
      <div
        className={clsx(
          "flex flex-wrap gap-2 max-w-[800px] mx-auto mt-10 border-b pb-2"
        )}
      >
        {selectedUsers.map((user, index) => (
          <SelectedUserCard
            removeSelectedUser={removeSelectedUser}
            user={user}
            key={user.email}
            index={index}
            highlightLastUser={
              lastUserHighlighted && index === selectedUsers.length - 1
            }
          />
        ))}
        <input
          value={query}
          ref={inputElementRef}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          className="h-[40px] px-4 outline-none"
          placeholder="Add new user..."
          onFocus={onInputFocus}
        />
        {/* Suggestions */}
        <div
          ref={suggestionsRef}
          className="shadow-lg border absolute bg-white max-h-[300px] overflow-auto"
        >
          {suggestionsVisible &&
            filteredUsers.map((user, index) => (
              <UserCard
                highlightedIndex={highlightedIndex}
                index={index}
                onSuggestedUserClick={onSuggestedUserClick}
                query={query}
                user={user}
                key={user.email}
                setHighlightedIndex={setHighlightedIndex}
              />
            ))}
        </div>
      </div>
    </main>
  );
}

export default App;
