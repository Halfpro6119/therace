/**
 * Compute Lab – AQA GCSE Computer Science 8525
 * Units 3.1–3.8, concepts, glossary, quick checks, algorithm lab, calculation lab, logic lab, SQL lab, question lab.
 */

import type {
  ComputeUnit,
  ComputeConcept,
  ComputeTerm,
  ComputeQuickCheck,
  TraceTableTask,
  ComputeCalculationTask,
  LogicCircuitTask,
  SqlTask,
  ComputeQuestion,
  ComputeUnitId,
} from '../types/computeLab';

// ============================================================================
// UNITS & TOPICS
// ============================================================================

export const COMPUTE_UNITS: ComputeUnit[] = [
  {
    id: '3.1',
    title: 'Fundamentals of algorithms',
    shortTitle: 'Algorithms',
    paper1: true,
    paper2: false,
    topics: [
      { id: '3.1.1', unitId: '3.1', title: 'Representing algorithms', specRef: '3.1.1' },
      { id: '3.1.2', unitId: '3.1', title: 'Efficiency of algorithms', specRef: '3.1.2' },
      { id: '3.1.3', unitId: '3.1', title: 'Searching algorithms', specRef: '3.1.3' },
      { id: '3.1.4', unitId: '3.1', title: 'Sorting algorithms', specRef: '3.1.4' },
    ],
  },
  {
    id: '3.2',
    title: 'Programming',
    shortTitle: 'Programming',
    paper1: true,
    paper2: false,
    topics: [
      { id: '3.2.1', unitId: '3.2', title: 'Data types', specRef: '3.2.1' },
      { id: '3.2.2', unitId: '3.2', title: 'Programming concepts', specRef: '3.2.2' },
      { id: '3.2.6', unitId: '3.2', title: 'Data structures', specRef: '3.2.6' },
      { id: '3.2.10', unitId: '3.2', title: 'Subroutines', specRef: '3.2.10' },
      { id: '3.2.11', unitId: '3.2', title: 'Robust and secure programming', specRef: '3.2.11' },
    ],
  },
  {
    id: '3.3',
    title: 'Fundamentals of data representation',
    shortTitle: 'Data representation',
    paper1: false,
    paper2: true,
    topics: [
      { id: '3.3.1', unitId: '3.3', title: 'Number bases', specRef: '3.3.1' },
      { id: '3.3.2', unitId: '3.3', title: 'Converting between bases', specRef: '3.3.2' },
      { id: '3.3.3', unitId: '3.3', title: 'Units of information', specRef: '3.3.3' },
      { id: '3.3.4', unitId: '3.3', title: 'Binary arithmetic', specRef: '3.3.4' },
      { id: '3.3.5', unitId: '3.3', title: 'Character encoding', specRef: '3.3.5' },
      { id: '3.3.6', unitId: '3.3', title: 'Representing images', specRef: '3.3.6' },
      { id: '3.3.7', unitId: '3.3', title: 'Representing sound', specRef: '3.3.7' },
      { id: '3.3.8', unitId: '3.3', title: 'Data compression', specRef: '3.3.8' },
    ],
  },
  {
    id: '3.4',
    title: 'Computer systems',
    shortTitle: 'Computer systems',
    paper1: false,
    paper2: true,
    topics: [
      { id: '3.4.1', unitId: '3.4', title: 'Hardware and software', specRef: '3.4.1' },
      { id: '3.4.2', unitId: '3.4', title: 'Boolean logic', specRef: '3.4.2' },
      { id: '3.4.3', unitId: '3.4', title: 'Software classification', specRef: '3.4.3' },
      { id: '3.4.4', unitId: '3.4', title: 'Programming languages and translators', specRef: '3.4.4' },
      { id: '3.4.5', unitId: '3.4', title: 'Systems architecture', specRef: '3.4.5' },
    ],
  },
  {
    id: '3.5',
    title: 'Fundamentals of computer networks',
    shortTitle: 'Networks',
    paper1: false,
    paper2: true,
    topics: [
      { id: '3.5.1', unitId: '3.5', title: 'Networks', specRef: '3.5.1' },
      { id: '3.5.2', unitId: '3.5', title: 'Protocols', specRef: '3.5.2' },
      { id: '3.5.3', unitId: '3.5', title: 'Network security', specRef: '3.5.3' },
      { id: '3.5.4', unitId: '3.5', title: 'TCP/IP model', specRef: '3.5.4' },
    ],
  },
  {
    id: '3.6',
    title: 'Cyber security',
    shortTitle: 'Cyber security',
    paper1: false,
    paper2: true,
    topics: [
      { id: '3.6.1', unitId: '3.6', title: 'Fundamentals', specRef: '3.6.1' },
      { id: '3.6.2', unitId: '3.6', title: 'Threats', specRef: '3.6.2' },
      { id: '3.6.3', unitId: '3.6', title: 'Detection and prevention', specRef: '3.6.3' },
    ],
  },
  {
    id: '3.7',
    title: 'Relational databases and SQL',
    shortTitle: 'Databases & SQL',
    paper1: false,
    paper2: true,
    topics: [
      { id: '3.7.1', unitId: '3.7', title: 'Relational databases', specRef: '3.7.1' },
      { id: '3.7.2', unitId: '3.7', title: 'SQL', specRef: '3.7.2' },
    ],
  },
  {
    id: '3.8',
    title: 'Ethical, legal and environmental impacts',
    shortTitle: 'Ethical & legal impacts',
    paper1: false,
    paper2: true,
    topics: [
      { id: '3.8.1', unitId: '3.8', title: 'Impacts of digital technology', specRef: '3.8.1' },
    ],
  },
];

