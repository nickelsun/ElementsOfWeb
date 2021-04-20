const NOT_FOUND = -1;

const root = document.getElementById('root');
const alertMessage = document.getElementById('alertMessage');
const alertMessageText = document.getElementById('alertMessageText');
const tweetItems = document.getElementById('tweetItems');
const navigationButtons = document.getElementById('navigationButtons');
const list = document.getElementById('list');
const modifyItem = document.getElementById('modifyItem');
const modifyItemHeader = document.getElementById('modifyItemHeader');
const modifyItemInput = document.getElementById('modifyItemInput');
const cancelModification = document.getElementById('cancelModification');
const saveModifiedItem = document.getElementById('saveModifiedItem');

const addTweetButton = document.querySelector('.addTweet');

const gotoLikedButton = document.createElement('button');
gotoLikedButton.textContent = 'Go to Liked';
navigationButtons.append(gotoLikedButton);

const goBackButton = document.createElement('button');
goBackButton.textContent = 'Go Back to Main Page';
goBackButton.classList.add('hidden');
navigationButtons.append(goBackButton);

function getTweetsFromStorage() {
   if(localStorage.tweets) {
      return JSON.parse(localStorage.tweets);
   
   } else {
      return [];
   }
}

function saveTweetsToStorage() {
   localStorage.tweets = JSON.stringify(tweets);
}

function showTweets() {
   for(let tweet of tweets) {
      const liHTML = `
      <p class="tweetText">${tweet.text}</p>
      <button class="likeTweet">Like</button>
      <button class="removeTweet">Remove</button>
      `;
      let li = document.createElement('li');
      li.innerHTML = liHTML;
      li.classList.add('tweet');

      if(tweet.liked) {
         li.classList.add('likedTweet');
      
      } 
      if(likedOnly && !tweet.liked) {
         li.classList.add('hidden');
      }

      list.append(li);
   }
}

function customAlert(message) {
   const DELAY = 2000;
   alertMessageText.textContent = message;
   alertMessage.classList.remove('hidden');
   setTimeout(() => {
      alertMessage.classList.add('hidden');
   }, DELAY);
}

function getIndexFromTweetLI(li) {
   let text = li.querySelector('.tweetText').textContent;
   return tweets.findIndex( el => {
      return el.text === text;
   });
}

function gotoMainPage() {
   list.innerHTML = '';
   likedOnly = false;
   showTweets();

   tweetItems.classList.remove('hidden');
   modifyItem.classList.add('hidden');
   modifyItemInput.value = '';

   addTweetButton.classList.remove('hidden');
   gotoLikedButton.classList.remove('hidden');
   goBackButton.classList.add('hidden');

   hashChangeMine = true;
   location.hash = '';
}

function gotoLikedTweetsPage() {
   addTweetButton.classList.add('hidden');
   gotoLikedButton.classList.add('hidden');
   goBackButton.classList.remove('hidden');

   list.innerHTML = '';
   likedOnly = true;
   showTweets();

   hashChangeMine = true;
   location.hash = `#/liked`;
}

function gotoAddTweetPage() {
   tweetInEdit = { element: null };
   tweetItems.classList.add('hidden');
   modifyItem.classList.remove('hidden');
   modifyItemInput.value = '';

   hashChangeMine = true;
   location.hash = `#/add`;
}

function gotoEditPage(index, element) {
   tweetInEdit = { index: index, element: element };
   tweetItems.classList.add('hidden');
   modifyItem.classList.remove('hidden');
   modifyItemInput.value = tweets[index].text;

   hashChangeMine = true;
   location.hash = `#/edit/:${index}`;
}

addTweetButton.addEventListener('click', () => {
   gotoAddTweetPage();
});

gotoLikedButton.addEventListener('click', () => {
   gotoLikedTweetsPage();
});

list.addEventListener('click', e => {

   if(e.target.classList.contains('removeTweet')) {
      let li = e.target.parentNode;
      tweets.splice(getIndexFromTweetLI(li),1);
      li.remove();
      saveTweetsToStorage();
   
   } else if(e.target.classList.contains('likeTweet')) {
      let li = e.target.parentNode;
      
      let index = getIndexFromTweetLI(li);
      tweets[index].liked = !tweets[index].liked;
      li.classList.toggle('likedTweet');
      saveTweetsToStorage();
   
   } else if(e.target.classList.contains('tweetText')) {
      gotoEditPage(getIndexFromTweetLI(e.target.parentNode), e.target.parentNode);
   
   } else if(e.target.classList.contains('tweet')) {
      gotoEditPage(getIndexFromTweetLI(e.target), e.target);
   }
});

cancelModification.addEventListener('click', () => {
   gotoMainPage();
});

saveModifiedItem.addEventListener('click', () => {
   let text = modifyItemInput.value;

   if(text.length===0) {
      return;
   }
   
   if(tweets.findIndex(e => {
      return e.text === text
   }) !== NOT_FOUND) {

      customAlert(`Error! You can't tweet about that`);
      return;
   }

   if(tweetInEdit.element) {
      tweets[tweetInEdit.index].text = text;
      tweetInEdit.element.querySelector('.tweetText').textContent = text;
   
   } else {
      tweets.push({text: text});

      let li = document.createElement('li');
      li.innerHTML = `
      <p class="tweetText">${text}</p>
      <button class="likeTweet">Like</button>
      <button class="removeTweet">Remove</button>`;

      li.classList.add('tweet');
      list.append(li);
   }
   saveTweetsToStorage();
   gotoMainPage();
});

goBackButton.addEventListener('click', () => {
   gotoMainPage();
});

window.onhashchange = () => {
   if(hashChangeMine) {
      hashChangeMine = false;
      console.log(location.hash);
      return;
   }
   let h = location.hash;
   if(h.includes('liked')) {
      gotoLikedTweetsPage();
   
   } else if(h.includes('add')) {
      gotoAddTweetPage();

   } else if(h.includes('edit')) {
      gotoEditPage();
   
   } else {
      gotoMainPage();
   }
};

const maxTweetLen = 140;
modifyItemInput.setAttribute('maxlength', maxTweetLen);
let tweetInEdit = { index: 0, element: null };
let tweets = getTweetsFromStorage();
let likedOnly = false;
let hashChangeMine = false;
showTweets();