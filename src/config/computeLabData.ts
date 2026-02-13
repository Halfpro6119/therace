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
      { id: '3.2.3', unitId: '3.2', title: 'Arithmetic operations', specRef: '3.2.3' },
      { id: '3.2.4', unitId: '3.2', title: 'Relational operations', specRef: '3.2.4' },
      { id: '3.2.5', unitId: '3.2', title: 'Boolean operations', specRef: '3.2.5' },
      { id: '3.2.6', unitId: '3.2', title: 'Data structures', specRef: '3.2.6' },
      { id: '3.2.7', unitId: '3.2', title: 'Input/output', specRef: '3.2.7' },
      { id: '3.2.8', unitId: '3.2', title: 'String handling', specRef: '3.2.8' },
      { id: '3.2.9', unitId: '3.2', title: 'Random number generation', specRef: '3.2.9' },
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
  {
    id: 'c-3.1.2-efficiency',
    unitId: '3.1',
    topicId: '3.1.2',
    title: 'Algorithm efficiency',
    coreIdea: 'Different algorithms can solve the same problem with different time efficiency. Comparing algorithms involves counting comparisons or steps; for large inputs, the most efficient algorithm matters most.',
    commonMisconception: 'Assuming the simplest algorithm is always best – for large data, efficiency matters.',
    changeScenarios: [
      { prompt: 'Why compare algorithms for the same problem?', explanation: 'To choose the best one for the data size; a slower algorithm may be fine for small inputs but unacceptable for large ones.' },
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
  {
    id: 'c-3.2.3-arithmetic',
    unitId: '3.2',
    topicId: '3.2.3',
    title: 'Arithmetic: DIV and MOD',
    coreIdea: 'Integer division (DIV) gives the whole number result; remainder (MOD) gives what is left. E.g. 7 DIV 2 = 3, 7 MOD 2 = 1. Real division (/) can produce decimals.',
    commonMisconception: 'DIV and / are the same – DIV truncates to integer; / gives real result.',
    changeScenarios: [
      { prompt: 'How would you check if a number is even?', explanation: 'Use MOD 2: if n MOD 2 = 0 then n is even.' },
    ],
  },
  {
    id: 'c-3.2.6-structures',
    unitId: '3.2',
    topicId: '3.2.6',
    title: 'Arrays and records',
    coreIdea: 'Arrays hold multiple values of the same type, accessed by index (0-based). 2D arrays have rows and columns. Records group related fields of possibly different types.',
    commonMisconception: 'Array indices start at 1 – in most languages they start at 0.',
    changeScenarios: [
      { prompt: 'When would you use a 2D array?', explanation: 'For grids: game board, spreadsheet, image pixels.' },
    ],
  },
  {
    id: 'c-3.2.11-robust',
    unitId: '3.2',
    topicId: '3.2.11',
    title: 'Validation and test data',
    coreIdea: 'Data validation checks input is acceptable before use. Test data types: normal (typical), boundary (at limits), erroneous (invalid). Syntax errors are caught by compiler; logic errors produce wrong output.',
    commonMisconception: 'Logic errors are caught by the compiler – they are not; only syntax errors are.',
    changeScenarios: [
      { prompt: 'Why use boundary test data?', explanation: 'Bugs often occur at limits (e.g. empty list, max value).' },
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
  {
    id: 'c-3.3.3-units',
    unitId: '3.3',
    topicId: '3.3.3',
    title: 'Units of information',
    coreIdea: 'Bit = 0 or 1. Byte = 8 bits. AQA 8525 uses decimal prefixes: 1 KB = 1000 bytes, 1 MB = 1000 KB, 1 GB = 1000 MB. Used for file sizes and storage.',
    commonMisconception: '1 KB = 1024 bytes – AQA spec uses decimal prefixes (1000).',
    changeScenarios: [
      { prompt: 'How many bytes in 1 MB?', explanation: '1 MB = 1000 KB = 1,000,000 bytes (AQA decimal).' },
    ],
  },
  {
    id: 'c-3.3.7-sound',
    unitId: '3.3',
    topicId: '3.3.7',
    title: 'Representing sound',
    coreIdea: 'Analogue sound is sampled at a rate (sampling rate) and each sample has a resolution (bits). File size = sampling rate × resolution × duration in seconds (in bits).',
    commonMisconception: 'Higher sampling rate always means better quality – it increases file size; must match human hearing range.',
    changeScenarios: [
      { prompt: 'What happens to file size if you double the sampling rate?', explanation: 'File size doubles (twice as many samples per second).' },
    ],
  },
  {
    id: 'c-3.3.8-compression',
    unitId: '3.3',
    topicId: '3.3.8',
    title: 'Huffman and RLE compression',
    coreIdea: 'Huffman coding assigns shorter bit patterns to more frequent characters. RLE stores runs as (frequency, value) pairs. Both reduce file size without losing data (lossless).',
    commonMisconception: 'Compression always loses quality – lossless compression (Huffman, RLE) does not.',
    changeScenarios: [
      { prompt: 'When is RLE most effective?', explanation: 'When there are long runs of the same value (e.g. simple images, repeated text).' },
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
  {
    id: 'c-3.4.1-hwsw',
    unitId: '3.4',
    topicId: '3.4.1',
    title: 'Hardware and software',
    coreIdea: 'Hardware is the physical components (CPU, RAM, disk). Software is programs and data. Software runs on hardware; both are needed for a computer to function.',
    commonMisconception: 'RAM and ROM are the same – RAM is volatile and read-write; ROM is non-volatile and read-only.',
    changeScenarios: [
      { prompt: 'What happens to RAM when the computer is switched off?', explanation: 'RAM is volatile – all data is lost.' },
    ],
  },
  {
    id: 'c-3.4.4-translators',
    unitId: '3.4',
    topicId: '3.4.4',
    title: 'Compilers, interpreters and assemblers',
    coreIdea: 'Compiler translates entire program to machine code; produces executable. Interpreter translates and executes line by line. Assembler translates assembly to machine code. Low-level is close to hardware; high-level is human-readable.',
    commonMisconception: 'Interpreters are always slower – they are for development; compilers produce faster executables.',
    changeScenarios: [
      { prompt: 'When would you use an interpreter?', explanation: 'During development for quick feedback; for scripting languages.' },
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
  {
    id: 'c-3.5.2-protocols',
    unitId: '3.5',
    topicId: '3.5.2',
    title: 'TCP/IP and application protocols',
    coreIdea: 'Protocols are rules for communication. HTTP/HTTPS for web; SMTP for email sending; IMAP for email retrieval. TCP/IP is the suite for internet communication. HTTPS adds encryption.',
    commonMisconception: 'HTTP and HTTPS are different protocols – both HTTP; HTTPS adds TLS encryption.',
    changeScenarios: [
      { prompt: 'Why use HTTPS instead of HTTP?', explanation: 'HTTPS encrypts data in transit; protects passwords and sensitive data.' },
    ],
  },
  {
    id: 'c-3.5.4-tcpip',
    unitId: '3.5',
    topicId: '3.5.4',
    title: 'TCP/IP model layers',
    coreIdea: 'Application (HTTP, SMTP), Transport (TCP), Internet (IP), Link (Ethernet, WiFi). Each layer has a role; protocols operate at specific layers.',
    commonMisconception: 'All protocols are at the same layer – HTTP is application; IP is internet layer.',
    changeScenarios: [
      { prompt: 'At which layer does HTTP operate?', explanation: 'Application layer.' },
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
  {
    id: 'c-3.6.1-fundamentals',
    unitId: '3.6',
    topicId: '3.6.1',
    title: 'Cyber security fundamentals',
    coreIdea: 'Cyber security protects systems and data from unauthorised access, damage or theft. Main purposes: confidentiality, integrity, availability. Penetration testing simulates attacks to find weaknesses.',
    commonMisconception: 'Hacking is always illegal – ethical hacking (penetration testing) is authorised.',
    changeScenarios: [
      { prompt: 'What is penetration testing?', explanation: 'Authorised simulation of an attack to identify vulnerabilities before real attackers do.' },
    ],
  },
  {
    id: 'c-3.6.3-detection',
    unitId: '3.6',
    topicId: '3.6.3',
    title: 'Detection and prevention',
    coreIdea: 'Prevention: biometrics, strong passwords, CAPTCHA, email confirmations, automatic updates. Detection: monitoring for unusual activity. Defence in depth uses multiple layers.',
    commonMisconception: 'A firewall alone is enough – defence in depth uses multiple methods.',
    changeScenarios: [
      { prompt: 'Why use biometrics?', explanation: 'Harder to steal than passwords; unique to the person.' },
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
  {
    id: 'c-3.7.2-sql',
    unitId: '3.7',
    topicId: '3.7.2',
    title: 'SQL: SELECT, INSERT, UPDATE, DELETE',
    coreIdea: 'SELECT retrieves data (with WHERE, ORDER BY). INSERT adds records. UPDATE modifies existing records. DELETE removes records. Queries can join tables using keys.',
    commonMisconception: 'Primary key and foreign key are interchangeable – they have different roles.',
    changeScenarios: [
      { prompt: 'When would you use UPDATE instead of INSERT?', explanation: 'UPDATE modifies existing records; INSERT adds new ones.' },
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
  { id: 't-pseudocode', unitId: '3.1', topicId: '3.1.1', term: 'Pseudo-code', definition: 'A language-independent way of describing an algorithm using structured English.' },
  { id: 't-flowchart', unitId: '3.1', topicId: '3.1.1', term: 'Flowchart', definition: 'A diagram that represents an algorithm using shapes and arrows.' },
  { id: 't-trace-table', unitId: '3.1', topicId: '3.1.1', term: 'Trace table', definition: 'A table used to track variable values as an algorithm executes step by step.' },
  { id: 't-linear-search', unitId: '3.1', topicId: '3.1.3', term: 'Linear search', definition: 'A search that checks each item in sequence until the target is found or the list ends.' },
  { id: 't-binary-search', unitId: '3.1', topicId: '3.1.3', term: 'Binary search', definition: 'A search that repeatedly halves the search space; requires a sorted list.' },
  { id: 't-bubble-sort', unitId: '3.1', topicId: '3.1.4', term: 'Bubble sort', definition: 'A sorting algorithm that repeatedly compares and swaps adjacent elements.' },
  { id: 't-merge-sort', unitId: '3.1', topicId: '3.1.4', term: 'Merge sort', definition: 'A sorting algorithm that divides the list, sorts each half recursively, then merges.' },
  { id: 't-time-efficiency', unitId: '3.1', topicId: '3.1.2', term: 'Time efficiency', definition: 'How quickly an algorithm completes; measured by number of comparisons or steps.' },
  { id: 't-variable', unitId: '3.2', topicId: '3.2.2', term: 'Variable', definition: 'A named storage location whose value can change during program execution.' },
  { id: 't-constant', unitId: '3.2', topicId: '3.2.2', term: 'Constant', definition: 'A named value that does not change during program execution.' },
  { id: 't-iteration', unitId: '3.2', topicId: '3.2.2', term: 'Iteration', definition: 'Repeating a set of instructions; loops (FOR, WHILE, REPEAT).' },
  { id: 't-selection', unitId: '3.2', topicId: '3.2.2', term: 'Selection', definition: 'Choosing between paths based on a condition; IF/ELSE.' },
  { id: 't-for-loop', unitId: '3.2', topicId: '3.2.2', term: 'FOR loop', definition: 'Definite iteration; runs a fixed number of times.' },
  { id: 't-while-loop', unitId: '3.2', topicId: '3.2.2', term: 'WHILE loop', definition: 'Indefinite iteration; runs while condition is true; checks before each iteration.' },
  { id: 't-repeat-loop', unitId: '3.2', topicId: '3.2.2', term: 'REPEAT loop', definition: 'Indefinite iteration; runs until condition is true; checks after each iteration (runs at least once).' },
  { id: 't-div', unitId: '3.2', topicId: '3.2.3', term: 'DIV', definition: 'Integer division; gives whole number result (e.g. 7 DIV 2 = 3).' },
  { id: 't-mod', unitId: '3.2', topicId: '3.2.3', term: 'MOD', definition: 'Modulo; gives remainder after division (e.g. 7 MOD 2 = 1).' },
  { id: 't-subroutine', unitId: '3.2', topicId: '3.2.10', term: 'Subroutine', definition: 'A named block of code that can be called from elsewhere in the program; procedure or function.' },
  { id: 't-procedure', unitId: '3.2', topicId: '3.2.10', term: 'Procedure', definition: 'A subroutine that performs a task but does not return a value.' },
  { id: 't-function', unitId: '3.2', topicId: '3.2.10', term: 'Function', definition: 'A subroutine that returns a value.' },
  { id: 't-parameter', unitId: '3.2', topicId: '3.2.10', term: 'Parameter', definition: 'A value passed into a subroutine when it is called.' },
  { id: 't-array', unitId: '3.2', topicId: '3.2.6', term: 'Array', definition: 'A data structure that holds multiple values of the same type, accessed by index.' },
  { id: 't-record', unitId: '3.2', topicId: '3.2.6', term: 'Record', definition: 'A data structure that groups related fields of possibly different types.' },
  { id: 't-validation', unitId: '3.2', topicId: '3.2.11', term: 'Validation', definition: 'Checking that input data is acceptable before use.' },
  { id: 't-syntax-error', unitId: '3.2', topicId: '3.2.11', term: 'Syntax error', definition: 'Error in code structure; caught by compiler or interpreter.' },
  { id: 't-logic-error', unitId: '3.2', topicId: '3.2.11', term: 'Logic error', definition: 'Program runs but produces wrong output; not caught by compiler.' },
  { id: 't-normal-data', unitId: '3.2', topicId: '3.2.11', term: 'Normal test data', definition: 'Typical valid input used when testing.' },
  { id: 't-boundary-data', unitId: '3.2', topicId: '3.2.11', term: 'Boundary test data', definition: 'Data at the limits (e.g. empty, min, max) used when testing.' },
  { id: 't-erroneous-data', unitId: '3.2', topicId: '3.2.11', term: 'Erroneous test data', definition: 'Invalid input used to test validation.' },
  { id: 't-bit', unitId: '3.3', topicId: '3.3.3', term: 'Bit', definition: 'The fundamental unit of information; either 0 or 1.' },
  { id: 't-byte', unitId: '3.3', topicId: '3.3.3', term: 'Byte', definition: 'A group of 8 bits.' },
  { id: 't-pixel', unitId: '3.3', topicId: '3.3.6', term: 'Pixel', definition: 'Picture element; a single point in a digital image.' },
  { id: 't-colour-depth', unitId: '3.3', topicId: '3.3.6', term: 'Colour depth', definition: 'The number of bits used to represent each pixel in an image.' },
  { id: 't-bitmap', unitId: '3.3', topicId: '3.3.6', term: 'Bitmap', definition: 'An image stored as a grid of pixels with colour values.' },
  { id: 't-sampling-rate', unitId: '3.3', topicId: '3.3.7', term: 'Sampling rate', definition: 'Number of samples per second when converting analogue sound to digital.' },
  { id: 't-sample-resolution', unitId: '3.3', topicId: '3.3.7', term: 'Sample resolution', definition: 'Number of bits used to store each sound sample.' },
  { id: 't-huffman', unitId: '3.3', topicId: '3.3.8', term: 'Huffman coding', definition: 'Lossless compression that assigns shorter codes to more frequent characters.' },
  { id: 't-rle', unitId: '3.3', topicId: '3.3.8', term: 'RLE', definition: 'Run-length encoding; stores runs as (frequency, value) pairs.' },
  { id: 't-ascii', unitId: '3.3', topicId: '3.3.5', term: 'ASCII', definition: 'A character encoding using 7 bits; represents 128 characters.' },
  { id: 't-unicode', unitId: '3.3', topicId: '3.3.5', term: 'Unicode', definition: 'A character encoding that supports many alphabets and symbols; extends ASCII.' },
  { id: 't-binary', unitId: '3.3', topicId: '3.3.1', term: 'Binary', definition: 'Base 2 number system; uses only 0 and 1.' },
  { id: 't-hexadecimal', unitId: '3.3', topicId: '3.3.1', term: 'Hexadecimal', definition: 'Base 16 number system; uses 0–9 and A–F.' },
  { id: 't-hardware', unitId: '3.4', topicId: '3.4.1', term: 'Hardware', definition: 'The physical components of a computer system.' },
  { id: 't-software', unitId: '3.4', topicId: '3.4.1', term: 'Software', definition: 'Programs and data that run on hardware.' },
  { id: 't-cpu', unitId: '3.4', topicId: '3.4.5', term: 'CPU', definition: 'Central Processing Unit; executes instructions and controls the computer.' },
  { id: 't-alu', unitId: '3.4', topicId: '3.4.5', term: 'ALU', definition: 'Arithmetic Logic Unit; performs calculations and logic operations.' },
  { id: 't-control-unit', unitId: '3.4', topicId: '3.4.5', term: 'Control unit', definition: 'Coordinates the CPU; fetches, decodes and executes instructions.' },
  { id: 't-register', unitId: '3.4', topicId: '3.4.5', term: 'Register', definition: 'Small, fast storage inside the CPU for current instructions and data.' },
  { id: 't-fetch-execute', unitId: '3.4', topicId: '3.4.5', term: 'Fetch-Execute cycle', definition: 'The repeated process: fetch instruction from memory, decode it, execute it.' },
  { id: 't-ram', unitId: '3.4', topicId: '3.4.5', term: 'RAM', definition: 'Random Access Memory; volatile memory used for programs and data in use.' },
  { id: 't-rom', unitId: '3.4', topicId: '3.4.5', term: 'ROM', definition: 'Read Only Memory; non-volatile memory containing boot instructions.' },
  { id: 't-cache', unitId: '3.4', topicId: '3.4.5', term: 'Cache', definition: 'Very fast memory between CPU and RAM; holds frequently used data.' },
  { id: 't-volatile', unitId: '3.4', topicId: '3.4.5', term: 'Volatile', definition: 'Memory that loses its contents when power is off (e.g. RAM).' },
  { id: 't-compiler', unitId: '3.4', topicId: '3.4.4', term: 'Compiler', definition: 'Translates entire high-level program to machine code before execution.' },
  { id: 't-interpreter', unitId: '3.4', topicId: '3.4.4', term: 'Interpreter', definition: 'Translates and executes high-level code line by line.' },
  { id: 't-assembler', unitId: '3.4', topicId: '3.4.4', term: 'Assembler', definition: 'Translates assembly language to machine code.' },
  { id: 't-and-gate', unitId: '3.4', topicId: '3.4.2', term: 'AND gate', definition: 'Outputs 1 only when both inputs are 1.' },
  { id: 't-or-gate', unitId: '3.4', topicId: '3.4.2', term: 'OR gate', definition: 'Outputs 1 when at least one input is 1.' },
  { id: 't-not-gate', unitId: '3.4', topicId: '3.4.2', term: 'NOT gate', definition: 'Outputs the inverse of the input.' },
  { id: 't-xor-gate', unitId: '3.4', topicId: '3.4.2', term: 'XOR gate', definition: 'Outputs 1 when inputs are different.' },
  { id: 't-truth-table', unitId: '3.4', topicId: '3.4.2', term: 'Truth table', definition: 'A table showing output for every combination of inputs.' },
  { id: 't-lan', unitId: '3.5', topicId: '3.5.1', term: 'LAN', definition: 'Local Area Network; covers a small area (e.g. school, office).' },
  { id: 't-wan', unitId: '3.5', topicId: '3.5.1', term: 'WAN', definition: 'Wide Area Network; covers a large geographical area (e.g. internet).' },
  { id: 't-pan', unitId: '3.5', topicId: '3.5.1', term: 'PAN', definition: 'Personal Area Network; for personal devices (e.g. Bluetooth).' },
  { id: 't-protocol', unitId: '3.5', topicId: '3.5.2', term: 'Protocol', definition: 'A set of rules governing how data is transmitted over a network.' },
  { id: 't-http', unitId: '3.5', topicId: '3.5.2', term: 'HTTP', definition: 'HyperText Transfer Protocol; used for web pages.' },
  { id: 't-https', unitId: '3.5', topicId: '3.5.2', term: 'HTTPS', definition: 'HTTP with encryption (TLS); secures web traffic.' },
  { id: 't-tcp-ip', unitId: '3.5', topicId: '3.5.4', term: 'TCP/IP', definition: 'Suite of protocols for internet communication; Transport and Internet layers.' },
  { id: 't-firewall', unitId: '3.5', topicId: '3.5.3', term: 'Firewall', definition: 'A security device that monitors and filters network traffic based on rules.' },
  { id: 't-encryption', unitId: '3.5', topicId: '3.5.3', term: 'Encryption', definition: 'Scrambling data so only authorised parties can read it.' },
  { id: 't-cyber-security', unitId: '3.6', topicId: '3.6.1', term: 'Cyber security', definition: 'Protecting systems and data from unauthorised access, damage or theft.' },
  { id: 't-social-engineering', unitId: '3.6', topicId: '3.6.2', term: 'Social engineering', definition: 'Manipulating people to give up information or access (e.g. phishing, blagging).' },
  { id: 't-malware', unitId: '3.6', topicId: '3.6.2', term: 'Malware', definition: 'Malicious software; includes viruses, trojans and spyware.' },
  { id: 't-phishing', unitId: '3.6', topicId: '3.6.2', term: 'Phishing', definition: 'A social engineering technique using fake emails or messages to steal private information.' },
  { id: 't-pharming', unitId: '3.6', topicId: '3.6.2', term: 'Pharming', definition: 'Redirecting users from legitimate sites to fake ones (e.g. DNS poisoning).' },
  { id: 't-penetration-testing', unitId: '3.6', topicId: '3.6.2', term: 'Penetration testing', definition: 'Authorised simulation of an attack to find vulnerabilities.' },
  { id: 't-biometrics', unitId: '3.6', topicId: '3.6.3', term: 'Biometrics', definition: 'Authentication using physical characteristics (fingerprint, face).' },
  { id: 't-captcha', unitId: '3.6', topicId: '3.6.3', term: 'CAPTCHA', definition: 'Test to distinguish humans from bots; helps prevent automated attacks.' },
  { id: 't-primary-key', unitId: '3.7', topicId: '3.7.1', term: 'Primary key', definition: 'A field that uniquely identifies each record in a table.' },
  { id: 't-foreign-key', unitId: '3.7', topicId: '3.7.1', term: 'Foreign key', definition: 'A field that links to the primary key of another table.' },
  { id: 't-record-db', unitId: '3.7', topicId: '3.7.1', term: 'Record (database)', definition: 'A row in a database table; one complete set of related data.' },
  { id: 't-field', unitId: '3.7', topicId: '3.7.1', term: 'Field', definition: 'A column in a database table; one piece of data per record.' },
  { id: 't-data-redundancy', unitId: '3.7', topicId: '3.7.1', term: 'Data redundancy', definition: 'Storing the same data in multiple places; can cause inconsistency.' },
  { id: 't-select', unitId: '3.7', topicId: '3.7.2', term: 'SELECT', definition: 'SQL command to retrieve data from a table.' },
  { id: 't-insert', unitId: '3.7', topicId: '3.7.2', term: 'INSERT', definition: 'SQL command to add new records to a table.' },
  { id: 't-update', unitId: '3.7', topicId: '3.7.2', term: 'UPDATE', definition: 'SQL command to modify existing records.' },
  { id: 't-delete', unitId: '3.7', topicId: '3.7.2', term: 'DELETE', definition: 'SQL command to remove records from a table.' },
  { id: 't-data-privacy', unitId: '3.8', topicId: '3.8.1', term: 'Data privacy', definition: 'Protecting personal information from unauthorised access or misuse.' },
  { id: 't-e-waste', unitId: '3.8', topicId: '3.8.1', term: 'E-waste', definition: 'Electronic waste; discarded devices; environmental concern.' },
];

// ============================================================================
// QUICK CHECKS
// ============================================================================

export const COMPUTE_QUICK_CHECKS: ComputeQuickCheck[] = [
  // 3.1
  { id: 'qc-3.1.1-a', unitId: '3.1', topicId: '3.1.1', type: 'multipleChoice', question: 'What is an algorithm?', options: ['A computer program', 'A sequence of steps to complete a task', 'A type of data', 'A programming language'], correctAnswer: 'A sequence of steps to complete a task', feedback: { correct: 'Correct. An algorithm is the logical plan; a program implements it.', incorrect: 'An algorithm is a sequence of steps to complete a task, not a program itself.' } },
  { id: 'qc-3.1.1-b', unitId: '3.1', topicId: '3.1.1', type: 'multipleChoice', question: 'What is decomposition?', options: ['Removing detail from a problem', 'Breaking a problem into sub-problems', 'Writing pseudo-code', 'Testing a program'], correctAnswer: 'Breaking a problem into sub-problems', feedback: { correct: 'Correct. Decomposition splits complex problems into manageable parts.', incorrect: 'Decomposition means breaking a problem into a number of sub-problems.' } },
  { id: 'qc-3.1.1-c', unitId: '3.1', topicId: '3.1.1', type: 'multipleChoice', question: 'What is abstraction?', options: ['Adding detail', 'Removing unnecessary detail', 'Writing code', 'Testing'], correctAnswer: 'Removing unnecessary detail', feedback: { correct: 'Correct. Abstraction focuses on what matters.', incorrect: 'Abstraction is removing unnecessary detail from a problem.' } },
  { id: 'qc-3.1.3-a', unitId: '3.1', topicId: '3.1.3', type: 'multipleChoice', question: 'Binary search requires the list to be:', options: ['Unsorted', 'Sorted', 'Empty', 'Alphabetical'], correctAnswer: 'Sorted', feedback: { correct: 'Correct. Binary search repeatedly halves the search space, which only works when sorted.', incorrect: 'Binary search requires a sorted list to work correctly.' } },
  { id: 'qc-3.1.3-b', unitId: '3.1', topicId: '3.1.3', type: 'multipleChoice', question: 'Linear search works on:', options: ['Sorted lists only', 'Any list', 'Empty lists only', 'Numbers only'], correctAnswer: 'Any list', feedback: { correct: 'Correct. Linear search checks each item in order; works on sorted or unsorted.', incorrect: 'Linear search works on any list; it does not require sorting.' } },
  { id: 'qc-3.1.4-a', unitId: '3.1', topicId: '3.1.4', type: 'multipleChoice', question: 'Which sort is generally more efficient for large lists?', options: ['Bubble sort', 'Merge sort', 'Both are equal', 'Linear sort'], correctAnswer: 'Merge sort', feedback: { correct: 'Correct. Merge sort has O(n log n) vs bubble sort O(n²).', incorrect: 'Merge sort is more efficient for large lists due to its divide-and-conquer approach.' } },
  { id: 'qc-3.1.4-b', unitId: '3.1', topicId: '3.1.4', type: 'multipleChoice', question: 'Bubble sort compares:', options: ['First and last', 'Adjacent pairs', 'All pairs', 'Random pairs'], correctAnswer: 'Adjacent pairs', feedback: { correct: 'Correct. Bubble sort compares and swaps adjacent elements.', incorrect: 'Bubble sort compares adjacent pairs and swaps if wrong order.' } },
  // 3.2
  { id: 'qc-3.2.1-a', unitId: '3.2', topicId: '3.2.1', type: 'multipleChoice', question: 'Which data type holds true or false?', options: ['Integer', 'String', 'Boolean', 'Character'], correctAnswer: 'Boolean', feedback: { correct: 'Correct. Boolean stores true/false values.', incorrect: 'Boolean is the data type for true/false values.' } },
  { id: 'qc-3.2.2-a', unitId: '3.2', topicId: '3.2.2', type: 'multipleChoice', question: 'A FOR loop is an example of:', options: ['Indefinite iteration', 'Definite iteration', 'Selection', 'Sequence'], correctAnswer: 'Definite iteration', feedback: { correct: 'Correct. FOR runs a fixed number of times (count-controlled).', incorrect: 'FOR is definite (count-controlled) iteration; WHILE/REPEAT are indefinite.' } },
  { id: 'qc-3.2.3-a', unitId: '3.2', topicId: '3.2.3', type: 'multipleChoice', question: 'What does 7 MOD 2 equal?', options: ['3', '1', '2', '0'], correctAnswer: '1', feedback: { correct: 'Correct. MOD gives the remainder; 7 ÷ 2 = 3 remainder 1.', incorrect: 'MOD gives the remainder; 7 MOD 2 = 1.' } },
  { id: 'qc-3.2.6-a', unitId: '3.2', topicId: '3.2.6', type: 'multipleChoice', question: 'Array indices typically start at:', options: ['1', '0', '-1', '2'], correctAnswer: '0', feedback: { correct: 'Correct. Most languages use 0-based indexing.', incorrect: 'Array indices usually start at 0.' } },
  { id: 'qc-3.2.10-a', unitId: '3.2', topicId: '3.2.10', type: 'multipleChoice', question: 'A function differs from a procedure because it:', options: ['Takes parameters', 'Returns a value', 'Is longer', 'Uses loops'], correctAnswer: 'Returns a value', feedback: { correct: 'Correct. A function returns a value; a procedure does not.', incorrect: 'A function returns a value; a procedure performs a task without returning.' } },
  { id: 'qc-3.2.11-a', unitId: '3.2', topicId: '3.2.11', type: 'multipleChoice', question: 'Which error is caught by the compiler?', options: ['Logic error', 'Syntax error', 'Runtime error', 'All of them'], correctAnswer: 'Syntax error', feedback: { correct: 'Correct. Compilers catch syntax errors; logic errors produce wrong output.', incorrect: 'Only syntax errors are caught by the compiler.' } },
  // 3.3
  { id: 'qc-3.3.1-a', unitId: '3.3', topicId: '3.3.1', type: 'shortAnswer', question: 'What base is hexadecimal?', correctAnswer: '16', feedback: { correct: 'Correct. Hexadecimal is base 16.', incorrect: 'Hexadecimal is base 16.' } },
  { id: 'qc-3.3.2-a', unitId: '3.3', topicId: '3.3.2', type: 'shortAnswer', question: 'Convert binary 1111 to decimal.', correctAnswer: '15', feedback: { correct: 'Correct. 8+4+2+1 = 15.', incorrect: '1111 in binary = 15 in decimal.' } },
  { id: 'qc-3.3.3-a', unitId: '3.3', topicId: '3.3.3', type: 'multipleChoice', question: 'How many bits are in a byte?', options: ['4', '8', '16', '32'], correctAnswer: '8', feedback: { correct: 'Correct. A byte is 8 bits.', incorrect: 'A byte is a group of 8 bits.' } },
  { id: 'qc-3.3.6-a', unitId: '3.3', topicId: '3.3.6', type: 'multipleChoice', question: 'What does colour depth determine?', options: ['The number of pixels', 'The number of bits per pixel', 'The image size in bytes', 'The resolution'], correctAnswer: 'The number of bits per pixel', feedback: { correct: 'Correct. Colour depth is bits per pixel.', incorrect: 'Colour depth is the number of bits used to represent each pixel.' } },
  { id: 'qc-3.3.7-a', unitId: '3.3', topicId: '3.3.7', type: 'multipleChoice', question: 'Higher sampling rate means:', options: ['Smaller file', 'More samples per second', 'Lower quality', 'Fewer bits'], correctAnswer: 'More samples per second', feedback: { correct: 'Correct. Sampling rate = samples per second.', incorrect: 'Sampling rate is the number of samples taken per second.' } },
  { id: 'qc-3.3.8-a', unitId: '3.3', topicId: '3.3.8', type: 'multipleChoice', question: 'Huffman coding is:', options: ['Lossy compression', 'Lossless compression', 'Not compression', 'For images only'], correctAnswer: 'Lossless compression', feedback: { correct: 'Correct. Huffman is lossless; no data is lost.', incorrect: 'Huffman coding is lossless compression.' } },
  // 3.4
  { id: 'qc-3.4.2-a', unitId: '3.4', topicId: '3.4.2', type: 'multipleChoice', question: 'When does an AND gate output 1?', options: ['When either input is 1', 'When both inputs are 1', 'When both inputs are 0', 'When inputs differ'], correctAnswer: 'When both inputs are 1', feedback: { correct: 'Correct. AND outputs 1 only when both inputs are 1.', incorrect: 'AND outputs 1 only when both inputs are 1.' } },
  { id: 'qc-3.4.2-b', unitId: '3.4', topicId: '3.4.2', type: 'multipleChoice', question: 'When does XOR output 1?', options: ['When both inputs are 1', 'When inputs are the same', 'When inputs differ', 'Never'], correctAnswer: 'When inputs differ', feedback: { correct: 'Correct. XOR outputs 1 when one input is 0 and one is 1.', incorrect: 'XOR outputs 1 when the two inputs are different.' } },
  { id: 'qc-3.4.5-a', unitId: '3.4', topicId: '3.4.5', type: 'multipleChoice', question: 'Which component performs arithmetic and logic operations?', options: ['Control unit', 'ALU', 'Cache', 'RAM'], correctAnswer: 'ALU', feedback: { correct: 'Correct. The ALU (Arithmetic Logic Unit) performs calculations.', incorrect: 'The ALU (Arithmetic Logic Unit) performs arithmetic and logic operations.' } },
  { id: 'qc-3.4.5-b', unitId: '3.4', topicId: '3.4.5', type: 'multipleChoice', question: 'RAM is:', options: ['Non-volatile', 'Volatile', 'Read-only', 'In the CPU'], correctAnswer: 'Volatile', feedback: { correct: 'Correct. RAM loses its contents when power is off.', incorrect: 'RAM is volatile; it loses data when power is off.' } },
  { id: 'qc-3.4.4-a', unitId: '3.4', topicId: '3.4.4', type: 'multipleChoice', question: 'An interpreter:', options: ['Produces an executable', 'Translates line by line', 'Only works with assembly', 'Is faster than a compiler'], correctAnswer: 'Translates line by line', feedback: { correct: 'Correct. Interpreter translates and executes one line at a time.', incorrect: 'An interpreter translates and executes code line by line.' } },
  // 3.5
  { id: 'qc-3.5.1-a', unitId: '3.5', topicId: '3.5.1', type: 'multipleChoice', question: 'The internet is an example of a:', options: ['LAN', 'WAN', 'PAN', 'VPN'], correctAnswer: 'WAN', feedback: { correct: 'Correct. The internet is the largest WAN.', incorrect: 'The internet is a Wide Area Network (WAN).' } },
  { id: 'qc-3.5.2-a', unitId: '3.5', topicId: '3.5.2', type: 'multipleChoice', question: 'HTTPS adds what to HTTP?', options: ['Speed', 'Encryption', 'Compression', 'Caching'], correctAnswer: 'Encryption', feedback: { correct: 'Correct. HTTPS uses TLS to encrypt data in transit.', incorrect: 'HTTPS adds encryption (TLS) to protect data.' } },
  { id: 'qc-3.5.4-a', unitId: '3.5', topicId: '3.5.4', type: 'multipleChoice', question: 'HTTP operates at which TCP/IP layer?', options: ['Transport', 'Internet', 'Application', 'Link'], correctAnswer: 'Application', feedback: { correct: 'Correct. HTTP is an application layer protocol.', incorrect: 'HTTP operates at the Application layer.' } },
  // 3.6
  { id: 'qc-3.6.2-a', unitId: '3.6', topicId: '3.6.2', type: 'multipleChoice', question: 'Phishing is a type of:', options: ['Malware', 'Social engineering', 'Encryption', 'Firewall'], correctAnswer: 'Social engineering', feedback: { correct: 'Correct. Phishing manipulates people to give up information.', incorrect: 'Phishing is a social engineering technique using fake emails or messages.' } },
  { id: 'qc-3.6.2-b', unitId: '3.6', topicId: '3.6.2', type: 'multipleChoice', question: 'Pharming involves:', options: ['Fake emails', 'DNS poisoning/redirecting', 'Viruses', 'Passwords'], correctAnswer: 'DNS poisoning/redirecting', feedback: { correct: 'Correct. Pharming redirects users to fake sites.', incorrect: 'Pharming redirects legitimate traffic to fake sites (e.g. via DNS).' } },
  { id: 'qc-3.6.3-a', unitId: '3.6', topicId: '3.6.3', type: 'multipleChoice', question: 'Biometrics is used for:', options: ['Compression', 'Authentication', 'Networking', 'Programming'], correctAnswer: 'Authentication', feedback: { correct: 'Correct. Biometrics verifies identity using physical traits.', incorrect: 'Biometrics is used for authentication (e.g. fingerprint, face).' } },
  // 3.7
  { id: 'qc-3.7.1-a', unitId: '3.7', topicId: '3.7.1', type: 'multipleChoice', question: 'What uniquely identifies each record in a table?', options: ['Foreign key', 'Primary key', 'Index', 'Field'], correctAnswer: 'Primary key', feedback: { correct: 'Correct. The primary key uniquely identifies each record.', incorrect: 'The primary key uniquely identifies each record in a table.' } },
  { id: 'qc-3.7.2-a', unitId: '3.7', topicId: '3.7.2', type: 'multipleChoice', question: 'Which SQL command retrieves data?', options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'], correctAnswer: 'SELECT', feedback: { correct: 'Correct. SELECT retrieves data from tables.', incorrect: 'SELECT is used to retrieve data from a database.' } },
  // 3.8
  { id: 'qc-3.8.1-a', unitId: '3.8', topicId: '3.8.1', type: 'multipleChoice', question: 'E-waste refers to:', options: ['Email waste', 'Electronic waste', 'Energy waste', 'Encryption waste'], correctAnswer: 'Electronic waste', feedback: { correct: 'Correct. E-waste is discarded electronic devices.', incorrect: 'E-waste is electronic waste; discarded devices.' } },
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
  {
    id: 'tt-linear-2',
    unitId: '3.1',
    topicId: '3.1.3',
    title: 'Trace linear search (not found)',
    pseudoCode: `FOUND ← FALSE
FOR i ← 0 TO LEN(arr) - 1
  IF arr[i] = target THEN
    FOUND ← TRUE
  ENDIF
ENDFOR
OUTPUT FOUND`,
    inputValues: { arr: '[5, 3, 8, 2, 9]', target: '7' },
    expectedOutput: 'FALSE',
    traceColumns: ['i', 'arr[i]', 'FOUND'],
  },
  {
    id: 'tt-sum-1',
    unitId: '3.1',
    topicId: '3.1.1',
    title: 'Trace sum of array',
    pseudoCode: `total ← 0
FOR i ← 0 TO LEN(arr) - 1
  total ← total + arr[i]
ENDFOR
OUTPUT total`,
    inputValues: { arr: '[4, 2, 7, 1]' },
    expectedOutput: '14',
    traceColumns: ['i', 'arr[i]', 'total'],
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
  { id: 'calc-bitmap-2', unitId: '3.3', topicId: '3.3.6', type: 'bitmapFileSize', scenario: 'Image 640×480, 16-bit colour. File size in bytes?', inputs: { width: 640, height: 480, depth: 16 }, expected: 614400, formulaHint: '(640×480×16)/8' },
  { id: 'calc-bin-dec-2', unitId: '3.3', topicId: '3.3.2', type: 'binaryToDecimal', scenario: 'Convert binary 11111111 to decimal.', inputs: {}, expected: 255, formulaHint: 'All 8 bits = 255' },
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
  {
    id: 'logic-not-1',
    unitId: '3.4',
    topicId: '3.4.2',
    title: 'NOT gate truth table',
    inputs: ['A'],
    truthTable: { '0': 1, '1': 0 },
    expression: 'Ā',
  },
  {
    id: 'logic-and-or-1',
    unitId: '3.4',
    topicId: '3.4.2',
    title: 'Combined AND and OR',
    inputs: ['A', 'B', 'C'],
    truthTable: { '000': 0, '001': 1, '010': 0, '011': 1, '100': 0, '101': 1, '110': 1, '111': 1 },
    expression: '(A.B)+C',
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
  {
    id: 'sql-4',
    unitId: '3.7',
    topicId: '3.7.2',
    title: 'INSERT new record',
    schema: 'Students(id, name, age, year)',
    question: 'Write SQL to insert a new student: id=5, name=Ali, age=15, year=10.',
    expectedQuery: 'INSERT INTO Students VALUES (5, \'Ali\', 15, 10)',
  },
  {
    id: 'sql-5',
    unitId: '3.7',
    topicId: '3.7.2',
    title: 'UPDATE record',
    schema: 'Products(id, name, price)',
    question: 'Write SQL to set the price of product with id=3 to 25.',
    expectedQuery: 'UPDATE Products SET price = 25 WHERE id = 3',
  },
  {
    id: 'sql-6',
    unitId: '3.7',
    topicId: '3.7.2',
    title: 'DELETE record',
    schema: 'Students(id, name, age, year)',
    question: 'Write SQL to delete the student with id=7.',
    expectedQuery: 'DELETE FROM Students WHERE id = 7',
  },
];

// ============================================================================
// QUESTION LAB
// ============================================================================

export const COMPUTE_QUESTIONS: ComputeQuestion[] = [
  { id: 'q-3.1-1', unitId: '3.1', topicId: '3.1.1', paper: 1, type: 'shortAnswer', question: 'Explain the difference between an algorithm and a computer program.', correctAnswer: 'An algorithm is a sequence of steps to complete a task; a program is an implementation of that algorithm in code.', markScheme: '1 mark: algorithm = steps/plan. 1 mark: program = implementation in code.' },
  { id: 'q-3.1-2', unitId: '3.1', topicId: '3.1.3', paper: 1, type: 'multipleChoice', question: 'When is binary search more efficient than linear search?', options: ['Always', 'When the list is sorted and large', 'When the list is unsorted', 'Never'], correctAnswer: 'When the list is sorted and large', markScheme: '1 mark: sorted and large.' },
  { id: 'q-3.1-3', unitId: '3.1', topicId: '3.1.4', paper: 1, type: 'shortAnswer', question: 'State one advantage of merge sort over bubble sort for large lists.', correctAnswer: 'Merge sort is more efficient / O(n log n) vs O(n²) / fewer comparisons.', markScheme: '1 mark for efficiency or comparison count.' },
  { id: 'q-3.2-1', unitId: '3.2', topicId: '3.2.2', paper: 1, type: 'multipleChoice', question: 'A WHILE loop checks the condition:', options: ['After each iteration', 'Before each iteration', 'Only once', 'Never'], correctAnswer: 'Before each iteration', markScheme: '1 mark: before.' },
  { id: 'q-3.2-2', unitId: '3.2', topicId: '3.2.11', paper: 1, type: 'shortAnswer', question: 'Give one example of boundary test data for a program that accepts ages 1–100.', correctAnswer: '1, 100, or 0, 101 (limits)', markScheme: '1 mark for valid boundary.' },
  { id: 'q-3.3-1', unitId: '3.3', topicId: '3.3.2', paper: 2, type: 'shortAnswer', question: 'Convert 255 from decimal to hexadecimal.', correctAnswer: 'FF', markScheme: '1 mark: FF.' },
  { id: 'q-3.3-2', unitId: '3.3', topicId: '3.3.6', paper: 2, type: 'shortAnswer', question: 'An image is 1000×800 pixels with 24-bit colour depth. Calculate file size in bytes.', correctAnswer: '2400000', markScheme: '1 mark: (1000×800×24)/8 = 2400000.' },
  { id: 'q-3.4-1', unitId: '3.4', topicId: '3.4.5', paper: 2, type: 'shortAnswer', question: 'Name the three stages of the Fetch-Execute cycle.', correctAnswer: 'Fetch, Decode, Execute', markScheme: '1 mark each for fetch, decode, execute.' },
  { id: 'q-3.4-2', unitId: '3.4', topicId: '3.4.2', paper: 2, type: 'multipleChoice', question: 'What is the output of NOT 1?', options: ['1', '0', '2', 'Undefined'], correctAnswer: '0', markScheme: '1 mark: 0.' },
  { id: 'q-3.5-1', unitId: '3.5', topicId: '3.5.1', paper: 2, type: 'shortAnswer', question: 'Give two advantages of using a computer network.', correctAnswer: 'Sharing resources (files, printers); communication; centralised backup; access from multiple devices.', markScheme: '1 mark each for two valid advantages.' },
  { id: 'q-3.6-1', unitId: '3.6', topicId: '3.6.2', paper: 2, type: 'shortAnswer', question: 'Describe one method to protect against phishing.', correctAnswer: 'Be wary of suspicious emails; verify sender; do not click links in unsolicited emails; use spam filters.', markScheme: '1–2 marks for valid method.' },
  { id: 'q-3.7-1', unitId: '3.7', topicId: '3.7.1', paper: 2, type: 'shortAnswer', question: 'Explain why a primary key is needed in a database table.', correctAnswer: 'To uniquely identify each record; prevents duplicates; enables linking tables.', markScheme: '1–2 marks for unique identification or linking.' },
  { id: 'q-3.8-1', unitId: '3.8', topicId: '3.8.1', paper: 2, type: 'shortAnswer', question: 'Give one environmental impact of digital technology.', correctAnswer: 'E-waste; energy consumption; resource extraction; carbon footprint.', markScheme: '1 mark for valid impact.' },
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