// ============================================================================
// CONCEPTS
// ============================================================================

export const COMPUTE_CONCEPTS: ComputeConcept[] = [
  // 3.1
  {
    id: 'c-3.1.1-algorithm',
    unitId: '3.1',
    topicId: '3.1.1',
    title: 'Algorithm, decomposition and abstraction',
    coreIdea: 'An algorithm is a sequence of steps to complete a task. Decomposition breaks a problem into sub-problems. Abstraction removes unnecessary detail. Algorithms can be represented using pseudo-code, flowcharts or program code.',
    commonMisconception: 'Confusing algorithm with program – a program implements an algorithm; an algorithm is the logical plan.',
    changeScenarios: [
      { prompt: 'Why use decomposition when solving a complex problem?', explanation: 'Breaking into smaller parts makes each part easier to understand, test and debug; teams can work on different parts.' },
    ],
  },
  {
    id: 'c-3.1.3-search',
    unitId: '3.1',
    topicId: '3.1.3',
    title: 'Linear and binary search',
    coreIdea: 'Linear search checks each item in order until found; works on any list. Binary search repeatedly halves the search space; requires a sorted list but is much faster for large datasets.',
    commonMisconception: 'Thinking binary search always finds an item faster – it only works on sorted data and is faster when the list is large.',
    changeScenarios: [
      { prompt: 'When would you choose linear search over binary search?', explanation: 'When the list is unsorted or small; when you need to find all occurrences.' },
    ],
  },
  {
    id: 'c-3.1.4-sort',
    unitId: '3.1',
    topicId: '3.1.4',
    title: 'Merge sort and bubble sort',
    coreIdea: 'Bubble sort repeatedly compares adjacent pairs and swaps if wrong order; simple but slow for large lists. Merge sort divides the list, sorts each half recursively, then merges; more efficient for large datasets.',
    commonMisconception: 'Thinking bubble sort is always worse – for very small or nearly sorted lists it can be acceptable.',
    changeScenarios: [
      { prompt: 'Why is merge sort more efficient than bubble sort for large lists?', explanation: 'Merge sort has O(n log n) time complexity; bubble sort has O(n²). Merge sort divides and conquers; bubble sort makes many repeated passes.' },
    ],
  },
  // 3.2
  {
    id: 'c-3.2.1-datatypes',
    unitId: '3.2',
    topicId: '3.2.1',
    title: 'Data types',
    coreIdea: 'Data types define what kind of data a variable holds: integer (whole numbers), real (decimals), Boolean (true/false), character (single symbol), string (text). Using the right type prevents errors and saves memory.',
    commonMisconception: 'Using a string for numbers – "123" + "4" gives "1234" not 127.',
    changeScenarios: [
      { prompt: 'Why use a Boolean instead of storing 0 and 1?', explanation: 'Boolean makes intent clear (isLoggedIn vs 1); prevents invalid values; some languages optimise Boolean storage.' },
    ],
  },
  {
    id: 'c-3.2.2-control',
    unitId: '3.2',
    topicId: '3.2.2',
    title: 'Sequence, selection and iteration',
    coreIdea: 'All programs use sequence (order of execution), selection (IF/ELSE) and iteration (loops). Definite iteration (FOR) runs a fixed number of times; indefinite (WHILE/REPEAT) runs until a condition is met.',
    commonMisconception: 'Confusing WHILE and REPEAT – WHILE checks before; REPEAT checks after (always runs at least once).',
    changeScenarios: [
      { prompt: 'When would you use REPEAT instead of WHILE?', explanation: 'When the loop body must run at least once (e.g. asking for input until valid).' },
    ],
  },
  // 3.3
  {
    id: 'c-3.3.1-bases',
    unitId: '3.3',
    topicId: '3.3.1',
    title: 'Number bases: decimal, binary, hexadecimal',
    coreIdea: 'Computers use binary (0 and 1) because hardware is built from switches. Decimal is base 10; binary base 2; hexadecimal base 16. Hex is used because it is compact and maps neatly to binary (1 hex digit = 4 bits).',
    commonMisconception: 'Thinking hex is a different "kind" of number – it is just another way to represent the same values.',
    changeScenarios: [
      { prompt: 'Why use hexadecimal when displaying memory addresses or colours?', explanation: 'More compact than binary; each hex digit = 4 bits, so easy to convert; colours often use hex (e.g. #FF0000 for red).' },
    ],
  },
  {
    id: 'c-3.3.6-bitmap',
    unitId: '3.3',
    topicId: '3.3.6',
    title: 'Bitmap images: pixels and colour depth',
    coreIdea: 'A bitmap image is a grid of pixels. Each pixel has a colour value. Colour depth is the number of bits per pixel (e.g. 8 bits = 256 colours). File size = width × height × colour depth ÷ 8 bytes.',
    commonMisconception: 'Thinking more pixels always means better quality – it also means larger file size; resolution must match display.',
    changeScenarios: [
      { prompt: 'If you double both width and height of an image, what happens to file size?', explanation: 'File size quadruples (2×2 = 4× the pixels).' },
    ],
  },
  // 3.4
  {
    id: 'c-3.4.2-logic',
    unitId: '3.4',
    topicId: '3.4.2',
    title: 'Boolean logic: NOT, AND, OR, XOR',
    coreIdea: 'Logic gates process binary inputs. NOT inverts; AND outputs 1 only if both inputs 1; OR outputs 1 if either input 1; XOR outputs 1 if inputs are different. Truth tables show all combinations.',
    commonMisconception: 'Confusing AND and OR – AND needs both true; OR needs at least one true.',
    changeScenarios: [
      { prompt: 'When does XOR output 1?', explanation: 'When the two inputs are different (one 0, one 1).' },
    ],
  },
  {
    id: 'c-3.4.5-cpu',
    unitId: '3.4',
    topicId: '3.4.5',
    title: 'CPU and Fetch-Execute cycle',
    coreIdea: 'The CPU has an ALU (calculations), control unit (coordinates), and registers. Fetch-Execute: fetch instruction from memory, decode it, execute it. Clock speed, cores and cache affect performance.',
    commonMisconception: 'Thinking higher clock speed always means faster – more cores can run tasks in parallel; cache reduces memory access time.',
    changeScenarios: [
      { prompt: 'What happens in the fetch phase of the Fetch-Execute cycle?', explanation: 'The next instruction is copied from main memory (RAM) into the CPU.' },
    ],
  },
  // 3.5
  {
    id: 'c-3.5.1-networks',
    unitId: '3.5',
    topicId: '3.5.1',
    title: 'LAN, WAN and PAN',
    coreIdea: 'LAN covers a small area (e.g. school, office); usually owned by one organisation. WAN covers a wide area (e.g. internet); often distributed ownership. PAN is for personal devices (e.g. Bluetooth).',
    commonMisconception: 'Thinking the internet is a LAN – it is the largest WAN.',
    changeScenarios: [
      { prompt: 'What are advantages of a computer network?', explanation: 'Sharing resources (files, printers), communication, centralised backup, access from multiple devices.' },
    ],
  },
  // 3.6
  {
    id: 'c-3.6.2-threats',
    unitId: '3.6',
    topicId: '3.6.2',
    title: 'Cyber security threats',
    coreIdea: 'Threats include social engineering (phishing, blagging, shouldering), malware (virus, trojan, spyware), pharming, weak passwords, misconfigured access, removable media, unpatched software.',
    commonMisconception: 'Thinking only technical attacks matter – social engineering exploits human trust.',
    changeScenarios: [
      { prompt: 'How does phishing differ from pharming?', explanation: 'Phishing uses fake emails/links to steal info; pharming redirects legitimate website traffic to a fake site.' },
    ],
  },
  // 3.7
  {
    id: 'c-3.7.1-db',
    unitId: '3.7',
    topicId: '3.7.1',
    title: 'Relational databases',
    coreIdea: 'A database stores data in tables. Each table has records (rows) and fields (columns). Primary key uniquely identifies a record; foreign key links tables. Relational design reduces data redundancy and inconsistency.',
    commonMisconception: 'Thinking primary key must be a single column – it can be composite (multiple columns).',
    changeScenarios: [
      { prompt: 'Why use a foreign key?', explanation: 'To link tables and maintain referential integrity; avoids duplicating data.' },
    ],
  },
  // 3.8
  {
    id: 'c-3.8.1-impacts',
    unitId: '3.8',
    topicId: '3.8.1',
    title: 'Ethical, legal and environmental impacts',
    coreIdea: 'Digital technology affects privacy, security, environment and society. Issues include hacking, data privacy, e-waste, energy use, autonomous vehicles, wearables. Governments balance security with privacy.',
    commonMisconception: 'Assuming more data collection always improves security – it can harm privacy and be misused.',
    changeScenarios: [
      { prompt: 'Give an ethical issue with wearable technology.', explanation: 'Constant monitoring; data ownership; who can access health/fitness data; surveillance concerns.' },
    ],
  },
];

