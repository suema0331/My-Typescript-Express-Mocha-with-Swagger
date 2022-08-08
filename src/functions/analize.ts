import { Speech } from "./getData";

// 1. Which politician gave the most speeches in 2013?
exports.analizeMostSpeeches = function (speeches: Speech[], year: string) {
  const map = new Map();
  speeches.forEach((speech) => {
    const speechYear = speech.Date.split("-");
    if (!speechYear || !speechYear[0] || speechYear[0] !== year) return;
    if (map.has(speech.Speaker)) {
      const val = map.get(speech.Speaker);
      map.set(speech.Speaker, val + 1);
    } else {
      map.set(speech.Speaker, 1);
    }
  });
  if (map.size === 0) return null;
  const sortedMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
  console.log(sortedMap);
  const max = sortedMap.values().next().value;
  const mostSpeeches: string[] = [];
  sortedMap.forEach((value, key) => {
    if (max === value) {
      mostSpeeches.push(key);
    }
  });
  if (!mostSpeeches || mostSpeeches.length > 1) return null;
  return mostSpeeches[0];
};

// 2. Which politician gave the most speeches on the topic „Internal Security"?
exports.analizeMostSecurity = function (speeches: Speech[], topic: string) {
  const map = new Map();
  speeches.forEach((speech) => {
    const speechTopic = speech.Topic;
    if (!speechTopic || speechTopic !== topic) return;
    if (map.has(speech.Speaker)) {
      const val = map.get(speech.Speaker);
      map.set(speech.Speaker, val + 1);
    } else {
      map.set(speech.Speaker, 1);
    }
  });
  if (map.size === 0) return null;
  const sortedMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
  console.log(sortedMap);
  const max = sortedMap.values().next().value;
  const mostSecurities: string[] = [];
  sortedMap.forEach((value, key) => {
    if (max === value) {
      mostSecurities.push(key);
    }
  });
  if (!mostSecurities || mostSecurities.length > 1) return null;
  return mostSecurities[0];
};

// 3. Which politician used the fewest words (in total)?
exports.analizeLeastWordy = function (speeches: Speech[]) {
  const map = new Map();
  speeches.forEach((speech) => {
    const words = Number(speech.Words);
    if (map.has(speech.Speaker)) {
      const val = map.get(speech.Speaker);
      map.set(speech.Speaker, val + words);
    } else {
      map.set(speech.Speaker, words);
    }
  });
  if (map.size === 0) return null;
  const sortedMap = new Map([...map.entries()].sort((a, b) => a[1] - b[1]));
  console.log(sortedMap);

  const min = sortedMap.values().next().value;
  const leastWordies: string[] = [];
  sortedMap.forEach((value, key) => {
    if (min === value) {
      leastWordies.push(key);
    }
  });
  if (!leastWordies || leastWordies.length > 1) return null;
  return leastWordies[0];
};
