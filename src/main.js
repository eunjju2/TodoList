//완료 항목 개수 카운트
function updateCounts() {
    const allItems = document.querySelectorAll('.item'); //전체 항목
    const completedItems = document.querySelectorAll('.item.completed'); //완료된 항목

    document.querySelector('.pending-count').textContent = allItems.length - completedItems.length; //미완료 항목 개수
    document.querySelector('.completed-count').textContent = completedItems.length; //완료 항목 개수
}
updateCounts(); //초기값




// 카테고리 업다운

const categoryToggleBtn = document.querySelector('.arrow-button') 
const categoryToggleBtnEl = document.querySelector('.arrow-button p')
const categoryListContainer = document.querySelector('.category-list-container');
const categoryList = document.querySelector('.category-list')

categoryToggleBtn.addEventListener('click', () => {
    const isHidden = categoryListContainer.classList.contains('hidden');
    categoryToggleBtnEl.textContent = isHidden ? 'arrow_drop_up' : 'arrow_drop_down';
    categoryListContainer.classList.toggle('hidden');
})

var categoryName = '';


//카테고리 추가
const categoryAdd = document.querySelector('.category_add')
categoryAdd.addEventListener('click', function () {
    const categoryCount = document.querySelectorAll('.category-item').length;
    const categoryAddItem = document.createElement('li') //li 요소 생성
    categoryAddItem.classList.add('category-item', `category${categoryCount+1}`);
    categoryList.insertBefore(categoryAddItem, categoryAdd); //추가 앞에 만들기
    categoryAddItem.contentEditable = 'true'; //수정 가능한 요소로 만듦
    categoryAddItem.focus();

    
    categoryAddItem.addEventListener('keydown', (event) => { 
        if (event.key === 'Enter') { //카테고리 입력창에서 엔터 입력 시  
            event.preventDefault(); // 엔터 입력으로 줄바꿈 방지
            categoryAddItem.blur();
        }
    })
    
    categoryAddItem.addEventListener('blur', () => { //마우스로 카테고리 입력창 외 다른 곳 클릭 시 
        categoryAddItem.contentEditable = 'false'; //포커스 잃으면 다시 수정 불가한 요소로 변경
        
        //공백만 입력됐을 시 추가 안되도록 함
        if(categoryAddItem.textContent.trim().length === 0) {
            categoryAddItem.remove();
            return false;
        }
    })

    //카테고리 선택 시
    categoryAddItem.addEventListener('click', categorySelect)
})



document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click',categorySelect );
})

function categorySelect() {
    document.querySelector('.category-name').textContent = this.textContent;

    categoryToggleBtnEl.textContent = 'arrow_drop_down';
    categoryListContainer.classList.add('hidden')
    const todoItems = document.querySelectorAll('.item')
    categoryName = this.classList[1]

    if(categoryName === 'category-all'){
        todoItems.forEach(item => item.classList.remove('hidden'));
        return
    }

    todoItems.forEach(item => {
        const itemCategory = item.querySelector('.item-category').classList[1];
        if (itemCategory === categoryName) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}



//'+추가' 버튼 누를 때
const makeTodoBtn = document.querySelector('.make-todo')
const makeTodoBtnText = document.querySelector('.make-todo p')
const makeTodoList = document.querySelector('.make-todo-list')


makeTodoBtn.addEventListener('click', () => {
    makeTodoBtnText.classList.add('hidden')
    makeTodoList.classList.remove('hidden')
})


// + 버튼 클릭 시
const addBtn = document.querySelector('.input_button');
addBtn.addEventListener('click', todoList)




//입력창 기본 설정
const inputArea = document.querySelector('.todo-text');
const dateArea = document.querySelector('.todo-date');

inputArea.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        todoList();           
    }
});

//현재 날짜로 설정
const todayDate = new Date();
const todayYear = todayDate.getFullYear();
const todayMonth = String(todayDate.getMonth() + 1).padStart(2, '0');
const today = String(todayDate.getDate()).padStart(2, '0');
const formattedDate = `${todayYear}-${todayMonth}-${today}`;
dateArea.value = formattedDate;