// ============================================================================
// GLOSSARY (TERMS)
// ============================================================================

export const COMPUTE_TERMS: ComputeTerm[] = [
  { id: 't-algorithm', unitId: '3.1', topicId: '3.1.1', term: 'Algorithm', definition: 'A sequence of steps that can be followed to complete a task.', inContext: 'A program is an implementation of an algorithm.' },
  { id: 't-decomposition', unitId: '3.1', topicId: '3.1.1', term: 'Decomposition', definition: 'Breaking a problem into a number of sub-problems, each accomplishing an identifiable task.' },
  { id: 't-abstraction', unitId: '3.1', topicId: '3.1.1', term: 'Abstraction', definition: 'The process of removing unnecessary detail from a problem.' },
  { id: 't-linear-search', unitId: '3.1', topicId: '3.1.3', term: 'Linear search', definition: 'A search that checks each item in sequence until the target is found or the list ends.' },
  { id: 't-binary-search', unitId: '3.1', topicId: '3.1.3', term: 'Binary search', definition: 'A search that repeatedly halves the search space; requires a sorted list.' },
  { id: 't-bubble-sort', unitId: '3.1', topicId: '3.1.4', term: 'Bubble sort', definition: 'A sorting algorithm that repeatedly compares and swaps adjacent elements.' },
  { id: 't-merge-sort', unitId: '3.1', topicId: '3.1.4', term: 'Merge sort', definition: 'A sorting algorithm that divides the list, sorts each half recursively, then merges.' },
  { id: 't-variable', unitId: '3.2', topicId: '3.2.2', term: 'Variable', definition: 'A named storage location whose value can change during program execution.' },
  { id: 't-constant', unitId: '3.2', topicId: '3.2.2', term: 'Constant', definition: 'A named value that does not change during program execution.' },
  { id: 't-subroutine', unitId: '3.2', topicId: '3.2.10', term: 'Subroutine', definition: 'A named block of code that can be called from elsewhere in the program; procedure or function.' },
  { id: 't-array', unitId: '3.2', topicId: '3.2.6', term: 'Array', definition: 'A data structure that holds multiple values of the same type, accessed by index.' },
  { id: 't-bit', unitId: '3.3', topicId: '3.3.3', term: 'Bit', definition: 'The fundamental unit of information; either 0 or 1.' },
  { id: 't-byte', unitId: '3.3', topicId: '3.3.3', term: 'Byte', definition: 'A group of 8 bits.' },
  { id: 't-pixel', unitId: '3.3', topicId: '3.3.6', term: 'Pixel', definition: 'Picture element; a single point in a digital image.' },
  { id: 't-colour-depth', unitId: '3.3', topicId: '3.3.6', term: 'Colour depth', definition: 'The number of bits used to represent each pixel in an image.' },
  { id: 't-ascii', unitId: '3.3', topicId: '3.3.5', term: 'ASCII', definition: 'A character encoding using 7 bits; represents 128 characters.' },
  { id: 't-unicode', unitId: '3.3', topicId: '3.3.5', term: 'Unicode', definition: 'A character encoding that supports many alphabets and symbols; extends ASCII.' },
  { id: 't-hardware', unitId: '3.4', topicId: '3.4.1', term: 'Hardware', definition: 'The physical components of a computer system.' },
  { id: 't-software', unitId: '3.4', topicId: '3.4.1', term: 'Software', definition: 'Programs and data that run on hardware.' },
  { id: 't-cpu', unitId: '3.4', topicId: '3.4.5', term: 'CPU', definition: 'Central Processing Unit; executes instructions and controls the computer.' },
  { id: 't-ram', unitId: '3.4', topicId: '3.4.5', term: 'RAM', definition: 'Random Access Memory; volatile memory used for programs and data in use.' },
  { id: 't-rom', unitId: '3.4', topicId: '3.4.5', term: 'ROM', definition: 'Read Only Memory; non-volatile memory containing boot instructions.' },
  { id: 't-protocol', unitId: '3.5', topicId: '3.5.2', term: 'Protocol', definition: 'A set of rules governing how data is transmitted over a network.' },
  { id: 't-firewall', unitId: '3.5', topicId: '3.5.3', term: 'Firewall', definition: 'A security device that monitors and filters network traffic based on rules.' },
  { id: 't-malware', unitId: '3.6', topicId: '3.6.2', term: 'Malware', definition: 'Malicious software; includes viruses, trojans and spyware.' },
  { id: 't-phishing', unitId: '3.6', topicId: '3.6.2', term: 'Phishing', definition: 'A social engineering technique using fake emails or messages to steal private information.' },
  { id: 't-primary-key', unitId: '3.7', topicId: '3.7.1', term: 'Primary key', definition: 'A field that uniquely identifies each record in a table.' },
  { id: 't-foreign-key', unitId: '3.7', topicId: '3.7.1', term: 'Foreign key', definition: 'A field that links to the primary key of another table.' },
];

