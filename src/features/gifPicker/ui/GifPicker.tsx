import { forwardRef, useState } from "react";
import { useGetTrendingGifsQuery, useSearchGifsQuery } from "@/shared/api";
import { type GiphyGif } from "@/shared/api/giphyApi";
import { useDebounce } from "@/shared/libs";
import styles from "./GifPicker.module.css";

interface GifPickerProps {
  onSelect: (gif: GiphyGif) => void;
}

export const GifPicker = forwardRef<HTMLDivElement, GifPickerProps>(
  ({ onSelect }, ref) => {
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedQuery = useDebounce(searchQuery, 500);

    const { data: trendingData, isLoading: isLoadingTrending } =
      useGetTrendingGifsQuery({
        limit: 9,
      });

    const { data: searchData, isLoading: isLoadingSearch } = useSearchGifsQuery(
      { query: debouncedQuery, limit: 9 },
      { skip: !debouncedQuery.trim() },
    );

    const currentData = debouncedQuery.trim() ? searchData : trendingData;
    const isLoading = debouncedQuery.trim()
      ? isLoadingSearch
      : isLoadingTrending;
    const gifs = currentData?.data ?? [];

    return (
      <div
        className={styles.picker}
        onClick={(e) => e.stopPropagation()}
        ref={ref}
      >
        <input
          type="text"
          placeholder="Поиск GIF..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          className={styles.searchInput}
        />

        <div className={styles.gifGrid}>
          {gifs.map((gif) => (
            <button
              key={gif.id}
              className={styles.gifItem}
              onClick={() => onSelect(gif)}
            >
              <img
                src={gif.images.downsized.url}
                alt={gif.title}
                loading="lazy"
              />
            </button>
          ))}
          {isLoading && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
            </div>
          )}
        </div>
      </div>
    );
  },
);