//작성한 할일을 투두리스트에 추가
function todoList () {
    const dateValue = dateArea.value;
    const todoValue = inputArea.value;

    //날짜와 할일 모두 작성될 것
    if (!dateValue || !todoValue) {
        alert('날짜와 할 일을 모두 입력하세요.');
        return false; 
    }


    //HTML 요소 생성
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item_container');
    const itemContainerLeft = document.createElement('div');
    itemContainerLeft.classList.add('item_container_left');

    const categoryDate = document.createElement('div');
    categoryDate.classList.add('category_date');

    const category = document.createElement('div');
    const date = document.createElement('div');
    const todo = document.createElement('div');


    const itemContainerRight = document.createElement('div');
    itemContainerRight.classList.add('item_container_right')

    const checkBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    //입력된 값을 textContent로 지정
    date.textContent = dateValue;
    todo.textContent = todoValue;

    date.classList.add('item-date');

    if(!categoryName || categoryName ==='category-all'){
        alert('카테고리를 선택하세요');
        return false;
    }
    todo.classList.add('item-name'); 
    

    category.textContent = document.querySelector(`.${categoryName}`).textContent
    category.classList.add('item-category', `${categoryName}`)//해당 카테고리 클래스 함께 추가


    //3가지 버튼에 클래스값 부여
    const btnList = [checkBtn, editBtn, deleteBtn];
    const btnListClassName= ['item-checkbox', 'item-edit', 'item-delete']
    const btnListName = ['check_box_outline_blank', 'edit_square', 'delete']

    
    btnList.forEach((btn, index) => {
        btn.classList.add('material-symbols-outlined', `${btnListClassName[index]}`)
        btn.textContent = btnListName[index];
        itemContainerRight.appendChild(btn);
    })

    categoryDate.appendChild(category);
    categoryDate.appendChild(date);
    itemContainerLeft.appendChild(categoryDate);
    itemContainerLeft.appendChild(todo);


    itemContainer.appendChild(itemContainerLeft);
    itemContainer.appendChild(itemContainerRight);

    //마지막 container에 모두 append
    const list = document.createElement('li')
    list.classList.add('item');
    list.appendChild(itemContainer);

    document.querySelector('.list-items').appendChild(list);

    //추가 완료되면 기존 입력값 지우기
    inputArea.value = ''
    //추가하고 난 뒤에도 날짜 설정 고정되도록
    dateArea.value = formattedDate; 

    //항목 카운트 함수 호출
    updateCounts();
    dateMatchFunc();


    //완료 기능
    checkBtn.addEventListener('click', function() {
        list.classList.toggle('completed');
        todo.classList.toggle('completed-text') //글자에 line-through 부여하기 위함

        // 체크박스 아이콘 변경
        if (list.classList.contains('completed')) {
            this.textContent = 'check_box';
        } else {
            this.textContent = 'check_box_outline_blank';
        }

        // 맨 아래로 이동
        document.querySelector('.list-items').appendChild(list);

        //항목 카운트 함수 호출
        updateCounts();
        dateMatchFunc();
    });
    


    //수정 기능
    editBtn.addEventListener('click', function() {
        todo.contentEditable = 'true'; //div 요소를 입력 가능하도록 하는 것
        todo.focus(); //바로 수정창으로 이동하도록 함
    })
    
 
    todo.addEventListener('keydown', (event) => { 
        if (event.key === 'Enter') { //수정 입력창에서 엔터 입력 시  
            event.preventDefault(); // 엔터 입력으로 줄바꿈 방지
            todo.blur(); //포커스 잃도록 함
        }
    })

    todo.addEventListener('blur', () => { //마우스로 수정 입력창 외 다른 곳 클릭 시 
        todo.contentEditable = 'false'; //포커스 잃으면 다시 수정 불가한 요소로 변경
        dateMatchFunc();
    })

    //삭제 기능
    deleteBtn.addEventListener('click', function() {
        document.querySelector('.list-items').removeChild(list); 

        //항목 카운트 함수 호출
        updateCounts();
        dateMatchFunc();
    })   
}   


//검색 기능
const searchInput = document.querySelector('.search-text');
const searchBtn = document.querySelector('.search-button');

