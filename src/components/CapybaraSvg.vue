<template>
  <svg viewBox="0 0 200 200" :width="size" :height="size" xmlns="http://www.w3.org/2000/svg">
    <!-- Body -->
    <ellipse cx="100" cy="130" rx="65" ry="40" fill="#A07818"/>
    <ellipse cx="100" cy="126" rx="60" ry="36" fill="#B89020"/>
    <ellipse cx="100" cy="135" rx="42" ry="22" fill="#C8A030" opacity="0.4"/>

    <!-- Head -->
    <ellipse cx="100" cy="78" rx="42" ry="34" fill="#A07818"/>
    <ellipse cx="100" cy="80" rx="39" ry="31" fill="#B89020"/>

    <!-- Snout — wide, flat, capybara shape -->
    <ellipse cx="100" cy="96" rx="24" ry="13" fill="#C8A030"/>
    <ellipse cx="100" cy="94" rx="21" ry="11" fill="#D4B838"/>

    <!-- Nostrils -->
    <ellipse cx="92" cy="93" rx="3" ry="2.2" fill="#7A5A10"/>
    <ellipse cx="108" cy="93" rx="3" ry="2.2" fill="#7A5A10"/>

    <!-- Eyes -->
    <circle cx="84" cy="74" r="4.5" fill="#1B1F1A"/>
    <circle cx="116" cy="74" r="4.5" fill="#1B1F1A"/>
    <circle cx="85.5" cy="72.5" r="1.8" fill="white"/>
    <circle cx="117.5" cy="72.5" r="1.8" fill="white"/>

    <!-- Ears — small, rounded, high -->
    <ellipse cx="72" cy="56" rx="7" ry="10" fill="#A07818"/>
    <ellipse cx="128" cy="56" rx="7" ry="10" fill="#A07818"/>
    <ellipse cx="72" cy="56" rx="4.5" ry="7" fill="#C8A030"/>
    <ellipse cx="128" cy="56" rx="4.5" ry="7" fill="#C8A030"/>

    <!-- Cheeks -->
    <circle cx="78" cy="88" r="7" fill="#E8A070" opacity="0.3"/>
    <circle cx="122" cy="88" r="7" fill="#E8A070" opacity="0.3"/>

    <!-- Mouth -->
    <path d="M 90 100 Q 100 106 110 100" stroke="#7A5A10" stroke-width="1.8" fill="none" stroke-linecap="round"/>

    <!-- Legs — short, stubby -->
    <rect x="72" y="160" width="12" height="16" rx="6" fill="#8A6810"/>
    <rect x="116" y="160" width="12" height="16" rx="6" fill="#8A6810"/>
    <ellipse cx="78" cy="176" rx="8" ry="4" fill="#6A5010"/>
    <ellipse cx="122" cy="176" rx="8" ry="4" fill="#6A5010"/>

    <!-- Stethoscope -->
    <path d="M 80 110 Q 60 118 56 140" stroke="#2D5F4A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="56" cy="145" r="6" fill="#2D5F4A"/>
    <circle cx="56" cy="145" r="3.5" fill="#D5E2DA"/>

    <!-- Leaf on head -->
    <path d="M 108 50 Q 118 40 123 50 Q 118 55 108 50 Z" fill="#2D5F4A"/>
    <line x1="115" y1="48" x2="115" y2="53" stroke="#1a4030" stroke-width="0.8"/>
  </svg>
</template>

<script setup>
defineProps({
  size: { type: Number, default: 200 },
})
</script>