// ============================================================================
// QUICK CHECKS
// ============================================================================

export const COMPUTE_QUICK_CHECKS: ComputeQuickCheck[] = [
  { id: 'qc-3.1.1-a', unitId: '3.1', topicId: '3.1.1', type: 'multipleChoice', question: 'What is an algorithm?', options: ['A computer program', 'A sequence of steps to complete a task', 'A type of data', 'A programming language'], correctAnswer: 'A sequence of steps to complete a task', feedback: { correct: 'Correct. An algorithm is the logical plan; a program implements it.', incorrect: 'An algorithm is a sequence of steps to complete a task, not a program itself.' } },
  { id: 'qc-3.1.1-b', unitId: '3.1', topicId: '3.1.1', type: 'multipleChoice', question: 'What is decomposition?', options: ['Removing detail from a problem', 'Breaking a problem into sub-problems', 'Writing pseudo-code', 'Testing a program'], correctAnswer: 'Breaking a problem into sub-problems', feedback: { correct: 'Correct. Decomposition splits complex problems into manageable parts.', incorrect: 'Decomposition means breaking a problem into a number of sub-problems.' } },
  { id: 'qc-3.1.3-a', unitId: '3.1', topicId: '3.1.3', type: 'multipleChoice', question: 'Binary search requires the list to be:', options: ['Unsorted', 'Sorted', 'Empty', 'Alphabetical'], correctAnswer: 'Sorted', feedback: { correct: 'Correct. Binary search repeatedly halves the search space, which only works when sorted.', incorrect: 'Binary search requires a sorted list to work correctly.' } },
  { id: 'qc-3.1.4-a', unitId: '3.1', topicId: '3.1.4', type: 'multipleChoice', question: 'Which sort is generally more efficient for large lists?', options: ['Bubble sort', 'Merge sort', 'Both are equal', 'Linear sort'], correctAnswer: 'Merge sort', feedback: { correct: 'Correct. Merge sort has O(n log n) vs bubble sort O(n²).', incorrect: 'Merge sort is more efficient for large lists due to its divide-and-conquer approach.' } },
  { id: 'qc-3.2.1-a', unitId: '3.2', topicId: '3.2.1', type: 'multipleChoice', question: 'Which data type holds true or false?', options: ['Integer', 'String', 'Boolean', 'Character'], correctAnswer: 'Boolean', feedback: { correct: 'Correct. Boolean stores true/false values.', incorrect: 'Boolean is the data type for true/false values.' } },
  { id: 'qc-3.2.2-a', unitId: '3.2', topicId: '3.2.2', type: 'multipleChoice', question: 'A FOR loop is an example of:', options: ['Indefinite iteration', 'Definite iteration', 'Selection', 'Sequence'], correctAnswer: 'Definite iteration', feedback: { correct: 'Correct. FOR runs a fixed number of times (count-controlled).', incorrect: 'FOR is definite (count-controlled) iteration; WHILE/REPEAT are indefinite.' } },
  { id: 'qc-3.3.1-a', unitId: '3.3', topicId: '3.3.1', type: 'shortAnswer', question: 'What base is hexadecimal?', correctAnswer: '16', feedback: { correct: 'Correct. Hexadecimal is base 16.', incorrect: 'Hexadecimal is base 16.' } },
  { id: 'qc-3.3.3-a', unitId: '3.3', topicId: '3.3.3', type: 'multipleChoice', question: 'How many bits are in a byte?', options: ['4', '8', '16', '32'], correctAnswer: '8', feedback: { correct: 'Correct. A byte is 8 bits.', incorrect: 'A byte is a group of 8 bits.' } },
  { id: 'qc-3.3.6-a', unitId: '3.3', topicId: '3.3.6', type: 'multipleChoice', question: 'What does colour depth determine?', options: ['The number of pixels', 'The number of bits per pixel', 'The image size in bytes', 'The resolution'], correctAnswer: 'The number of bits per pixel', feedback: { correct: 'Correct. Colour depth is bits per pixel.', incorrect: 'Colour depth is the number of bits used to represent each pixel.' } },
  { id: 'qc-3.4.2-a', unitId: '3.4', topicId: '3.4.2', type: 'multipleChoice', question: 'When does an AND gate output 1?', options: ['When either input is 1', 'When both inputs are 1', 'When both inputs are 0', 'When inputs differ'], correctAnswer: 'When both inputs are 1', feedback: { correct: 'Correct. AND outputs 1 only when both inputs are 1.', incorrect: 'AND outputs 1 only when both inputs are 1.' } },
  { id: 'qc-3.4.5-a', unitId: '3.4', topicId: '3.4.5', type: 'multipleChoice', question: 'Which component performs arithmetic and logic operations?', options: ['Control unit', 'ALU', 'Cache', 'RAM'], correctAnswer: 'ALU', feedback: { correct: 'Correct. The ALU (Arithmetic Logic Unit) performs calculations.', incorrect: 'The ALU (Arithmetic Logic Unit) performs arithmetic and logic operations.' } },
  { id: 'qc-3.5.1-a', unitId: '3.5', topicId: '3.5.1', type: 'multipleChoice', question: 'The internet is an example of a:', options: ['LAN', 'WAN', 'PAN', 'VPN'], correctAnswer: 'WAN', feedback: { correct: 'Correct. The internet is the largest WAN.', incorrect: 'The internet is a Wide Area Network (WAN).' } },
  { id: 'qc-3.6.2-a', unitId: '3.6', topicId: '3.6.2', type: 'multipleChoice', question: 'Phishing is a type of:', options: ['Malware', 'Social engineering', 'Encryption', 'Firewall'], correctAnswer: 'Social engineering', feedback: { correct: 'Correct. Phishing manipulates people to give up information.', incorrect: 'Phishing is a social engineering technique using fake emails or messages.' } },
  { id: 'qc-3.7.1-a', unitId: '3.7', topicId: '3.7.1', type: 'multipleChoice', question: 'What uniquely identifies each record in a table?', options: ['Foreign key', 'Primary key', 'Index', 'Field'], correctAnswer: 'Primary key', feedback: { correct: 'Correct. The primary key uniquely identifies each record.', incorrect: 'The primary key uniquely identifies each record in a table.' } },
];

