// status (상태정보 담고있는 변수)
let todos = [];  //서버에서 데이터를 받아와서 저장할 배열
let status = 'all'; // 리스트 보기 기본상태 저장
let _todos = [];

// DOM
const $todos = document.querySelector('.todos'); //ul요소 dom api 이용해서 변수에 저장
const $inputTodos = document.querySelector('.input-todos');
const $btnTodos = document.querySelector('.btn-todos')
const $statusContainer= document.querySelector('.status-container')

// Functions
const fetchTodos = () => [
        { id: 1, content: 'HTML', completed: false},
        { id: 2, content: 'CSS', completed: true},
        { id: 3, content: 'Javascript', completed: false}
    ];

const changeStatusTodos = () => {
    if (status === 'all') _todos = todos;
}

const render = () => todos.map(todo => {
        return `<li class="todos-item">
            <input type="checkbox" id='${todo.id}' class="todos-completed" ${todo.completed ? 'checked' : ''}>
            <label for='${todo.id}' class="todos-content">${todo.content}</label>
            <button class="todos-remove ${todo.id}">x</button>
        </li>`
    }).join('');

const generateNewId = () => {  //새로운 id값을 생성해주는 함수
    const todosId = todos.map(todo => todo.id)
    return todos.length ? Math.max(...todosId) + 1 : 0
}
// Events
document.addEventListener('DOMContentLoaded', () => {
    todos = fetchTodos(); // 서버에 있는 todos 데이터를 todos행렬에 담아주는 함수.
    $todos.innerHTML = render(); // todos 배열에 있는 데이터를 토대로 렌더링을 해주는 함수 실행
})

$btnTodos.addEventListener('click', () => {
    if (!$inputTodos.value) return;

    const newTodo = { id: generateNewId(), content: $inputTodos.value, completed: false}
    todos = [newTodo, ...todos]  //todos 배열에 새로운 값 추가

    $todos.innerHTML = render();
})

$inputTodos.onkeyup = e => {
    if (e.key !== 'Enter' || $inputTodos.value) return;
    
    const newTodo = { id: generateNewId(), content: $inputTodos.value, completed: false}
    todos = [newTodo, ...todos]  //todos 배열에 새로운 값 추가
    console.log(todos);

    $todos.innerHTML = render();
};

$todos.onclick = e => {  // 삭제 버튼 누르면 삭제 시키는 이벤트
    if(!e.target.matches('.todos-remove')) return;

    // todo.id와 e.target의 클래스 중에서 두번째 클래스의 값을 비교해서
    // 현재 눌린 e.target이 todos의 어떤 요소인지 확인 후, 일치하는 값만 제외시켜서
    // todos 배열에 재할당한다.
    if (e.target.mathces('todos-'))
    todos = todos.filter(todo => todo.id !== +e.target.classList[1])
    $todos.innerHTML = render();
}

$todos.oninput = e => {
    todos.forEach(todo => {
        if (+e.target.id === +todo.id) todo.completed = e.target.checked;
}
// update 함수
// checkbox, input, button, enter, x-button

