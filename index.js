const readline = require("readline");
const moment = require("moment");
const jsonfile = require("jsonfile");
const simpleGit = require("simple-git");

const FILE_PATH = './data.json';
const alphabetIndices = {
    A: [
      [0, 2],
      [1, 1], [1, 3],
      [2, 1], [2, 3],
      [3, 1], [3, 2], [3, 3],
      [4, 1], [4, 3],
      [5, 1], [5, 3],
      [6, 1], [6, 3]
    ],
    B: [
      [0, 0], [0, 1], [0, 2], [0, 3],
      [1, 0], [1, 4],
      [2, 0], [2, 2], [2, 4],
      [3, 0], [3, 2], [3, 4],
      [4, 0], [4, 4],
      [5, 0], [5, 2], [5, 4],
      [6, 0], [6, 1], [6, 2], [6, 3]
    ],
    C: [
      [0, 1], [0, 2], [0, 3],
      [1, 0], [1, 4],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 1], [6, 2], [6, 3]
    ],
    D: [
      [0, 0], [0, 1], [0, 2], [0, 3],
      [1, 0], [1, 4],
      [2, 0], [2, 4],
      [3, 0], [3, 4],
      [4, 0],
      [5, 0], [5, 4],
      [6, 0], [6, 1], [6, 2], [6, 3]
    ],
    E: [
      [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
      [1, 0],
      [2, 0], [2, 2], [2, 4],
      [3, 0], [3, 2], [3, 4],
      [4, 0],
      [5, 0],
      [6, 0], [6, 1], [6, 2], [6, 3], [6, 4]
    ],
    F: [
      [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
      [1, 0],
      [2, 0], [2, 2],
      [3, 0], [3, 2],
      [4, 0],
      [5, 0],
      [6, 0]
    ],
    G: [
      [0, 1], [0, 2], [0, 3],
      [1, 0],
      [2, 0], [2, 4],
      [3, 0], [3, 2], [3, 4], [3, 3],
      [4, 0], [4, 4], [4, 1],
      [5, 0], [5, 4], [5, 3],
      [6, 1], [6, 2], [6, 3]
    ],
    H: [
      [0, 0], [0, 4],
      [1, 0], [1, 4],
      [2, 0], [2, 4], [2, 2],
      [3, 2],
      [4, 2],
      [5, 0], [5, 4], [5, 2],
      [6, 0], [6, 4]
    ],
    I: [
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 2],
      [5, 2],
      [6, 2]
    ],
    J: [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [1, 3],
      [2, 3],
      [3, 3],
      [4, 3],
      [5, 0], [5, 3],
      [6, 0], [6, 1], [6, 2]
    ],
    K: [
      [0, 0], [0, 4],
      [1, 0], [1, 3],
      [2, 0], [2, 2],
      [3, 0], [3, 1], [3, 4],
      [4, 0], [4, 2],
      [5, 0], [5, 3],
      [6, 0], [6, 4]
    ],
    L: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0], [5, 1],
      [6, 0], [6, 1], [6, 2], [6, 3], [6, 4]
    ],
    M: [
      [0, 0], [0, 4],
      [1, 0], [1, 1], [1, 3], [1, 4],
      [2, 0], [2, 2], [2, 4],
      [3, 0], [3, 4],
      [4, 0], [4, 4],
      [5, 0],
      [6, 0], [6, 4]
    ],
    N: [
      [0, 0], [0, 4],
      [1, 0], [1, 1], [1, 4],
      [2, 0], [2, 2], [2, 4],
      [3, 0], [3, 3], [3, 4],
      [4, 0], [4, 4],
      [5, 0], [5, 4],
      [6, 0], [6, 4]
    ],
    O: [
      [0, 1], [0, 2], [0, 3],
      [1, 0], [1, 4],
      [2, 0], [2, 4],
      [3, 0], [3, 4],
      [4, 0], [4, 4],
      [5, 0], [5, 4],
      [6, 1], [6, 2], [6, 3]
    ],
    P: [
      [0, 0], [0, 1], [0, 2], [0, 3],
      [1, 0], [1, 4],
      [2, 0], [2, 2],
      [3, 0], [3, 2],
      [4, 0],
      [5, 0],
      [6, 0]
    ],
    Q: [
      [0, 1], [0, 2], [0, 3],
      [1, 0], [1, 4],
      [2, 0], [2, 4],
      [3, 0], [3, 4], [3, 1],
      [4, 0], [4, 4], [4, 2],
      [5, 0], [5, 4], [5, 3],
      [6, 1], [6, 2], [6, 3], [6, 4]
    ],
    R: [
      [0, 0], [0, 1], [0, 2], [0, 3],
      [1, 0], [1, 4],
      [2, 0], [2, 2],
      [3, 0], [3, 2], [3, 4],
      [4, 0], [4, 4],
      [5, 0], [5, 3], [5, 4],
      [6, 0], [6, 3]
    ],
    S: [
      [0, 1], [0, 2], [0, 3],
      [1, 0],
      [2, 0],
      [3, 1], [3, 2], [3, 3],
      [4, 4],
      [5, 4],
      [6, 1], [6, 2], [6, 3]
    ],
    T: [
      [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 2],
      [5, 2],
      [6, 2]
    ],
    U: [
      [0, 0], [0, 4],
      [1, 0], [1, 4],
      [2, 0], [2, 4],
      [3, 0], [3, 4],
      [4, 0], [4, 4],
      [5, 1], [5, 3],
      [6, 2]
    ],
    V: [
      [0, 0], [0, 4],
      [1, 0], [1, 4],
      [2, 0], [2, 4],
      [3, 0], [3, 4],
      [4, 1], [4, 3],
      [5, 1], [5, 3],
      [6, 2]
    ],
    W: [
      [0, 0], [0, 4],
      [1, 0], [1, 4],
      [2, 0], [2, 2], [2, 4],
      [3, 0], [3, 4], [3, 2], [3, 4],
      [4, 0], [4, 4], [4, 2], [4, 4],
      [5, 0], [5, 4], [5, 2],
      [6, 0], [6, 4]
    ],
    X: [
      [0, 0], [0, 4],
      [1, 1], [1, 3],
      [2, 2],
      [3, 1], [3, 3],
      [4, 0], [4, 4],
      [5, 1], [5, 3],
      [6, 0], [6, 4]
    ],
    Y: [
      [0, 0], [0, 4],
      [1, 1], [1, 3],
      [2, 2],
      [3, 2],
      [4, 2],
      [5, 2],
      [6, 2]
    ],
    Z: [
      [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
      [1, 3],
      [2, 2],
      [3, 1],
      [4, 0],
      [5, 0],
      [6, 0], [6, 1], [6, 2], [6, 3], [6, 4]
    ]
  };

  const makeCommit = (n, day, letter, i, capitalizedName) => {
    if (n === 0) {
      return simpleGit().push((pushSummary) => {
        console.log(`Push summary for ${capitalizedName[i]}:`, pushSummary);
        if (i + 1 < capitalizedName.length) {
          setTimeout(() => {
            const nextLetter = capitalizedName[i + 1];
            const startIndex = (i + 1) * 49;
            const elements = alphabetIndices[nextLetter].slice();
            makeCommit(elements.length, startIndex, elements.slice(), i + 1, capitalizedName);
          }, 2000);
        }
      });
    }
  
    const lastValue = letter[letter.length - 1];
    letter.pop();
    const [d, w] = lastValue;
    const DATE = moment("20180107").add(d + day, "d").add(w, "w").format();
  
    const data = {
      date: DATE,
    };
  
    jsonfile.writeFile(FILE_PATH, data, (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("Data written to file:", data);
  
      simpleGit()
        .add(FILE_PATH)
        .exec(() => {
          console.log("Changes added.");
          simpleGit()
            .commit(DATE, { '--date': DATE }, (commitSummary) => {
              console.log("Commit summary:", commitSummary);
              makeCommit(--n, day, letter, i, capitalizedName);
            });
        });
    });
  };
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question("Enter your name: ", (name) => {
    rl.close();
  
    const capitalizedName = name.toUpperCase();
    console.log("Capitalized Name:", capitalizedName);
  
    if (capitalizedName.length === 0) {
      console.log("Please provide a valid name.");
      return;
    }
  
    const startIndex = 1;
    const elements = alphabetIndices[capitalizedName[0]].slice();
    makeCommit(elements.length, startIndex, elements.slice(), 0, capitalizedName);
  });