// ============================================================================
// TRACE TABLE TASKS (Algorithm Lab)
// ============================================================================

export const COMPUTE_TRACE_TASKS: TraceTableTask[] = [
  {
    id: 'tt-linear-1',
    unitId: '3.1',
    topicId: '3.1.3',
    title: 'Trace linear search',
    pseudoCode: `FOUND ← FALSE
FOR i ← 0 TO LEN(arr) - 1
  IF arr[i] = target THEN
    FOUND ← TRUE
  ENDIF
ENDFOR
OUTPUT FOUND`,
    inputValues: { arr: '[5, 3, 8, 2, 9]', target: '8' },
    expectedOutput: 'TRUE',
    traceColumns: ['i', 'arr[i]', 'FOUND'],
  },
  {
    id: 'tt-bubble-1',
    unitId: '3.1',
    topicId: '3.1.4',
    title: 'Trace bubble sort (one pass)',
    pseudoCode: `FOR i ← 0 TO LEN(arr) - 2
  IF arr[i] > arr[i+1] THEN
    temp ← arr[i]
    arr[i] ← arr[i+1]
    arr[i+1] ← temp
  ENDIF
ENDFOR`,
    inputValues: { arr: '[5, 3, 8, 2]' },
    expectedOutput: '[3, 5, 2, 8]',
    traceColumns: ['i', 'arr[i]', 'arr[i+1]', 'arr'],
  },
];

