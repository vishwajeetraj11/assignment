import { useEffect, useMemo, useRef, useState } from "react";
import { users } from "../shared/constants";

export const useChipInput = () => {
    const [selectedUsers, setSelectedUsers] = useState<typeof users>([]);
    const [query, setQuery] = useState<string>("");
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const [suggestionsVisible, setSuggestionsVisible] = useState<boolean>(false);
    const inputElementRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

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

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prevIndex) =>
                prevIndex < filteredUsers.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        } else if (e.key === "Enter" && highlightedIndex >= 0) {
            e.preventDefault();
            const selectedUser = filteredUsers[highlightedIndex];
            setSelectedUsers((prevUsers) => prevUsers.concat(selectedUser));
            setQuery("");
            setHighlightedIndex(-1);
        }
    };

    const removeSelectedUser = (email: string) => {
        setSelectedUsers((prevUsers) =>
            prevUsers.filter((user) => user.email !== email)
        );
    };

    useEffect(() => {
        updateSuggestionsPosition();
    }, [selectedUsers]);

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

    useEffect(() => {
        setHighlightedIndex(-1);
    }, [suggestionsVisible, query]);

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

    useEffect(() => {
        // Attach event listener to document
        document.addEventListener("mousedown", handleDocumentClick);

        return () => {
            // Clean up: remove event listener from document
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
        setSuggestionsVisible,
        suggestionsRef,
        onSuggestedUserClick,
        highlightedIndex,
        filteredUsers
    }
}