function searchTodos () {
    document.querySelector('.category-name').textContent ='카테고리'
    const searchText = searchInput.value.toLowerCase(); //영어 입력 고려
    const todoItems = document.querySelectorAll('.item')
    todoItems.forEach(item => {
        const itemText = item.querySelector('.item-name').textContent.toLowerCase();
        if (searchText && itemText.includes(searchText)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });

    if (!searchText) { //검색창에 아무 것도 입력되지 않았을 경우
        todoItems.forEach(item => item.classList.remove('hidden'));
    }
}

searchInput.addEventListener('keydown', (event) => { //검색 입력창에서 엔터 쳤을 경우 바로 검색되도록 함
    if (event.key === 'Enter') {
        event.preventDefault(); 
        searchTodos();        
    }
});

searchBtn.addEventListener('click', searchTodos);


// 슬라이드
const slidePage = document.querySelector('.slide-page');
const calendarBtn = document.querySelector('.calendar-button');
const cancelBtn = document.querySelector('.cancel-button');

calendarBtn.addEventListener('click', () => {
    slidePage.classList.add('open');
    calendarBtn.classList.add('hidden');
});

cancelBtn.addEventListener('click', () => {
    slidePage.classList.remove('open');
    calendarBtn.classList.remove('hidden')
})



//캘린더
const monthText = document.querySelector('.calendar-header h2')
const dates = document.querySelector('.dates')
const navs = document.querySelectorAll('.calendar-header nav button')

const months = [
    '1월','2월','3월',
    '4월','5월','6월',
    '7월','8월','9월',
    '10월','11월','12월'
]



let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();


function renderCalendar() {
    monthText.textContent = `${months[month]} ${year}`;

    const start = new Date(year, month, 1).getDay();
    const endDate = new Date(year, month+1 , 0).getDate(); 
    const end = new Date(year, month, endDate).getDay();
    const endDatePrev = new Date(year, month, 0).getDate();
  


    let datesHtml = '';

    for(let i = start; i > 0; i--){
        datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`
    }
    
    for(let i=1; i<=endDate; i++) {
        let className = 
            i === date.getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear()
            ? 'class="today selected"'
            : "";

        datesHtml += `<li ${className}>${i}</li>`
    }

    for(i = end; i< 6; i ++) {
        datesHtml += `<li class="inactive">${i - end + 1}</li>`
    }

    dates.innerHTML = datesHtml


    const dateList = document.querySelectorAll('.dates li');

    dateList.forEach(date => {
        date.addEventListener('click', dateSelect)
        date.addEventListener('click', dateMatchFunc)
    })
    
}
renderCalendar();



//날짜에 해당하는 리스트 보여주기

function dateSelect () {
    document.querySelectorAll('.selected').forEach(item => item.classList.remove('selected'))
    this.classList.add('selected')
}
function dateMatchFunc() {
   const selectDate = document.querySelector('.selected').textContent;
    let listHtml = '';

    matchDate = `${year}-${String(month+1).padStart(2, '0')}-${String(selectDate).padStart(2, '0')}`
    const todoItems = document.querySelectorAll('.item')
    const dayTodo = document.querySelector('.day-todo')
    todoItems.forEach(item => {
        const itemDate = item.querySelector('.item-date').textContent;
        if (itemDate === matchDate) {
            const itemName = item.querySelector('.item-name')
            if(itemName.classList.contains('completed-text'))
            {
                listHtml += `<li class="completed-text">${itemName.textContent}&nbsp;&nbsp;<span style="color: #858B97;">${item.querySelector('.item-category').textContent}</span></li>`
            }else {
                listHtml += `<li>${itemName.textContent}&nbsp;&nbsp;<span style="color: #858B97;">${item.querySelector('.item-category').textContent}</span></li>`  
            }
        }
    });
    dayTodo.innerHTML = listHtml

    // const dayTodoList = document.querySelectorAll('.day-todo li');
    // dayTodoList.addEventListener('click', function() {
    //     this.classList.add('complete-todo')

    // });

}



navs.forEach(nav => {
    nav.addEventListener('click', event => {
        const btnId = event.target.id;

        if(btnId ==='prev' && month === 0) {
            year --;
            month = 11;
        }else if(btnId === 'next' && month === 11) {
            year ++;
            month = 0;
        }else {
            month = btnId === 'next' ? month +1 : month -1;
        }

        date = new Date(year, month, new Date().getDate());
        year = date.getFullYear();
        month = date.getMonth();
        renderCalendar()
    })
})