// ============================================================================
// CALCULATION TASKS
// ============================================================================

export const COMPUTE_CALCULATION_TASKS: ComputeCalculationTask[] = [
  { id: 'calc-bin-dec-1', unitId: '3.3', topicId: '3.3.2', type: 'binaryToDecimal', scenario: 'Convert the binary number 11010110 to decimal.', inputs: {}, expected: 214, formulaHint: 'Each bit position is a power of 2: 128, 64, 32, 16, 8, 4, 2, 1' },
  { id: 'calc-dec-bin-1', unitId: '3.3', topicId: '3.3.2', type: 'decimalToBinary', scenario: 'Convert 42 from decimal to binary.', inputs: { decimal: 42 }, expected: 101010, formulaHint: 'Repeatedly divide by 2 and note remainders' },
  { id: 'calc-bitmap-1', unitId: '3.3', topicId: '3.3.6', type: 'bitmapFileSize', scenario: 'An image is 800 × 600 pixels with 24-bit colour depth. Calculate file size in bytes.', inputs: { width: 800, height: 600, depth: 24 }, expected: 1440000, formulaHint: '(W × H × D) / 8 bytes' },
  { id: 'calc-sound-1', unitId: '3.3', topicId: '3.3.7', type: 'soundFileSize', scenario: 'Sound: 44.1 kHz, 16-bit resolution, 10 seconds. File size in bits?', inputs: { rate: 44100, resolution: 16, seconds: 10 }, expected: 7056000, formulaHint: 'rate × resolution × seconds' },
];

