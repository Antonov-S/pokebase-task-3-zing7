<p id="start" align="center">
<br>

  <h1 align="center" color='7582EB'>Pokebase</h1>
  
</p>

## Table of Contents

1. <a href="#overview">Overview</a>
2. <a href="#appConfig">Application Configurations</a>
3. <a href="#constants">Application Constants</a>
4. <a href="#appShots">Screenshots</a>

<h2 id="overview">Overview</h2>

Pokebase is a web application developed as part of the **Zing7 Ltd summer training program**. The project focuses on learning to fetch and process API data by building a Pokémon database using the **PokéAPI**. The main objective is to practice API data handling, with minimal emphasis on design.

### Key Features:

- **Pokémon listing** with pagination (9-50 Pokémon per page)
- **Filtering by Pokémon type** (Fire, Water, Ground, etc.)
- **Detailed Pokémon info pages**
- **Search bar with autocomplete**, working in conjunction with sorting (Pokémon are first filtered by type, then searched by keyword)
- **Skeleton loader for improved user experience** during data fetching
- **Not-found component** for handling missing Pokémon entries
- **No authentication required**, the app is open to all users

### Built With:

- TypeScript
- Next.js
- Tailwind CSS

<h2 id="appConfig">Application Configurations</h2>

### **Node Version:**

```javascript
Node version: v20.10.0
```

### **Available Scripts:**

```javascript
# install dependencies
npm install

# start
npm run dev

# build
npm run build
```

### Application Nav

![Application Nav](/appScreens/next-nav.jpg)

<h2 id="constants">Application Constants</h2>

The application does not use environment variables. Instead, key constants required for its functionality are stored in the following file:

📌 **Path:** `src/lib/constants.ts`

The file contains essential values such as:

```javascript
import pokeBall from "../../public/pokeBall.png";

export const API_URL = "https://pokeapi.co/api/v2";
export const LIMIT = 9;
export const DEFAULT_POKE_IMAGE = pokeBall;

export const SORTING_TYPES = [
  { id: "0", label: "Sort by default", value: "default" },
  { value: "fire", id: "10", label: "Sort by fire" },
  { value: "water", id: "11", label: "Sort by water" },
  { value: "grass", id: "12", label: "Sort by grass" },
  { value: "electric", id: "13", label: "Sort by electric" },
  { value: "ice", id: "15", label: "Sort by ice" }
];
```

<h2 id="appShots">Screenshots</h2>

### Home View

![Home View](/appScreens/app-main-view.jpg)

### Filtering and Sorting

![Sorting](/appScreens/sorting.jpg)

### Search Functionality

![Search](/appScreens/search.jpg)

### Pokémon Detailed View

![Pokemon View](/appScreens/pokemon-view.jpg)

### Pokémon Statistics

![Pokemon Statistics](/appScreens/pokemon-statistiks.jpg)

### Empty List (No Results)

![Empty List](/appScreens/empty-list.jpg)
