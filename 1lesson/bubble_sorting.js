// Вывод сообщения о запуске программы
console.log("Программа запущена");

// Функция для создания случайного числа
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Массив из 10000 случайных чисел
const array = [];
for (let i = 0; i < 10000; i++) {
  array.push(getRandomInt(1, 10000));
}

// Вывод массива в консоль
console.log("Массив:", array);

// Функция для сортировки массива пузырьковой сортировкой
function bubbleSort(arr) {
  const len = arr.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < len - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
}

bubbleSort(array);

// Вывод отсортированного массив в консоль
console.log("Отсортированный массив:", array);