// ============================================================================
// LOGIC CIRCUIT TASKS
// ============================================================================

export const COMPUTE_LOGIC_TASKS: LogicCircuitTask[] = [
  {
    id: 'logic-and-1',
    unitId: '3.4',
    topicId: '3.4.2',
    title: 'AND gate truth table',
    inputs: ['A', 'B'],
    truthTable: { '00': 0, '01': 0, '10': 0, '11': 1 },
    expression: 'A.B',
  },
  {
    id: 'logic-or-1',
    unitId: '3.4',
    topicId: '3.4.2',
    title: 'OR gate truth table',
    inputs: ['A', 'B'],
    truthTable: { '00': 0, '01': 1, '10': 1, '11': 1 },
    expression: 'A+B',
  },
  {
    id: 'logic-xor-1',
    unitId: '3.4',
    topicId: '3.4.2',
    title: 'XOR gate truth table',
    inputs: ['A', 'B'],
    truthTable: { '00': 0, '01': 1, '10': 1, '11': 0 },
    expression: 'A⊕B',
  },
];

// ============================================================================
// SQL TASKS
// ============================================================================

export const COMPUTE_SQL_TASKS: SqlTask[] = [
  {
    id: 'sql-1',
    unitId: '3.7',
    topicId: '3.7.2',
    title: 'SELECT all from table',
    schema: 'Students(id, name, age, year)',
    question: 'Write SQL to select all columns from the Students table.',
    expectedQuery: 'SELECT * FROM Students',
  },
  {
    id: 'sql-2',
    unitId: '3.7',
    topicId: '3.7.2',
    title: 'SELECT with WHERE',
    schema: 'Students(id, name, age, year)',
    question: 'Write SQL to select the name of students where year is 10.',
    expectedQuery: 'SELECT name FROM Students WHERE year = 10',
  },
  {
    id: 'sql-3',
    unitId: '3.7',
    topicId: '3.7.2',
    title: 'SELECT with ORDER BY',
    schema: 'Products(id, name, price)',
    question: 'Write SQL to select name and price, ordered by price descending.',
    expectedQuery: 'SELECT name, price FROM Products ORDER BY price DESC',
  },
];

