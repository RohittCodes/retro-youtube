"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { VideoDetails } from "@/types/video";
import Image from "next/image";

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([] as VideoDetails[]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    try {
      const options = {
        method: "GET",
        url: "https://yt-api.p.rapidapi.com/search",
        params: { query },
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          "x-rapidapi-host": "yt-api.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      setResults(response.data.data || []);
      setShowDropdown(true);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [query]); // Include 'query' as a dependency

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (query.trim()) {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(debounceTimeout);
  }, [query, handleSearch]); // Add 'handleSearch' as a dependency

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="flex">
        <Input
          type="search"
          placeholder="Search..."
          className="retro-input w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          className="retro-button ml-2"
          onClick={handleSearch}
          disabled={isLoading}
        >
          <Search />
        </Button>
      </div>

      {showDropdown && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-black border border-retro-primary rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.map((item) => (
            <Link
              key={item.videoId}
              href={`/video/${item.videoId}`}
              className="block p-2 hover:bg-retro-primary transition-colors"
              onClick={() => setShowDropdown(false)} // Close dropdown on selection
            >
              <div className="flex items-center">
                <Image
                  src={item.thumbnail?.[0]?.url || "/placeholder-thumbnail.png"}
                  alt={item.title || "Video thumbnail"}
                  className="w-16 h-9 object-cover mr-2 rounded"
                  width={64}
                  height={36}
                />
                <div>
                  <p className="text-retro-text whitespace-normal overflow-hidden max-w-full">
                    {item.title}
                  </p>
                  <p className="text-retro-secondary text-sm">
                    {item.channelTitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
