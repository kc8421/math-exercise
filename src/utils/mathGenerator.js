// Math problem generator tailored for Finnish Elementary School (grades 1-2)

/**
 * Supported operations: 'addition', 'subtraction', 'multiplication', 'division'
 */

export const OPERATION_CONFIG = {
  addition: {
    id: 'addition',
    symbol: '+',
    nameFi: 'Yhteenlasku (+)',
    nameEn: 'Addition (+)',
    color: 'bg-emerald-500 hover:bg-emerald-600',
    lightColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    icon: '➕',
  },
  subtraction: {
    id: 'subtraction',
    symbol: '−',
    nameFi: 'Vähennyslasku (−)',
    nameEn: 'Subtraction (−)',
    color: 'bg-amber-500 hover:bg-amber-600',
    lightColor: 'bg-amber-50 text-amber-800 border-amber-300',
    badgeColor: 'bg-amber-100 text-amber-700',
    icon: '➖',
  },
  multiplication: {
    id: 'multiplication',
    symbol: '×',
    nameFi: 'Kertolasku (×)',
    nameEn: 'Multiplication (×)',
    color: 'bg-blue-500 hover:bg-blue-600',
    lightColor: 'bg-blue-50 text-blue-800 border-blue-300',
    badgeColor: 'bg-blue-100 text-blue-700',
    icon: '✖️',
  },
  division: {
    id: 'division',
    symbol: '÷',
    nameFi: 'Jakolasku (÷)',
    nameEn: 'Division (÷)',
    color: 'bg-purple-500 hover:bg-purple-600',
    lightColor: 'bg-purple-50 text-purple-800 border-purple-300',
    badgeColor: 'bg-purple-100 text-purple-700',
    icon: '➗',
  },
};

/**
 * Generate a single question based on configuration
 */
export function generateQuestion(config) {
  const {
    operations = ['addition'],
    maxNumber = 20, // default range 0-20 (Finnish 1st grade spring)
    minNumber = 0,
    tableStart = 2, // multiplication table start
    tableEnd = 5,   // multiplication table end
    specificTables = [], // optional explicit list [2, 3, 5]
  } = config;

  // Pick an operation randomly from chosen operations
  const op = operations[Math.floor(Math.random() * operations.length)] || 'addition';

  let num1 = 0;
  let num2 = 0;
  let answer = 0;
  let symbol = '+';

  if (op === 'addition') {
    symbol = '+';
    // Ensure num1 + num2 <= maxNumber and >= minNumber
    const totalMax = Math.max(minNumber + 1, maxNumber);
    // Finnish 1st-2nd grade: start with sum up to max
    const sum = Math.floor(Math.random() * (totalMax - minNumber + 1)) + minNumber;
    num1 = Math.floor(Math.random() * (sum + 1));
    num2 = sum - num1;
    answer = sum;
  } else if (op === 'subtraction') {
    symbol = '−';
    // Ensure no negative answers (A >= B >= 0)
    const upper = Math.max(minNumber + 1, maxNumber);
    num1 = Math.floor(Math.random() * (upper - minNumber + 1)) + minNumber;
    num2 = Math.floor(Math.random() * (num1 + 1)); // num2 <= num1 guarantees answer >= 0
    answer = num1 - num2;
  } else if (op === 'multiplication') {
    symbol = '×';
    // Granular multiplication: choose table from range or list
    let table = tableStart;
    if (specificTables && specificTables.length > 0) {
      table = specificTables[Math.floor(Math.random() * specificTables.length)];
    } else {
      const minT = Math.min(tableStart, tableEnd);
      const maxT = Math.max(tableStart, tableEnd);
      table = Math.floor(Math.random() * (maxT - minT + 1)) + minT;
    }
    // Multiply by 1 to 10
    const multiplier = Math.floor(Math.random() * 10) + 1;
    
    // Randomize order for pedagogical variety (e.g. 3x5 or 5x3)
    if (Math.random() > 0.5) {
      num1 = table;
      num2 = multiplier;
    } else {
      num1 = multiplier;
      num2 = table;
    }
    answer = num1 * num2;
  } else if (op === 'division') {
    symbol = '÷';
    // Grade 1-2 friendly: exact integer division without remainders
    let divisor = tableStart;
    if (specificTables && specificTables.length > 0) {
      divisor = specificTables[Math.floor(Math.random() * specificTables.length)];
    } else {
      const minT = Math.max(1, Math.min(tableStart, tableEnd));
      const maxT = Math.max(minT, tableEnd);
      divisor = Math.floor(Math.random() * (maxT - minT + 1)) + minT;
    }
    const quotient = Math.floor(Math.random() * 10) + 1; // clean quotient 1-10
    const dividend = divisor * quotient;

    num1 = dividend;
    num2 = divisor;
    answer = quotient;
  }

  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    operation: op,
    symbol,
    num1,
    num2,
    correctAnswer: answer,
    displayString: `${num1} ${symbol} ${num2}`,
  };
}

/**
 * Generate a complete test set of unique questions
 */
export function generateTestQuestions(config, count = 10) {
  const questions = [];
  const signatures = new Set();
  const maxAttempts = count * 8;
  let attempts = 0;

  while (questions.length < count && attempts < maxAttempts) {
    attempts++;
    const q = generateQuestion(config);
    const sig = `${q.operation}:${q.num1}:${q.symbol}:${q.num2}`;
    
    // Avoid immediate duplicates when possible
    if (!signatures.has(sig) || attempts > count * 3) {
      signatures.add(sig);
      questions.push(q);
    }
  }

  // If still less than count, fill up
  while (questions.length < count) {
    questions.push(generateQuestion(config));
  }

  return questions;
}

/**
 * Check if the child's input matches the expected answer.
 * Handles Finnish comma separator (e.g. "4,0" === 4, "5" === 5)
 */
export function checkAnswer(userInput, expectedAnswer) {
  if (userInput === null || userInput === undefined || userInput.trim() === '') {
    return false;
  }
  // Replace Finnish comma with decimal point
  const normalized = userInput.toString().trim().replace(',', '.');
  const parsed = parseFloat(normalized);

  if (isNaN(parsed)) return false;
  // Account for floating point epsilon if ever decimals are generated
  return Math.abs(parsed - expectedAnswer) < 0.0001;
}

