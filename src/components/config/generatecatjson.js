import fs from 'fs';

const generateJson = () => {
  const cats = [];
  for (let i = 1; i <= 2109; i++) {
    cats.push(`images/cats_from_memes/cat (${i}).jpg`);
  }

  const json = {
    cats: cats
  };

  fs.writeFileSync('cats.json', JSON.stringify(json, null, 2));
};

generateJson();
