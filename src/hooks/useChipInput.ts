import { useEffect, useMemo, useRef, useState } from "react";
import { users } from "../shared/constants";

export const useChipInput = () => {
    const [selectedUsers, setSelectedUsers] = useState<typeof users>([]);
    const [query, setQuery] = useState<string>("");
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const [suggestionsVisible, setSuggestionsVisible] = useState<boolean>(false);
    const inputElementRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const [lastUserHighlighted, setLastUserHighlighted] = useState<boolean>(false);


    const updateSuggestionsPosition = () => {
        if (inputElementRef.current && suggestionsRef.current) {
            suggestionsRef.current.style.top =
                `${inputElementRef.current?.getBoundingClientRect().bottom}px` || "0px";
            suggestionsRef.current.style.left =
                `${inputElementRef.current?.getBoundingClientRect().left}px` || "0px";
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const scrollToSuggestion = (index: number) => {
        const suggestionsContainer = suggestionsRef.current;
        const suggestionElement = suggestionsContainer?.children[index] as HTMLDivElement | undefined;

        if (suggestionElement) {
            suggestionElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prevIndex) => {
                const newIndex = prevIndex < filteredUsers.length - 1 ? prevIndex + 1 : prevIndex;
                scrollToSuggestion(newIndex)
                return newIndex;
            }
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prevIndex) => {
                const newIndex = (prevIndex > 0 ? prevIndex - 1 : 0)
                scrollToSuggestion(newIndex)
                return newIndex;
            })
        } else if (e.key === "Enter" && highlightedIndex >= 0) {
            e.preventDefault();
            const selectedUser = filteredUsers[highlightedIndex];
            setSelectedUsers((prevUsers) => prevUsers.concat(selectedUser));
            setQuery("");
            setHighlightedIndex(-1);
        } else if (e.key === 'Backspace' && query === '' && selectedUsers.length > 0) {
            if (!lastUserHighlighted) {
                e.preventDefault();
                setLastUserHighlighted(true);
            } else {
                const newSelectedUsers = selectedUsers.slice(0, selectedUsers.length - 1);
                setSelectedUsers(newSelectedUsers);
                setLastUserHighlighted(false);
            }
        } else if (query !== '' || e.key !== 'Backspace') {
            // Any other key or input clears the highlighted state
            setLastUserHighlighted(false);
        }
    };

    const onInputFocus = () => {
        setLastUserHighlighted(false);
        setSuggestionsVisible(true);
    };

    const removeSelectedUser = (email: string) => {
        setSelectedUsers((prevUsers) =>
            prevUsers.filter((user) => user.email !== email)
        );
    };

    useEffect(() => {
        updateSuggestionsPosition();
    }, [selectedUsers]);

    // resize handler
    useEffect(() => {
        const handleResize = () => {
            updateSuggestionsPosition();
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const onSuggestedUserClick = (user: (typeof users)[number]) => {
        setSelectedUsers((prevUsers) => prevUsers.concat(user));
        inputElementRef?.current?.focus();
        setQuery("");
    };

    // On suggestions visibility toggle and query change, no suggestion should be highlighted.
    useEffect(() => {
        setHighlightedIndex(-1);
    }, [suggestionsVisible, query]);

    // Click Away Handler 
    const handleDocumentClick = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
            suggestionsRef.current &&
            !suggestionsRef.current.contains(target) &&
            inputElementRef.current &&
            !inputElementRef.current.contains(target)
        ) {
            setSuggestionsVisible(false);
        }
    };
    // Click Away Listener
    useEffect(() => {
        document.addEventListener("mousedown", handleDocumentClick);
        return () => {
            document.removeEventListener("mousedown", handleDocumentClick);
        };
    }, []);

    const filteredUsers = useMemo(() => {
        return users.filter(
            (user) =>
                user.name.toLowerCase().indexOf(query?.toLowerCase()) !== -1 &&
                !selectedUsers.includes(user)
        );
    }, [query, selectedUsers]);

    return {
        selectedUsers,
        removeSelectedUser,
        query,
        inputElementRef,
        onInputChange,
        onKeyDown,
        suggestionsVisible,
        suggestionsRef,
        onSuggestedUserClick,
        highlightedIndex,
        filteredUsers,
        onInputFocus,
        lastUserHighlighted,
        setHighlightedIndex
    }
}