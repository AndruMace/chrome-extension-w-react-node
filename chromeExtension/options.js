// window.onload = (event) => {
//   let uuid;

//   chrome.identity.getProfileUserInfo((userInfo) => {
//     uuid = userInfo.id || "anonymous"
//   })

//   document.getElementById('userID').value = uuid;
// };

window.onload = (e) => {
  function getRandomToken() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
      hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
  }

  chrome.storage.sync.get('uuid', function (items) {
    var uuid = items.uuid;
    if (uuid) {
      useToken(uuid);
    } else {
      uuid = getRandomToken();
      chrome.storage.sync.set({ uuid: uuid }, function () {
        useToken(uuid);
      });
    }
    function useToken(uuid) {
      document.getElementById('userID').value = uuid;
    }
  });
}


function getCoupons(uuid) {
  // hit API 
}