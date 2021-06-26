import React from "react";

export const renderComponent = (Component,rest) => <Component {...rest} />

export const applyLetterSpacing = (string, count = 1) => string.split('').join('\u200A'.repeat(count));

export const compareTwoArrays = (arrayParam1,arrayParam2) => {
  const array1 = arrayParam1.slice()
  const array2 = arrayParam2.slice();

  array1.sort();
  array2.sort();

  return (array1.length === array2.length && array1.every(function (v, i) {
    return v === array2[i]
  }))
}