// Дефолтные карточки в массиве

const moscow = new URL("../images/moscow.jpg", import.meta.url);
const spb= new URL("../images/spb.jpg", import.meta.url);
const ural = new URL("../images/ural.jpg", import.meta.url);
const karelia = new URL("../images/karelia.jpg", import.meta.url);
const elbrus = new URL("../images/elbrus.jpg", import.meta.url);
const finskizaliv = new URL("../images/finskizaliv.jpg", import.meta.url);

export const initialCards = [
  {
    name: 'Москва',
    link: moscow,
  },
  {
    name: 'Урал',
    link: ural,
  },
  {
    name: 'Санкт-Петербург',
    link: spb,
  },
  {
    name: 'Карелия',
    link: karelia,
  },
  {
    name: 'Эльбрус',
    link: elbrus,
  },
  {
    name: 'Финский Залив',
    link: finskizaliv,
  }
];


