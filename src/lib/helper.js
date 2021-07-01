import React from "react";

export const renderComponent = (Component, rest) => <Component {...rest} />

export const applyLetterSpacing = (string, count = 1) => string.split('').join('\u200A'.repeat(count));

export const compareTwoArrays = (arrayParam1, arrayParam2) => {
  const array1 = arrayParam1.slice()
  const array2 = arrayParam2.slice();

  array1.sort();
  array2.sort();

  return (array1.length === array2.length && array1.every(function (v, i) {
    return v === array2[i]
  }))
}

export const getSecurityColorLevel = (value) => value >= 80 ?
  'color-success-700' : value >= 60 ?// muy seguro
    'color-success-600' : value >= 40 ?
      'color-warning-600' : value >= 20 ?
        'color-danger-700' : 'color-danger-900'

export const getImageSecurityCredits = (value) =>
  value === 1 ? {
      caption: 's',
      captionLink: ''
    } :
    value === 2 ? {
        caption: 'Vector de Familia creado por pikisuperstar - www.freepik.es',
        captionLink: 'https://www.freepik.es/fotos-vectores-gratis/familia'
      } :
      value === 3 ? {
          caption: 'Vector de Salud creado por freepik - www.freepik.es',
          captionLink: 'https://www.freepik.es/fotos-vectores-gratis/salud'
        } :
        value === 4 ? {
            caption: 'Vector de Diseño creado por freepik - www.freepik.es',
            captionLink: 'https://www.freepik.es/fotos-vectores-gratis/diseno'
          } :
          value === 5 ? {
              caption: 'Vector de Niños creado por studiogstock - www.freepik.es',
              captionLink: 'https://www.freepik.es/fotos-vectores-gratis/ninos'
            } :
            value === 6 ? {
                caption: 'Vector de Infografía creado por pikisuperstar - www.freepik.es',
                captionLink: 'https://www.freepik.es/fotos-vectores-gratis/infografia'
              } :
              value === 7 ? {
                  caption: '',
                  captionLink: ''
                } :
                {
                  caption: 'Foto de Hombre creado por freepik - www.freepik.es',
                  captionLink: 'https://www.freepik.es/fotos/hombre'
                }

