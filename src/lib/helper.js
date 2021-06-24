import React from "react";

export const renderComponent = (Component,rest) => <Component {...rest} />

export const applyLetterSpacing = (string, count = 1) => string.split('').join('\u200A'.repeat(count));