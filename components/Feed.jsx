'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

// PromptCardList Component
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="text-sm mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}

// Feed Component
const Feed = () => {
  // State for all posts
  const [allPosts, setAllPosts] = useState([]);
  // State for filtered posts
  const [searchedResults, setSearchedResults] = useState([]);
  // State for the search text
  const [searchText, setSearchText] = useState("");
  // State for managing the search debounce
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Fetch all posts
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
  }

  useEffect (() => {
    fetchPosts();
  }, []);

  // Function to filter prompts based on search text
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    // Search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  // Handle search input change with debouncing
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // Debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  // Handle click on a tag to search
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-centre">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* Display either searched results or all posts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
}

export default Feed;

// Explanation:

// This code defines a React component (Feed) that fetches prompts from an API, allows users to search for prompts by username or tag, and displays the results using the PromptCardList component. Here's a breakdown of what each part of the code does:

// PromptCardList Component: A component that takes in data (an array of posts) and handleTagClick as props, and renders a list of PromptCard components based on the provided data.

// Feed Component:

// Initializes state variables using the useState hook to manage the list of all posts, filtered posts, search text, and the search timeout.

// Defines a function (fetchPosts) to fetch all posts from the API.

// Uses the useEffect hook to fetch all posts when the component mounts.

// Defines a function (filterPrompts) to filter prompts based on the search text using a regular expression with a case-insensitive flag.

// Handles changes in the search input (handleSearchChange), updating the search text and triggering the debounce mechanism to filter prompts after a short delay.

// Handles clicks on tags (handleTagClick), updating the search text and triggering the filter for prompts related to the clicked tag.

// Conditionally renders the PromptCardList component, either displaying searched results or all posts based on the presence of search text.

// Overall, this code creates a flexible feed component with search functionality, allowing users to dynamically filter prompts based on tags or usernames.
