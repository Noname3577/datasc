import { useState } from "react";
import styles from "./Home.module.css";
import data from "../data/data";

// DataDisplay Component
const DataDisplay = ({ data }) => (
  <div className={styles.grid}>
    {data.map((item) => (
      <div key={item.id} className={styles.card}>
        <h3>{item.name}</h3>
        <p>Category: {item.category}</p>
      </div>
    ))}
  </div>
);

// Pagination Component
const Pagination = ({ currentPage, pageCount, setCurrentPage }) => (
  <div className={styles.pagination}>
    {[...Array(pageCount)].map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        className={currentPage === index + 1 ? styles.active : ""}
      >
        {index + 1}
      </button>
    ))}
  </div>
);

// SearchInput Component
const SearchInput = ({ searchTerm, setSearchTerm }) => (
  <input
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className={styles.searchInput}
  />
);

// CategoryFilter Component
const CategoryFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => (
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className={styles.categoryFilter}
  >
    <option value="">All Categories</option>
    {categories.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </select>
);

// SortButton Component
const SortButton = ({ sortOrder, setSortOrder }) => (
  <button
    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
    className={styles.sortButton}
  >
    Sort {sortOrder === "asc" ? "Newest First" : "Oldest First"}
  </button>
);

// Main Page Component
export default function DataDisplayone() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const itemsPerPage = 6;

  const filteredData = data
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "" || item.category === selectedCategory)
    )
    .sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id));

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const displayData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories = [...new Set(data.map((item) => item.category))];

  return (
    <div className={styles.container}>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <SortButton sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <DataDisplay data={displayData} />
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
