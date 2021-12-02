'use strict';
// Access-Control-Allow-Origin = 'http://localhost:63342'

// Fetch the items from the JSON file
function loadItems() { // json file에 있는items 동적으로 받아옴.
    return fetch('data/data.json') // fetch -> 브라우저 API중 하나로, 해당하는 파일 경로나 url작성하면 간단하게 데이터를 네트워크통해서 받아올 수 있음.
        .then(response => response.json()) //  response 오브젝트에 있는 json API이용해서 response body를 json의 오브젝트로 변환.
        .then(json => json.items); // fetch는 데이터 성공적으로 받아오면 response라는 오브젝트를 전달해 줌. //json에 있는items만 전달
    // loadItems는 fetch로 데이터를 받아온 다음에 성공적으로 데이터를 받아오면 데이터를 json으로 변환하고 json안에 있는 items를 return.
}

// Update the list with the given items
function displayItems(items) { // items라는 인자를 받아와서 items라는 데이터를 html요소로 변환해서 페이지에 표기되도록 만들어 줌.
    const container = document.querySelector('.items'); //container요소 정의.

    container.innerHTML = items.map(item => createHTMLString(item)).join(''); // container의 innerHTML을 이용해서 받아온  items를 li그룹으로 만들어서 container에 추가.
    // 문자열의 배열을 한가지의 큰 문자열로 즉, li들이 계속 반복되는 문자열로 변환
    // ㄴ>문자열이 들어있는 배열을 한가지의 문자열로 병합하기 위해서 쓰는 API: join 
    // 각각의 item을 createHTMLString을 이용해서 li요소로 문자열로 변환.
}
// items안에는 json에서 정의한 각각의 item을 html요소로 변환, 즉 각각에 해당하는 item들을 html li태그로 변환해주는 배열로 변환.
// 한가지의 배열형태에서 다른형태의 배열로 변환 -> map,  map을 이용해서 각각의 item을 li태그로 변환


// Create HTML list item from the given data item
function createHTMLString(item) { // 각각 item을 받아와서  item을 li태그로 변환
    return `       
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail"/>
        <span class="item__description">${item.gender},${item.size}</span>
    </li>
    `;
} //

function onButtonClick(event, items) { // 이벤트 처리함수 on으로 시작, 클릭할 때 정보들을 이용해서 item filtering, 최종적으로 걸러진 items를 다시 우리가 만들어놓은 displayItems함수 호출해서 최종적으로 filter된 item 화면에 보여지기.
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if (key == null || value == null) { // 우리가 필터링 할 수 있는 정보가 들어있지 않다면, 아무것도 처리하지 않고 함수 끝내기.
        return;
    }
    const filtered = items.filter(item => item[key] === value); // 원하는 것만 골라서 보여줌
    // console.log(filtered);
    displayItems(filtered); // item 오브젝트안에 key에 해당하는 값이 우리가 원하는 value와 똑같은 것들만 골라서 displayItems로 전달
}

function setEventListeners(items) {

    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.btns');
    logo.addEventListener('click', () => displayItems(items)); // 로고를 누르면 전체 item보여질수 있도록, 
    buttons.addEventListener('click', event => onButtonClick(event, items)); // 버튼 클릭되면 이벤트 처리될 수 있도록 이벤트가 발생한 것을 인자로 전달해주고, items도 전달


}

// main 
// items을 동적으로 받아와서 promise가 return이 되면(promise가 성공적으로  값을 전달해주면), 
// 전달받은 items를 이용해서 html에 items을 보여주고 , 버튼을 클릭했을 때 적절히 필터링.
loadItems() // data.json에 있는 데이터를 읽어와서 items전달.
    .then(items => { // promise가 성공적으로 되면 items불러오고, 
        // items다 불러와지면, 
        displayItems(items); // items를 html에 보여주고, 받아온 items를 함수에 전달해 줘야함.
        setEventListeners(items); // 받아온 items을 이용해서 버튼을 누르면 필터링해야하니까 적절한 setEventListeners추가.
    })
    .catch(console.log); // error