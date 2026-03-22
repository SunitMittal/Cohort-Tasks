(function () {
  "use strict";

  const RESET_PROPS = new Set(["color", "background-color", "font-size", "font-weight", "padding", "padding-top", "padding-right", "padding-bottom", "padding-left", "margin", "margin-top", "margin-right", "margin-bottom", "margin-left", "width", "height", "max-width", "text-align", "display", "border-radius", "border", "gap", "flex-direction", "justify-content", "align-items", "position", "top", "bottom", "left", "right", "opacity", "z-index", "font-style", "letter-spacing", "line-height", "text-transform", "text-decoration"]);

  // Tailwind color palete - chai-color-red
  const COLORS = {
    red: {50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a"},

    orange: {50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74", 400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c", 800: "#9a3412",900: "#7c2d12",950: "#431407"},

    yellow: {50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047", 400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207", 800: "#854d0e", 900: "#713f12", 950: "#422006"},

    lime: {50: "#f7fee7", 100: "#ecfccb", 200: "#d9f99d", 300: "#bef264", 400: "#a3e635", 500: "#84cc16", 600: "#65a30d", 700: "#4d7c0f", 800: "#3f6212", 900: "#365314", 950: "#1a2e05"},

    green: {50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d", 950: "#052e16"},

    cyan: {50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9", 400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2", 700: "#0e7490", 800: "#155e75", 900: "#164e63", 950: "#083344"},

    blue: {50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a", 950: "#172554"},

    violet: {50: "#f5f3ff", 100: "#ede9fe", 200: "#ddd6fe", 300: "#c4b5fd", 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9", 800: "#5b21b6", 900: "#4c1d95", 950: "#2e1065"},

    purple: {50: "#faf5ff", 100: "#f3e8ff", 200: "#e9d5ff", 300: "#d8b4fe", 400: "#c084fc", 500: "#a855f7", 600: "#9333ea", 700: "#7e22ce", 800: "#6b21a8", 900: "#581c87", 950: "#3b0764"},

    pink: {50: "#fdf2f8", 100: "#fce7f3", 200: "#fbcfe8", 300: "#f9a8d4", 400: "#f472b6", 500: "#ec4899", 600: "#db2777", 700: "#be185d", 800: "#9d174d", 900: "#831843", 950: "#500724"},

    slate: {50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155", 800: "#1e293b", 900: "#0f172a", 950: "#020617"},

    gray: {50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db", 400: "#9ca3af", 500: "#6b7280", 600: "#4b5563", 700: "#374151", 800: "#1f2937", 900: "#111827", 950: "#030712"},
  };

  // Tailwind spacing scale — chai-p-2.5, chai-m-0.5, chai-gap-14
  const SPACING = {px: "1px", 0: "0px", 0.5: "0.125rem", 1: "0.25rem", 1.5: "0.375rem", 2: "0.5rem", 2.5: "0.625rem", 3: "0.75rem", 3.5: "0.875rem", 4: "1rem", 5: "1.25rem", 6: "1.5rem", 7: "1.75rem", 8: "2rem", 9: "2.25rem", 10: "2.5rem", 11: "2.75rem", 12: "3rem", 14: "3.5rem", 16: "4rem", 20: "5rem", 24: "6rem", 28: "7rem", 32: "8rem", 36: "9rem", 40: "10rem", 44: "11rem", 48: "12rem", 52: "13rem", 56: "14rem", 60: "15rem", 64: "16rem", 72: "18rem", 80: "20rem", 96: "24rem"};

  // Tailwind font-size scale — chai-text-4xl
  const FONT_SIZES = {xs: "0.75rem", sm: "0.875rem", base: "1rem", lg: "1.125rem", xl: "1.25rem", "2xl": "1.5rem", "3xl": "1.875rem", "4xl": "2.25rem", "5xl": "3rem"};

  // Tailwind font-weight scale — chai-font-bold
  const FONT_WEIGHTS = {thin: "100", extralight: "200", light: "300", normal: "400", medium: "500", semibold: "600", bold: "700", extrabold: "800", black: "900"};

  // Tailwind letter-spacing scale — chai-tracking-tighter
  const TRACKING = {tighter: "-0.05em", tight: "-0.025em", normal: "0em", wide: "0.025em", wider: "0.05em", widest: "0.1em"};

  // Tailwind line-height scale chai-leading-3
  const LEADING = {none: "1", tight: "1.25", normal: "1.5", relaxed: "1.625", loose: "2", 3: "0.75rem", 4: "1rem", 5: "1.25rem"};

  function resolveColor(token) {
    const lower = String(token).toLowerCase();
    if (lower === "white")
      return "#ffffff";

    if (lower === "black")
      return "#000000";

    // "red-500" (for color shade I need last numerical value so, split on the last dash)
    const lastDash = lower.lastIndexOf("-");
    if (lastDash !== -1) {
      const name = lower.slice(0, lastDash);
      const shade = lower.slice(lastDash + 1);
      if (COLORS[name]?.[shade])
        return COLORS[name][shade];
    }

    // if only color name is inserted not shade value like: red, take shades default of 500
    if (COLORS[lower])
      return COLORS[lower]["500"];

    return token;
  }

  function spacingOrRaw(v) {
    if (SPACING[v] !== undefined)
      return SPACING[v];
    return v;
  }

  // Apply chai-* class to an element
  function applyOneClass(el, className) {
    if (!className.startsWith("chai-"))
      return;
    const rest = className.slice(4);
    const parts = rest.split("-").filter(Boolean);
    if (parts.length < 1)
      return;

    const [a, b, ...restParts] = parts;

    // check for text-color, bg-color like: chai-color-red, chai-bg-blue
    if (a === "color" && b) {
      el.style.color = resolveColor([b, ...restParts].join("-"));
      return;
    }

    if (a === "bg" && b) {
      el.style.backgroundColor = resolveColor([b, ...restParts].join("-"));
      return;
    }

    // check for text-position, like: chai-text-center
    if (a === "text" && b) {
      if (["center", "left", "right", "justify"].includes(b)) {
        const map = {
          center: "center",
          left: "left",
          right: "right",
          justify: "justify",
        };
        el.style.textAlign = map[b];
        return;
      }

    // check for text-size like: chai-text-sm
      if (FONT_SIZES[b]) {
        el.style.fontSize = FONT_SIZES[b];
        return;
      }
      el.style.color = resolveColor([b, ...restParts].join("-"));
      return;
    }

    // check for text-weight like: chai-font-bold
    if (a === "font" && b) {
      if (FONT_WEIGHTS[b]) {
        el.style.fontWeight = FONT_WEIGHTS[b];
        return;
      }
    }

    if (a === "italic") {
      el.style.fontStyle = "italic";
      return;
    }

    if (a === "not" && b === "italic") {
      el.style.fontStyle = "normal";
      return;
    }

    if (a === "tracking" && b) {
      el.style.letterSpacing = TRACKING[b] ?? b;
      return;
    }

    if (a === "leading" && b) {
      el.style.lineHeight = LEADING[b] ?? b;
      return;
    }

    if (["uppercase", "lowercase", "capitalize"].includes(a) && !b) {
      el.style.textTransform = a;
      return;
    }

    if (a === "underline" && !b) {
      el.style.textDecoration = "underline";
      return;
    }

    if (a === "no" && b === "underline") {
      el.style.textDecoration = "none";
      return;
    }

    // check for padding like: chai-p-1.5
    if (a === "p" && b) {
      el.style.padding = spacingOrRaw(b);
      return;
    }

    if (a === "px" && b) {
      const s = spacingOrRaw(b);
      el.style.paddingLeft = s;
      el.style.paddingRight = s;
      return;
    }

    if (a === "py" && b) {
      const s = spacingOrRaw(b);
      el.style.paddingTop = s;
      el.style.paddingBottom = s;
      return;
    }

    if (a === "pt" && b) {
      el.style.paddingTop = spacingOrRaw(b);
      return;
    }

    if (a === "pr" && b) {
      el.style.paddingRight = spacingOrRaw(b);
      return;
    }

    if (a === "pb" && b) {
      el.style.paddingBottom = spacingOrRaw(b);
      return;
    }

    if (a === "pl" && b) {
      el.style.paddingLeft = spacingOrRaw(b);
      return;
    }

    // check for margin like: chai-m-1
    if (a === "m" && b) {
      el.style.margin = spacingOrRaw(b);
      return;
    }

    if (a === "mx" && b) {
      const s = spacingOrRaw(b);
      el.style.marginLeft = s;
      el.style.marginRight = s;
      return;
    }

    if (a === "my" && b) {
      const s = spacingOrRaw(b);
      el.style.marginTop = s;
      el.style.marginBottom = s;
      return;
    }

    if (a === "mt" && b) {
      el.style.marginTop = spacingOrRaw(b);
      return;
    }

    if (a === "mb" && b) {
      el.style.marginBottom = spacingOrRaw(b);
      return;
    }

    if (a === "ml" && b) {
      el.style.marginLeft = spacingOrRaw(b);
      return;
    }

    if (a === "mr" && b) {
      el.style.marginRight = spacingOrRaw(b);
      return;
    }

    // check for dimensions like: chai-w-full, chai-h-screen
    if (a === "w" && b === "full") {
      el.style.width = "100%";
      return;
    }

    if (a === "h" && b === "full") {
      el.style.height = "100%";
      return;
    }

    // check for dsiplay like: chai-flex
    if (a === "flex") {
      el.style.display = "flex";
      if (b === "col")
        el.style.flexDirection = "column";

      if (b === "row")
        el.style.flexDirection = "row";
      return;
    }

    if (a === "block") {
      el.style.display = "block";
      return;
    }

    if (a === "inline" && b === "block") {
      el.style.display = "inline-block";
      return;
    }

    // check for border-radius like: chai-rounded-lg
    if (a === "rounded" && b) {
      const map = {
        sm: "0.125rem",
        md: "0.375rem",
        lg: "0.5rem",
        full: "9999px",
      };
      el.style.borderRadius = map[b] || b;
      return;
    }

    if (a === "rounded" && !b) {
      el.style.borderRadius = "0.25rem";
      return;
    }

    // check for content position like: chai-relative
    if (["relative", "absolute", "fixed", "sticky"].includes(a) && !b) {
      el.style.position = a;
      return;
    }
    
    if (["top", "bottom", "left", "right"].includes(a) && b) {
      el.style[a] = spacingOrRaw(b);
      return;
    }

    // check for opcaity like: chai-opacity-50 (means 0.5)
    if (a === "opacity" && b) {
      el.style.opacity = Number(b) / 100;
      return;
    }

    // check for z-index like: chai-z-10
    if (a === "z" && b) {
      el.style.zIndex = b;
      return;
    }
  }

  // check for css removal
  function resetChaiStyles(el) {
    for (const prop of RESET_PROPS)
      el.style.removeProperty(prop)
  }

  function processElement(el) {
    if (el.nodeType !== Node.ELEMENT_NODE)
      return;

    const classAttr = el.getAttribute("class");
    if (!classAttr || !classAttr.includes("chai-"))
      return;

    resetChaiStyles(el);
    const classes = classAttr.split(/\s+/).filter(Boolean);
    for (const c of classes) {
      applyOneClass(el, c);
    }
  }

  function scan(root) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE)
      return;
    if (root.hasAttribute && root.getAttribute("class") && root.getAttribute("class").includes("chai-"))
      processElement(root);

    const all = root.querySelectorAll ? root.querySelectorAll("[class*='chai-']") : [];
    all.forEach(processElement);
  }

  function initObserver() {
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "childList") {
          m.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE)
              scan(node);
          });
        }
        if (m.type === "attributes" && m.attributeName === "class" && m.target.nodeType === Node.ELEMENT_NODE)
          processElement(m.target);
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  function boot() {
    scan(document.body);
    initObserver();
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", boot);
  else
    boot();

  window.chaiUtils = { scan, processElement };
})();
