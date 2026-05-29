/**
Sliding window logic
Expand
↓
Invalid
↓
Shrink until valid
↓
Expand
 

In sliding window problems — always move slow forward using slow++ directly. Never introduce a secondary pointer for shrinking the window.
For most sliding-window problems, ask these three questions first:
    What is the invariant?
    e.g., unique characters
    at most 2 distinct numbers
    sum ≤ k
    What data structure helps me check validity?
    Set
    Map
    Counter
    Running sum
    When invalid, how do I restore validity?
    Move slow pointer
    Update state
    Repeat until valid
**/
/**
 * 
        "Longest substring without repeating characters"
        ↓
        Variable-size sliding window

        "At most 2 distinct numbers"
        ↓
        Variable-size sliding window

        "Maximum sum subarray of size K"
        ↓
        Fixed-size sliding window
 */

        /**
         * 
         * before solving any problem, answer:
            What pattern is this?
            Why?
            What is the invariant?

            Only then code.
         */