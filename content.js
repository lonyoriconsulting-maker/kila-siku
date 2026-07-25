// Kila Siku — content bank. Add to this array any time; the app rotates through it.
const DRIPS = [
  // ---------- Module 1: Programming & Scripting ----------
  {
    module: "Programming & Scripting",
    title: "strcpy vs strncpy",
    concept: "strcpy() in C copies until it hits a null byte, with no idea how big the destination buffer is. If the source is longer than the destination, it happily writes past the end — a classic buffer overflow. strncpy() takes a max length, so it can't overrun the buffer, though it won't null-terminate for you if the source fills the whole length.",
    q: "Why is strcpy() considered dangerous, and what would you use instead?",
    a: "strcpy() trusts the caller to guarantee the destination is big enough, which attacker-controlled input never guarantees. Prefer strncpy(), snprintf(), or bounds-checked alternatives, and always account for the null terminator yourself.",
    drill: "In your head: if char buf[8] and you strcpy() a 12-byte string into it, which 4 bytes get overwritten — and what typically sits right after a stack buffer in memory?"
  },
  {
    module: "Programming & Scripting",
    title: "Logging levels vs print()",
    concept: "print() debugging works until you have a script running unattended — then you either drown in noise or see nothing. Logging levels (DEBUG, INFO, WARNING, ERROR, CRITICAL) let you leave instrumentation in the code permanently and just turn the volume up or down.",
    q: "Why do production security tools use logging levels instead of print statements?",
    a: "Levels let you ship one codebase that's silent in normal operation and verbose during an incident, without editing code. They also route naturally to log files, SIEMs, or alerting systems instead of a terminal that nobody's watching.",
    drill: null
  },
  {
    module: "Programming & Scripting",
    title: "Exit codes",
    concept: "Every process returns an exit code when it finishes — 0 means success, anything else signals a specific failure. Scripts that chain commands (in bash, or via subprocess in Python) rely on these codes to decide whether to continue, retry, or abort.",
    q: "A script silently continues after a failed step. What's the likely cause?",
    a: "The script isn't checking the exit code — in bash that usually means missing `set -e` or an unchecked `$?`; in Python it means not checking subprocess.returncode or catching the wrong exception.",
    drill: "Quick recall: what bash flag makes a script exit immediately the moment any command in it fails?"
  },
  {
    module: "Programming & Scripting",
    title: "Regex for log parsing",
    concept: "Log lines are semi-structured text, and regex is the fastest way to pull a field (an IP, a timestamp, a status code) out of thousands of lines without writing a full parser. The risk is regex that's too greedy or too clever — it silently matches the wrong thing on malformed input.",
    q: "You need every failed SSH login IP from auth.log. What's your approach?",
    a: "Grep for the known failure string (e.g. 'Failed password'), then a regex capture group for the IPv4 pattern in that line, and count occurrences per IP to spot brute-force sources.",
    drill: "Write the regex pattern for a basic IPv4 address in your head before checking — it's four groups of 1-3 digits separated by dots."
  },
  {
    module: "Programming & Scripting",
    title: "Generators vs lists in Python",
    concept: "A list builds the entire result in memory at once; a generator yields one item at a time and forgets it after. When you're scanning a multi-gigabyte log file, a list comprehension can exhaust memory — a generator won't, because it never holds more than one line.",
    q: "You're parsing a huge log file in Python. list comprehension or generator, and why?",
    a: "Generator — you process line by line with a `for` loop or generator expression instead of loading the whole file into a list, keeping memory flat regardless of file size.",
    drill: null
  },
  {
    module: "Programming & Scripting",
    title: "Script permissions on Linux",
    concept: "A script needs the execute bit (chmod +x) before it can run directly, and the shebang line (#!/usr/bin/env python3) tells the OS which interpreter to hand it to. Missing either one is the single most common 'permission denied' or 'command not found' moment for beginners.",
    q: "Your script gives 'Permission denied' when you run ./scan.py. First thing you check?",
    a: "Whether the execute bit is set — `chmod +x scan.py` — and that the shebang line points to a valid interpreter path.",
    drill: null
  },

  // ---------- Module 2: Engineering Mathematics ----------
  {
    module: "Engineering Mathematics",
    title: "Modular arithmetic & Caesar cipher",
    concept: "A Caesar cipher shifts each letter by a fixed number, wrapping around the alphabet — that wraparound is modular arithmetic (mod 26). It's the simplest possible illustration of how crypto leans on number theory: encryption is a math function, decryption is its inverse.",
    q: "Why is a Caesar cipher trivially breakable regardless of the shift value chosen?",
    a: "There are only 25 possible shifts, so brute force takes seconds, and English letter-frequency analysis narrows it down even faster without trying every shift.",
    drill: "Shift 'HELLO' by 3 in your head using mod 26 — what comes out?"
  },
  {
    module: "Engineering Mathematics",
    title: "XOR in cryptography",
    concept: "XOR is reversible with the same key (A XOR B XOR B = A), which is why it's the backbone of stream ciphers and one-time pads. It's also cheap in hardware and software, which is why it shows up constantly in checksums and simple obfuscation, not just 'real' crypto.",
    q: "Why is XOR-based encryption with a reused key completely breakable?",
    a: "XOR two ciphertexts encrypted with the same key and the key cancels out, leaving you with the XOR of the two plaintexts — from there, known-plaintext or frequency techniques recover both messages. This is why one-time pads demand a key used exactly once.",
    drill: null
  },
  {
    module: "Engineering Mathematics",
    title: "Why RSA needs large primes",
    concept: "RSA's security rests on the fact that multiplying two large primes is fast, but factoring the product back into those primes is computationally brutal at the sizes used (2048+ bits). If either prime is small or predictable, the whole scheme collapses to something factorable in seconds.",
    q: "Why does RSA break if you pick two primes that are close together in value?",
    a: "Fermat's factorization method exploits primes close to each other — it can factor n = p*q very quickly when p and q are near sqrt(n), which is exactly why key generation enforces primes that are large and sufficiently far apart.",
    drill: null
  },
  {
    module: "Engineering Mathematics",
    title: "Password entropy",
    concept: "Entropy measures how many guesses an attacker needs in the worst case, expressed in bits — each added bit doubles the search space. An 8-character password from a 26-letter alphabet has far less entropy than a 4-word random passphrase, even though the passphrase looks 'less complex'.",
    q: "Why does a passphrase like 'correct-horse-battery-staple' beat 'P@ssw0rd1'?",
    a: "The passphrase draws from a huge dictionary with random word order, giving high entropy per character of effort to remember, while 'P@ssw0rd1' follows a predictable substitution pattern that password-cracking dictionaries specifically target first.",
    drill: "Rough math: if a password has 40 bits of entropy, how many guesses (order of magnitude) does brute force need in the worst case?"
  },
  {
    module: "Engineering Mathematics",
    title: "Boolean algebra simplification",
    concept: "Firewall rules, access-control logic, and packet filters are all boolean expressions underneath. Simplifying them (De Morgan's laws, distributive/absorption rules) isn't just academic — a bloated, unsimplified rule set is exactly where security holes hide, because nobody can audit ten redundant conditions by eye.",
    q: "A firewall rule set has grown to 40 overlapping rules. What's the security risk, independent of what each rule says?",
    a: "Unsimplified, overlapping rules make it nearly impossible to reason about the actual effective policy — a later permissive rule can silently override an earlier restrictive one, and shadowed or redundant rules hide the real attack surface from auditors.",
    drill: null
  },
  {
    module: "Engineering Mathematics",
    title: "The birthday paradox & hash collisions",
    concept: "You only need ~23 people in a room for a 50% chance two share a birthday — far fewer than the 366 you'd intuitively guess, because you're comparing every pair, not one fixed date. The same math means finding a hash collision takes roughly 2^(n/2) attempts, not 2^n, for an n-bit hash.",
    q: "For a 128-bit hash, roughly how many attempts before you expect a collision, and why does that matter?",
    a: "Around 2^64 attempts, not 2^128 — the birthday bound halves the effective bit strength, which is exactly why hash functions need double the bit length you'd naively assume to resist collision attacks.",
    drill: null
  },

  // ---------- Module 3: Digital Electronics ----------
  {
    module: "Digital Electronics",
    title: "XOR gate in packet checksums",
    concept: "XOR gates output 1 only when inputs differ — that single property makes them the basis of parity bits and simple checksums, because flipping any one bit in the data flips the XOR result too, so corruption gets detected. It's the same operation from cryptography, just at the hardware level.",
    q: "How does a single parity bit detect (but not correct) a bit-flip error?",
    a: "The parity bit is set so the total number of 1s is even (or odd); XOR-ing all bits including the parity bit should return 0 if nothing changed. Any single-bit flip breaks that, but the receiver has no way to know which bit flipped — only that something did.",
    drill: "XOR 1011 with 1101 by hand — what's the result?"
  },
  {
    module: "Digital Electronics",
    title: "Two's complement",
    concept: "Computers represent negative numbers using two's complement: invert all bits and add 1. This lets addition and subtraction use the exact same circuitry regardless of sign — no special-case hardware needed — which is also why integer overflow wraps around in a specific, exploitable way.",
    q: "Why does an 8-bit signed integer overflow from 127 to -128 instead of just erroring?",
    a: "In two's complement, 127 is 01111111; adding 1 flips it to 10000000, which is interpreted as -128 because the top bit is the sign bit. This silent wraparound is exactly what integer-overflow vulnerabilities exploit — the value doesn't crash, it just becomes a different, often dangerous, number.",
    drill: null
  },
  {
    module: "Digital Electronics",
    title: "Endianness",
    concept: "Big-endian stores the most significant byte first; little-endian stores the least significant byte first. Network protocols standardize on big-endian ('network byte order'), while x86 CPUs are little-endian internally — mixing them up is a classic source of bugs when parsing raw packet or file bytes by hand.",
    q: "You read 4 raw bytes from a network packet as an integer and get a wildly wrong value. What's the first thing you check?",
    a: "Byte order — whether you need to convert from network byte order (big-endian) to your host's byte order, typically with something like Python's struct.unpack using the right format specifier or ntohl() in C.",
    drill: null
  },
  {
    module: "Digital Electronics",
    title: "Bit masking & flags",
    concept: "A single integer can pack multiple boolean flags — file permissions (rwx) are the classic example, where each bit position means something (read=4, write=2, execute=1) and you use AND/OR/XOR to check or set individual bits without touching the others.",
    q: "Unix permission 640 — what does it actually mean, bit by bit?",
    a: "6 (owner) = read+write, 4 (group) = read only, 0 (others) = no access — each digit is a 3-bit mask where 4=read, 2=write, 1=execute, summed for whichever are granted.",
    drill: "What octal value represents read+write+execute for owner, read-only for group, no access for others?"
  },
  {
    module: "Digital Electronics",
    title: "Packet header structure",
    concept: "Protocol headers are rigid bit layouts — the IPv4 header, for instance, packs version, header length, TTL, protocol, and addresses into precisely defined byte offsets. A packet parser is really just applying bit masks and offsets to raw bytes according to that spec.",
    q: "How would you extract just the TTL field from a raw IPv4 packet's bytes?",
    a: "TTL sits at a fixed byte offset (byte 8) in the IPv4 header, so you index directly into the raw bytes at that position — no searching required, because the header format is fixed-length and fixed-position by spec.",
    drill: null
  },
  {
    module: "Digital Electronics",
    title: "AND/OR/NOT/XOR truth tables",
    concept: "These four gates are the entire vocabulary digital logic is built from — every circuit, every ALU, every access-control decision in hardware reduces to combinations of them. Fluency with the truth tables (not memorized, but reasoned through) is what lets you read any logic diagram cold.",
    q: "In an access-control circuit, why would a design use NAND (NOT-AND) instead of AND?",
    a: "NAND is functionally complete — any boolean function, including AND, OR, and NOT, can be built from NAND gates alone, which is why real chips are often built almost entirely from NAND for manufacturing simplicity, not because NAND itself is more 'secure'.",
    drill: null
  },

  // ---------- Module 4: Data Structures & OOP ----------
  {
    module: "Data Structures & OOP",
    title: "The call stack and stack overflow attacks",
    concept: "Every function call pushes a stack frame with local variables and a return address; when the function returns, the CPU jumps to that address. A classic stack-based buffer overflow overwrites the return address with attacker-controlled data, hijacking control flow the moment the function returns.",
    q: "Walk through, at a high level, how a stack buffer overflow leads to arbitrary code execution.",
    a: "Attacker input overflows a local buffer, overwriting adjacent stack memory including the saved return address; when the function returns, the CPU jumps to the attacker-controlled address instead of the real caller — often pointing into attacker-supplied shellcode or a reused code gadget.",
    drill: null
  },
  {
    module: "Data Structures & OOP",
    title: "Hash tables for password storage",
    concept: "You never store passwords in plaintext or even reversible encryption — you store a salted hash, so the server can verify a login by re-hashing the attempt and comparing, without ever knowing the original password. Hash tables (dictionaries) are also how a login system does that O(1) lookup by username.",
    q: "Why is a salt necessary in addition to hashing the password?",
    a: "Without a salt, identical passwords produce identical hashes, so an attacker with a precomputed rainbow table can crack many accounts at once; a unique salt per user forces the attacker to crack each password individually.",
    drill: null
  },
  {
    module: "Data Structures & OOP",
    title: "Queue-based rate limiting",
    concept: "A sliding-window rate limiter is often just a queue of timestamps per client — push a new request time, pop off anything older than the window, and if the queue length exceeds the limit, reject the request. It's a simple data structure doing real DoS mitigation work.",
    q: "How would you implement a 'max 5 requests per 10 seconds' rate limiter using a queue?",
    a: "Keep a queue of timestamps per client; on each request, drop timestamps older than 10 seconds from the front, then check the queue length — if it's already 5, reject; otherwise push the new timestamp and allow it.",
    drill: null
  },
  {
    module: "Data Structures & OOP",
    title: "Encapsulation & least privilege",
    concept: "Encapsulation — hiding internal state behind methods — is the OOP mirror of the security principle of least privilege. A class that exposes raw internal fields lets any caller put it into an invalid or dangerous state; one that exposes only validated methods controls exactly what mutations are possible.",
    q: "How does making a class's fields private instead of public reduce security risk?",
    a: "Private fields force every mutation through a method you control, so you can validate, log, or reject bad input at a single chokepoint, instead of trusting every caller across the codebase to only ever set valid values.",
    drill: null
  },
  {
    module: "Data Structures & OOP",
    title: "Input validation as a design pattern",
    concept: "Validating input inside a constructor or setter — rather than trusting whatever gets passed in — means an invalid object simply can't exist in your system. This 'fail at construction' approach catches bad data at the boundary instead of deep inside business logic where it's harder to trace.",
    q: "Where's the right place to validate that a username has no SQL injection characters — at the database layer or at object construction?",
    a: "Both, defense in depth — validate early at construction/input boundary to reject obviously malformed data fast, but never rely on that alone; use parameterized queries at the database layer regardless, since validation logic can always have a gap.",
    drill: null
  },
  {
    module: "Data Structures & OOP",
    title: "Linked lists vs arrays for log storage",
    concept: "Arrays give O(1) random access but expensive inserts in the middle; linked lists give cheap inserts anywhere but no random access. Append-only security logs almost always favor array-like structures (or ring buffers) because you're writing sequentially and reading sequentially, not inserting randomly.",
    q: "You're building an in-memory buffer of the last 1000 security events. Array or linked list, and why?",
    a: "A fixed-size circular (ring) buffer, which is array-backed — O(1) append, automatic eviction of the oldest entry, and cache-friendly sequential memory, none of which a linked list gives you for this access pattern.",
    drill: null
  },

  // ---------- Module 5: Computer Architecture ----------
  {
    module: "Computer Architecture",
    title: "Cache timing side-channels",
    concept: "Data in CPU cache is read faster than data that has to come from main memory — that timing difference, tiny as it is, leaks information. Spectre and Meltdown exploited exactly this: by measuring which memory addresses were cached after speculative execution, attackers inferred data they were never authorized to read directly.",
    q: "At a conceptual level, how does a cache-timing side-channel attack leak secret data without directly reading it?",
    a: "The attacker causes the victim's code to load secret-dependent data into cache (often via speculative execution), then measures access time to various addresses afterward — addresses that are now fast to access reveal which one was touched, indirectly exposing the secret bit by bit.",
    drill: null
  },
  {
    module: "Computer Architecture",
    title: "Stack vs heap",
    concept: "Stack memory is fast, fixed-size, and automatically freed when a function returns — good for local variables, bad for anything that needs to outlive the function or whose size isn't known ahead of time. Heap memory is flexible but manually managed (in C) or garbage-collected, and its bugs (use-after-free, double-free) are a huge exploit category.",
    q: "What's a use-after-free vulnerability, in plain terms?",
    a: "Memory on the heap is freed, but a pointer to it is used again afterward; since that memory can be reallocated for something else in the meantime, the stale pointer now reads or writes attacker-influenceable data instead of what the programmer expected.",
    drill: null
  },
  {
    module: "Computer Architecture",
    title: "CPU privilege rings",
    concept: "Modern CPUs enforce privilege levels in hardware — ring 0 (kernel mode) can do anything, ring 3 (user mode) is sandboxed and must ask the kernel via system calls for privileged operations. Privilege escalation exploits are specifically about tricking the kernel into letting user-mode code act as if it were ring 0.",
    q: "Why can't a normal user-mode program just directly read another process's memory?",
    a: "The CPU's memory management unit enforces process isolation at the hardware level, and only ring-0 kernel code has the privilege to bypass it — a user-mode program has to go through kernel-mediated, permission-checked system calls for anything crossing process boundaries.",
    drill: null
  },
  {
    module: "Computer Architecture",
    title: "ASLR",
    concept: "Address Space Layout Randomization randomizes where a program's stack, heap, and libraries load in memory each run, so an attacker can't hardcode a target address for a return-oriented-programming exploit. It's a mitigation, not a fix — it raises the cost of exploitation rather than closing the underlying bug.",
    q: "Does ASLR prevent buffer overflow exploits entirely?",
    a: "No — it makes them much harder by randomizing memory addresses the attacker would need to jump to, but it can be defeated by info leaks that reveal the actual addresses at runtime, or bypassed with techniques that don't need a fixed address at all.",
    drill: null
  },
  {
    module: "Computer Architecture",
    title: "Bounded circular buffers",
    concept: "A circular buffer wraps around instead of growing, which makes it memory-safe by construction if implemented correctly — but an off-by-one in the wraparound logic is exactly where overflow bugs creep back in, even in a structure explicitly designed to avoid them.",
    q: "What's the most common implementation bug in a circular buffer's wraparound logic?",
    a: "Off-by-one errors in the modulo arithmetic for the read/write index — writing one slot too far can overwrite the oldest unread entry, or the full/empty check can be ambiguous when the head and tail indices coincide.",
    drill: null
  },
  {
    module: "Computer Architecture",
    title: "DMA and memory-mapped I/O",
    concept: "Direct Memory Access lets devices (like a network card) write straight into RAM without going through the CPU — great for performance, but it means a malicious or compromised peripheral can potentially read or write memory it shouldn't, bypassing normal OS-level checks entirely (a 'DMA attack').",
    q: "Why is a malicious USB or Thunderbolt device a bigger risk than a malicious file?",
    a: "Some peripherals can use DMA to access system memory directly, potentially bypassing the OS and CPU privilege checks altogether — which is why modern systems add an IOMMU to restrict what physical memory a device is allowed to touch.",
    drill: null
  },

  // ---------- Module 6: Cyber Security Foundations ----------
  {
    module: "Cyber Security Foundations",
    title: "TCP SYN scan",
    concept: "A SYN scan (half-open scan) sends a SYN packet and watches the response without completing the handshake — SYN-ACK means open, RST means closed, no response often means filtered. It's the default nmap scan technique because it's fast and historically stealthier than a full connection.",
    q: "How does a SYN scan determine a port is open without completing the TCP handshake?",
    a: "It sends a SYN and reads the reply: a SYN-ACK confirms the port is listening, at which point the scanner sends a RST instead of completing the handshake with an ACK — so no full connection, and often no application-level log entry, is created.",
    drill: null
  },
  {
    module: "Cyber Security Foundations",
    title: "Detecting brute force in logs",
    concept: "A brute-force login attempt shows up as a burst of failed authentication events from the same source in a short window, often against multiple usernames. Detection is really just log aggregation plus a threshold: count failures per source IP per time window, and alert past a cutoff.",
    q: "Design a simple rule to flag SSH brute-force attempts from auth.log.",
    a: "Group 'Failed password' lines by source IP within a rolling time window (say, 5 minutes); if any IP crosses a threshold like 10 failures in that window, flag it — bonus points for also checking if it then succeeds, which suggests the brute force worked.",
    drill: null
  },
  {
    module: "Cyber Security Foundations",
    title: "Hashing for integrity",
    concept: "A cryptographic hash like SHA-256 turns any input into a fixed-size fingerprint; even a one-bit change in the input produces a wildly different hash. That property makes hashing the standard way to verify a downloaded file or a piece of evidence hasn't been tampered with.",
    q: "You download a file and its published SHA-256 checksum. What exactly does a matching hash prove — and not prove?",
    a: "It proves the file's contents match exactly what the checksum was computed from — it does not prove the source is trustworthy, only that whatever you got matches whatever the checksum represents. If the checksum itself was tampered with or came from an untrusted source, the match is meaningless.",
    drill: null
  },
  {
    module: "Cyber Security Foundations",
    title: "Symmetric vs asymmetric encryption",
    concept: "Symmetric encryption (AES) uses one shared key for both encrypting and decrypting — fast, but you need a secure way to share that key first. Asymmetric encryption (RSA) uses a public/private key pair, solving the key-distribution problem, but it's much slower — which is why real systems (TLS) use asymmetric crypto just to exchange a symmetric session key, then switch to symmetric for the actual data.",
    q: "Why does HTTPS use both symmetric and asymmetric encryption instead of just one?",
    a: "Asymmetric crypto solves secure key exchange without a prior shared secret, but it's too slow for bulk data; so TLS uses asymmetric crypto only during the handshake to agree on a symmetric session key, then encrypts the actual traffic with fast symmetric AES.",
    drill: null
  },
  {
    module: "Cyber Security Foundations",
    title: "The CIA triad",
    concept: "Confidentiality, Integrity, and Availability are the three properties nearly every security control is trying to protect — encryption serves confidentiality, hashing/signing serves integrity, redundancy and rate-limiting serve availability. Any security decision can be framed as: which of these three am I protecting, and what am I trading off?",
    q: "A company encrypts a backup so heavily that restoring it during an outage takes 6 extra hours. Which leg of the CIA triad did they over-index on, at the expense of which other?",
    a: "They over-indexed on confidentiality at the expense of availability — the data was safe from unauthorized access, but not recoverable fast enough to keep the business running, which is itself a security failure if availability was a real requirement.",
    drill: null
  },
  {
    module: "Cyber Security Foundations",
    title: "Defense in depth & least privilege",
    concept: "No single control is assumed to be perfect — defense in depth layers multiple independent controls (firewall, patched software, least-privilege accounts, monitoring) so one failure doesn't mean total compromise. Least privilege means every account and process gets only the access it strictly needs, nothing 'just in case'.",
    q: "A web app's database account has full admin rights instead of read/write on just its own tables. Why is that a security problem even if the app itself is never breached?",
    a: "It violates least privilege — if the app is compromised through any vector (SQL injection, a leaked credential), the attacker inherits full admin rights instead of being contained to that app's own data, turning a contained incident into a full database compromise.",
    drill: null
  }
];