// ============================================================================
// QUESTION LAB
// ============================================================================

export const COMPUTE_QUESTIONS: ComputeQuestion[] = [
  { id: 'q-3.1-1', unitId: '3.1', topicId: '3.1.1', paper: 1, type: 'shortAnswer', question: 'Explain the difference between an algorithm and a computer program.', correctAnswer: 'An algorithm is a sequence of steps to complete a task; a program is an implementation of that algorithm in code.', markScheme: '1 mark: algorithm = steps/plan. 1 mark: program = implementation in code.' },
  { id: 'q-3.1-2', unitId: '3.1', topicId: '3.1.3', paper: 1, type: 'multipleChoice', question: 'When is binary search more efficient than linear search?', options: ['Always', 'When the list is sorted and large', 'When the list is unsorted', 'Never'], correctAnswer: 'When the list is sorted and large', markScheme: '1 mark: sorted and large.' },
  { id: 'q-3.3-1', unitId: '3.3', topicId: '3.3.2', paper: 2, type: 'shortAnswer', question: 'Convert 255 from decimal to hexadecimal.', correctAnswer: 'FF', markScheme: '1 mark: FF.' },
  { id: 'q-3.4-1', unitId: '3.4', topicId: '3.4.5', paper: 2, type: 'shortAnswer', question: 'Name the three stages of the Fetch-Execute cycle.', correctAnswer: 'Fetch, Decode, Execute', markScheme: '1 mark each for fetch, decode, execute.' },
  { id: 'q-3.6-1', unitId: '3.6', topicId: '3.6.2', paper: 2, type: 'shortAnswer', question: 'Describe one method to protect against phishing.', correctAnswer: 'Be wary of suspicious emails; verify sender; do not click links in unsolicited emails; use spam filters.', markScheme: '1–2 marks for valid method.' },
];

// ============================================================================
// HELPERS
// ============================================================================

export function getUnitById(id: string): ComputeUnit | undefined {
  return COMPUTE_UNITS.find((u) => u.id === id);
}

export function getConceptsByUnit(unitId: ComputeUnitId): ComputeConcept[] {
  return COMPUTE_CONCEPTS.filter((c) => c.unitId === unitId);
}

export function getTermsByUnit(unitId: ComputeUnitId): ComputeTerm[] {
  return COMPUTE_TERMS.filter((t) => t.unitId === unitId);
}

export function getQuickChecksByUnit(unitId: ComputeUnitId): ComputeQuickCheck[] {
  return COMPUTE_QUICK_CHECKS.filter((q) => q.unitId === unitId);
}

export function getTraceTasksByUnit(unitId: ComputeUnitId): TraceTableTask[] {
  return COMPUTE_TRACE_TASKS.filter((t) => t.unitId === unitId);
}

export function getCalculationTasksByUnit(unitId: ComputeUnitId): ComputeCalculationTask[] {
  return COMPUTE_CALCULATION_TASKS.filter((t) => t.unitId === unitId);
}

export function getLogicTasksByUnit(unitId: ComputeUnitId): LogicCircuitTask[] {
  return COMPUTE_LOGIC_TASKS.filter((t) => t.unitId === unitId);
}

export function getSqlTasksByUnit(unitId: ComputeUnitId): SqlTask[] {
  return COMPUTE_SQL_TASKS.filter((t) => t.unitId === unitId);
}

export function getQuestionsByUnit(unitId: ComputeUnitId): ComputeQuestion[] {
  return COMPUTE_QUESTIONS.filter((q) => q.unitId === unitId);
}
