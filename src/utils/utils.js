import React from 'react'
export const ordinal = (n, sup = false) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  const suffix = (s[(v - 20) % 10] || s[v] || s[0])
  if (sup) {
    return <span>{n}<sup>{suffix}</sup></span>
  } else {
    return <span>{n}{suffix}</span>
  }
}
